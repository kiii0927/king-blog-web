<template>
    <main class="files-main">
        <!-- leave-active-class="animate__fadeOut" -->
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeIn"
            mode="in-out"
            v-on:enter="enter"
            v-on:after-leave="afterLeave"
        >
            <div
                class="files-main__content"
                v-if="blogList.length"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
            >
                <div class="conten-ls-card" v-for="(item, index) in blogList" :key="index">
                    <div class="conten-ls-card-img">
                        <img v-lazy="item.firstPicture" />
                    </div>
                    <div class="conten-ls-card-info">
                        <div
                            class="conten-ls-card-title"
                            title="点击阅读更多"
                            @click="handleRead(item.id)"
                        >
                            {{ item.title }}
                        </div>
                        <div class="conten-ls-card-content">{{ item.description }}</div>
                        <div class="conten-ls-card-else">
                            <i class="el-icon-date">{{ item.createTime | formatTime }}</i>
                            <i class="el-icon-view">{{ item.views }}</i>
                            <i class="el-icon-chat-dot-round">{{ item.comments }}</i>
                        </div>
                    </div>
                </div>
                <div class="files-main__loading">{{ loadingText }}</div>
            </div>
        </transition>
        <p v-if="noData">暂无数据</p>
    </main>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'filesMain',
    data() {
        return {
            loading: false,
            loadingText: '~ 在找了，等一下 ~',
            noData: false,
        };
    },
    created() {
        this.$bus.$on('handleSelect', choice => {
            this.loading = false;
            const obj = {
                type: this.$parent.type,
                page: this.$parent.page,
                search: this.$parent.search,
            };
            choice === 1
                ? this.$store.dispatch('classify/search', obj)
                : this.$store.dispatch('classify/getOneAll', obj);
        });
    },
    beforeMount() {
        this.$nextTick(() => {
            this.$bus.$emit('handleSelect', 0);
        });
    },
    computed: {
        noMore() {
            return this.blogList.length >= this.total;
        },
        disabled() {
            return this.loading || this.noMore;
        },
        ...mapGetters('classify', ['blogList', 'total']),
    },
    watch: {
        noMore(newVla, oldVal) {
            if (newVla) {
                this.loadingText = '~ 就这么多了 ~';
            } else this.loadingText = '~ 在找了，等一下 ~';
        },
    },
    methods: {
        /* 阅读函数 */
        handleRead(id) {
            this.$router.push(`/detail/${id}`);
        },
        load() {
            this.loading = true;
            setTimeout(() => {
                this.$parent.page.currentPage += 1;
                this.$bus.$emit('handleSelect', 0);
                this.loading = false;
            }, 500);
        },

        /* 过度钩子 */
        enter(el) {
            this.$nextTick(() => {
                if (!this.blogList.length) {
                    this.noData = true;
                } else this.noData = false;
            });
        },
        afterLeave(el) {
            this.$nextTick(() => {
                if (!this.blogList.length) {
                    this.noData = true;
                } else this.noData = false;
            });
        },
    },
};
</script>

<style scoped lang="scss">
.files-main {
    width: 100%;
    height: calc(100vh - 280px);
    min-height: calc(100vh - 280px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 18px #00000026;
    user-select: none;

    .files-main__content {
        position: relative;

        /* 屏幕大于 1440px 时应用该样式 */
        @media screen and (min-width: 1440px) {
            width: calc(1200px + 40px);
        }

        /* 屏幕小于 1440px 时应用该样式 */
        @media screen and (max-width: 1440px) {
            width: 91.8%;
        }

        height: calc(100% - 40px);
        overflow-y: auto;

        .conten-ls-card {
            position: relative;
            background-color: #fff;
            padding: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            height: 180px;
            user-select: none;
            display: flex;
            justify-content: space-between;
            border-radius: 10px;
            margin: 20px;
            overflow: hidden;

            .conten-ls-card-info {
                width: calc(100% - 160px);
                padding: 2px 0 2px 16px;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;

                .conten-ls-card-else {
                    margin-top: auto;
                    font-size: 16px !important;

                    i {
                        margin-right: 10px;

                        &::before {
                            margin-right: 4px;
                        }
                    }
                }

                .conten-ls-card-content,
                .conten-ls-card-else {
                    font-size: 18px;
                    color: #768791;
                }

                .conten-ls-card-content,
                .conten-ls-card-title {
                    /* 实现限制文字显示多行，多余的用...代替 */
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .conten-ls-card-content {
                    margin-top: 15px;
                }

                .conten-ls-card-title {
                    font-size: 22px;
                    font-weight: 600;
                    color: #717171;
                    cursor: pointer;
                }
            }

            .conten-ls-card-img {
                width: 200px;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    transition: all 0.8s ease;
                }
            }

            &:hover {
                box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
                outline: 1px solid #eee;

                .conten-ls-card-img {
                    img {
                        object-position: right bottom;
                    }
                }

                &::before {
                    opacity: 0;
                    transform: translateX(-100%);
                }
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.1);
                transition: all 0.8s ease;
                opacity: 1;
                transform: translateX(100%);
            }
        }

        .files-main__loading {
            color: #999;
            margin-top: 8px;
            text-align: center;
        }
    }

    & > p {
        margin: auto 0;
    }
}
</style>
