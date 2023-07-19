<template>
    <aside class="bdc__left">
        <div class="aside__popular">
            <h4>更多推荐</h4>
            <ul class="popular__article">
                <transition-group
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__bounceInRight"
                    mode="in-out"
                >
                    <li
                        v-for="(item, index) in popularArticles"
                        :key="index"
                        :style="[styleObject, styles[index]]"
                    >
                        <img v-lazy="item.firstPicture" />
                        <div class="popular__article-info">
                            <span @click="handleRecommend(item.id)" title="点击阅读">
                                {{ item.title }}
                            </span>
                            <p>{{ item.views }} views</p>
                        </div>
                    </li>
                </transition-group>
            </ul>
        </div>
        <div class="aside__links">
            <h4>友情链接</h4>
            <ul>
                <li
                    class="fa fa-paperclip"
                    title="点击跳转"
                    v-for="(item, index) in friends"
                    :key="index"
                    @click="handleLink(item.link)"
                    :style="[styleObject, styles[index]]"
                >
                    {{ item.text }}
                </li>
            </ul>
        </div>
        <div class="aside__tools">
            <el-tooltip class="item" effect="dark" content="评论" placement="right-start">
                <a class="fa fa-comment icon-cricle" @click.stop="$bus.$emit('skipComment')"></a>
            </el-tooltip>

            <el-tooltip
                class="item"
                effect="dark"
                :content="isFavor ? '取消收藏' : '收藏'"
                placement="right-start"
            >
                <a
                    @click.stop="handleCollect"
                    class="fa fa-star icon-cricle"
                    :class="{ _favor: isFavor }"
                ></a>
            </el-tooltip>
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'BlogLeft',
    props: ['show'],
    data() {
        return {
            popularArticles: [
                {
                    title: '关于那些年的仿网易云app',
                    firstPicture: 'https://api.adicw.cn/uploads/StudyImg/6041ef606a374.jpg',
                    views: 1525,
                },
                {
                    title: 'js函数节流与防抖',
                    firstPicture: 'https://api.adicw.cn/uploads/StudyImg/20200219114051.jpg',
                    views: 997,
                },
                {
                    title: 'js函数节流与防抖',
                    firstPicture: 'https://api.adicw.cn/uploads/StudyImg/628df5efa664d.jpg',
                    views: 111,
                },
                {
                    title: 'Js数据处理 数组篇',
                    firstPicture: 'https://api.adicw.cn/uploads/StudyImg/20200616110008.jpg',
                    views: 222,
                },
                {
                    title: 'PhpStudyPro+nginx配置之ssl证书https配置',
                    firstPicture: 'https://api.adicw.cn/uploads/StudyImg/20200204111235.jpg',
                    views: 232,
                },
            ],
            friends: [
                { text: 'king | 一个有趣的博客', link: 'https://king-cc.cn/' },
                { text: 'king | 一个有趣的博客', link: 'https://king-cc.cn/' },
            ],
            isFavor: false,
            styles: [
                {
                    transition: 'all 0.25s ease 0s',
                },
                {
                    transition: 'all 0.25s ease 0.25s',
                },
                {
                    transition: 'all 0.25s ease 0.5s',
                },
                {
                    transition: 'all 0.25s ease 0.75s',
                },
                {
                    transition: 'all 0.25s ease 1s',
                },
            ],
            styleObject: {
                opacity: 0,
                transform: 'translateX(999px)',
            },
        };
    },
    beforeMount() {
        this.handleIsCollect();
    },
    methods: {
        // 处理收藏 or 取消收藏
        handleCollect() {
            if (!this.token) {
                this.$notify.warning({
                    title: '收藏',
                    message: '请先登录！',
                });
                return;
            }
            const obj = {
                identify: this.token,
                blogId: this.$route.params?.id,
            };
            if (this.isFavor) {
                // 取消收藏
                this.$store.dispatch('userFavor/delete', obj).then(response => {
                    if (response) {
                        this.$notify.success({
                            title: '收藏',
                            message: '已取消~',
                        });
                        this.isFavor = false;
                    }
                });
            } else {
                // 添加收藏
                this.$store.dispatch('userFavor/save', obj).then(response => {
                    if (response) {
                        this.$notify.success({
                            title: '收藏',
                            message: '收藏成功~',
                        });
                        this.$store.commit('userFavor/SET_STATUS', 1);
                        this.isFavor = true;
                    }
                });
            }
        },
        // 该函数处理点击跳转页面
        handleLink(link) {
            this.$notify.info({
                title: '页面跳转',
                message: '正在跳转中，稍后会在新窗口打开~',
            });
            setTimeout(() => window.open(link), 2000);
        },
        // 处理是否已收藏
        handleIsCollect() {
            const obj = {
                identify: this.token,
                blogId: this.$route.params?.id,
            };
            this.$store
                .dispatch('userFavor/isExist', obj)
                .then(response => (this.isFavor = response));
        },
        // 处理推荐
        handleRecommend(id) {
            if (!this.recommendList.length) {
                this.$notify.info({
                    title: '提示',
                    message: '默认数据无法跳转...',
                });
                return;
            }
            this.$router.push(`/detail/${id}`);
            // this.$API.blog.updateViews(id);
        },
    },
    computed: {
        ...mapGetters(['token']),
        ...mapGetters('blog', ['recommendList']),
    },
    watch: {
        show(newVal, oldVal) {
            if (newVal) {
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateX(0px)';
            }
        },
        // popularArticles
        recommendList: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal.length) {
                    const obj = [...newVal];
                    this.popularArticles = obj;
                }
            },
        },
    },
};
</script>

