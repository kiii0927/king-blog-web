<template>
    <aside class="home-aside-left">
        <div class="home-aside-about">
            <div class="clock">
                <div class="clock-cover">
                    <img
                        :src="
                            asideAboutImgCount
                                ? bgmove[asideAboutImgCount]
                                : bgmove[asideAboutImgCount + 1]
                        "
                        alt="图片未找到"
                    />
                </div>
            </div>
            <p class="home-aside-about__blogger">Adic Blog</p>
            <div class="home-aside-about__bloggerinfo">
                动漫、音乐、前端编程，这是博主的三大标签。本站推荐博主喜欢的动漫、自己所总结的知识，也会分享一些日常心得~
            </div>
            <div class="home-aside-about__bloginfo">
                <div>
                    <p>文章</p>
                    <span>{{ information.blogCount || 0 }}</span>
                </div>
                <div>
                    <p>动漫</p>
                    <span>36</span>
                </div>
                <div>
                    <p>评论</p>
                    <span>{{ information.commentCount || 0 }}</span>
                </div>
                <div>
                    <p>浏览</p>
                    <span>{{ information.viewsCount || 0 }}</span>
                </div>
            </div>
        </div>

        <AsideCard class="recentnews">
            <template #title>最新动态</template>
            <template #content>
                <ul ref="recentnews">
                    <li
                        v-for="(item, index) in recentNewsList"
                        :key="item.id"
                        :style="[styleObject, styles[index]]"
                    >
                        <p>修改了 {{ item.title }}</p>
                        <span>{{ item.updateTime | formatTimePro }}</span>
                    </li>
                </ul>
            </template>
        </AsideCard>

        <AsideCard class="greetessay">
            <template #title>最受欢迎的文章</template>
            <template #content>
                <ul ref="greetessay">
                    <li
                        v-for="(item, index) in recommendList"
                        :key="item.id"
                        :style="[styleObject, styles[index]]"
                    >
                        <img v-lazy="item.firstPicture" alt="图片未找到..." />
                        <div class="aside-dfcard-info">
                            <p
                                class="paragraph-truncate"
                                @click="handleRead(item.id)"
                                title="点击跳转"
                            >
                                {{ item.title }}
                            </p>
                            <span>{{ item.views }} views</span>
                        </div>
                    </li>
                </ul>
            </template>
        </AsideCard>
    </aside>
</template>

<script>
import AsideCard from '@/views/home/card';
import { mapGetters } from 'vuex';
export default {
    name: 'left-aside',
    components: { AsideCard },
    data() {
        return {
            asideAboutImgCount: 0,
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
            ],
            styleObject: {
                opacity: 0,
                transform: 'translateX(999px)',
            },
        };
    },
    props: {
        bgmove: {
            type: Array,
            default: function () {
                return [];
            },
        },
        recommendList: {
            type: Array,
            require: true,
            default: function () {
                return [];
            },
        },
    },
    mounted() {
        this.asideAboutImgCount = Math.floor(Math.random() * this.bgmove.length);
    },
    methods: {
        // handleInit() {
        //     // Promise.all(
        //     //     [
        //     //         this.$store.dispatch('blog/getRecentNews'),
        //     //         this.$store.dispatch('blog/getInformation'),
        //     //     ].map(v => v.catch(e => console.log(e)))
        //     // ); //.then(values => console.log(values));
        // },
        handleRead(id) {
            this.$router.push(`/detail/${id}`);
        },
        handleScroll() {
            let vh =
                document.documentElement.clientHeight ||
                window.innerHeight ||
                document.body.clientHeight; // 可视化高度
            // 元素顶端到可见区域顶端的距离
            let elTop = this.$refs.greetessay?.getBoundingClientRect()?.top;
            if (elTop <= vh - 50) {
                // 进入可视化区域
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateX(0px)';
            }
        },
    },
    computed: {
        ...mapGetters('blog', ['recentNewsList', 'information']),
    },
    watch: {
        $route: {
            immediate: true,
            handler(newVla, oldVal) {
                if (newVla.name !== 'Home') {
                    window.removeEventListener('scroll', this.handleScroll);
                } else {
                    this.$nextTick(() => {
                        window.addEventListener('scroll', this.handleScroll);
                    });
                }
            },
        },
    },
};
</script>

<style></style>
