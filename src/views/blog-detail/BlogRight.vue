<template>
    <aside class="bdc__right" :style="{ top: top }" ref="right">
        <div class="aside-clock">
            <ClockVue :image="$parent.blogs.firstPicture || $parent.bgimg" />
        </div>
        <div class="md-title__nav">
            <header>导航目录</header>
            <div class="md-title__nav-list" v-if="catalog.length">
                <!-- 目录内容 -->
                <ul>
                    <li v-for="(item, index) in catalog" :key="index">
                        <!-- :href="'#' + item.id" -->
                        <a @click="clickanchor('#' + item.id)" :id="item.id" :class="{ 'read': item.read == true }">
                            {{ item.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
import ClockVue from '@/components/Clock.vue';
export default {
    name: 'BlogRight',
    components: { ClockVue },
    data() {
        return {
            navList: '',
            catalog: [],
            top: "-130px",
        };
    },
    props: {
        article: {
            type: String,
            require: true,
            default: '',
        }
    },
    computed: {
        flag() {
            return this.article != '';
        },
    },
    watch: {
        flag: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal) {
                    this.handleInitNavList();
                }
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleReading);
        window.removeEventListener('scroll', this.handleTop);
    },
    methods: {
        // 初始化
        handleInitNavList() {
            let content = this.$parent.$refs.article;
            // let content = document.getElementById("article");
            // 想获取的标题，将想获取的小标题的标签添加到这
            const titleTag = ["H1", "H2", "H3"];
            // 存放小标题的数组
            let titles = [];
            content.childNodes.forEach((e, index) => {
                //具体执行步骤，比如：打印看看
                // console.log("childNodes", e, index);
                // console.log(e.nodeName);
                if (titleTag.includes(e.nodeName)) {
                    //具体封装过程
                    // console.log("nodeName", e.nodeName);
                    const id = "header-" + index;
                    // 设置元素id
                    e.setAttribute("id", id);
                    titles.push({
                        id: id,
                        title: e.innerHTML,
                        // level: Number(e.nodeName.substring(1, 2)),
                        nodeName: e.nodeName,
                        //read：后期主要用来判断当前阅读的是哪一个小标题的内容
                        read: false
                    });
                }
            });
            // 再data中定义catalog
            // console.log(titles);
            this.catalog = titles;
            window.addEventListener("scroll", this.handleReading);
            window.addEventListener("scroll", this.handleTop);
        },
        // 处理阅读
        handleReading() {
            // 获取页面滚动值
            let scrollTop = document.documentElement?.scrollTop || document.body?.scrollTop || window.pageYOffset;
            // 遍历标题
            for (let i = 0; i < this.catalog.length; i++) {
                // 获取标题距离屏幕顶端的距离
                let offsetTop = document.querySelector("#" + this.catalog[i].id).offsetTop;
                /* if (!offsetTop) {
                    window.removeEventListener("scroll", this.handleReading);
                } */
                // 根据条件做出判断，这里是当小题和屏幕顶端的距离小于50且没有被标明在读时，就将其背景颜色改变。
                if ((offsetTop - scrollTop) < 50 && (offsetTop - scrollTop) > 0 && this.catalog[i].read == false) {
                    this.catalog[i].read = true;
                    //再将其他标题背景色改成未读的背景色
                    for (let j = 0; j < this.catalog.length; j++) {
                        if (j != i) {
                            this.catalog[j].read = false
                        }
                    }
                }
            };
        },
        // 计算粘性定位
        handleTop() {
            // 获取页面滚动值
            let scrollTop = document.documentElement?.scrollTop || document.body.scrollTop || window.pageYOffset;
            let dh = this.$refs.right?.offsetHeight;
            let vh = document?.documentElement?.clientHeight;
            let sHeight = dh - vh;
            let perc = scrollTop / sHeight;
            this.top = `-${perc * 100}px`;
        },
        // 锚点点击平滑滚动
        clickanchor(idName) {
            document.querySelector(idName).scrollIntoView({ behavior: "smooth" });
        }
    }
}
</script>

<style scoped lang="scss">
.bdc__right {
    width: 260px;
    height: fit-content;
    margin-right: auto;
    position: sticky;
    // top: -130px;

    .aside-clock {
        width: 100%;
        overflow: hidden;
        height: 130px;
        border-radius: 12px;
    }

    .md-title__nav {
        margin-top: 30px;
        padding: 14px;
        width: 100%;
        background-color: #fff;
        border-radius: 12px;
        box-sizing: border-box;

        header {
            display: flex;
            align-items: center;
            width: 100%;
            height: 30px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        .md-title__nav-list {
            .read {
                // background-color: rgb(254, 242, 235);
                color: #007fff;
                background-color: #ebedef;
                border-radius: 4px;
            }

            li {
                // cursor: pointer;

                a {
                    margin: 6px 0;
                    padding: 4px 0 4px 21px;
                    display: block;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-decoration: none;
                    color: #000;
                    font-size: 14px;

                    &:hover {
                        color: #007fff;
                        background-color: #ebedef;
                        border-radius: 4px;
                    }
                }
            }
        }
    }
}
</style>