<style scoped lang="scss">
.bdc__left {
    position: sticky;
    margin-left: auto;
    width: 260px;
    height: 100%;
    top: -130px;

    .aside__tools {
        width: 100%;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .aside__popular {
        margin-bottom: 16px;

        .popular__article {
            width: 100%;

            li {
                // position: relative;
                width: 100%;
                display: flex;
                padding: 6px 8px;
                box-sizing: border-box;
                cursor: pointer;

                .popular__article-info {
                    // flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    font-size: 12px;

                    span {
                        width: 100%;
                        font-size: 11px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 2;
                        padding-right: 20px;
                        margin-bottom: 6px;
                        color: #768791;
                        overflow: hidden;
                        box-sizing: border-box;
                    }

                    p {
                        width: 100%;
                        overflow: hidden;
                        color: #c3ccd3;
                    }
                }

                img {
                    margin: 0 10px;
                    width: 50px;
                    height: 50px;
                    border-radius: 6px;
                    transition: all 0.25s ease-in-out;
                }

                &:hover {
                    img {
                        transform: translate(-4px, -12px) scale(1.1);
                    }
                }
            }
        }
    }

    .aside__links {
        ul {
            width: 100%;

            li {
                box-sizing: border-box;
                display: block;
                padding: 6px 14px;
                font-size: 12px;
                color: #768791;
                transition: all 0.4s ease;

                &:before {
                    margin-right: 4px;
                }

                &:hover {
                    cursor: pointer;
                    background: rgba(0, 0, 0, 0.05);
                }
            }
        }
    }

    .aside__popular,
    .aside__links {
        background: #fff;
        width: 100%;
        overflow: hidden;
        padding-bottom: 20px;
        border-radius: 12px;

        h4 {
            position: relative;
            border-left: 3px solid var(--blue-color);
            padding: 0 4px;
            margin: 16px 10px 20px 16px;
            font-size: 14px;
            text-indent: 6px;
        }
    }
}

.icon-cricle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    margin-top: 16px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px #0000000a;
    cursor: pointer;
    color: #b2bac2;
    outline: none;

    &:hover {
        color: var(--marked-color);
    }
}

._favor {
    color: var(--marked-color) !important;
}
</style>
