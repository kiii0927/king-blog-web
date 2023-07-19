<template>
    <aside class="home-aside-right">
        <div class="home-aside-up">
            <div class="home-aside-up_cover">
                <img src="https://img.wwery.com/Sugar/1WIS0Yrb.webp" alt="图片未找到...">
            </div>
            <div class="home-aside-up_avatar">
                <img src="https://img.wwery.com/Sugar/GbdeNndT.jpg" alt="图片未找到">
            </div>
        </div>

        <AsideCard class="home-aside-about">
            <template v-slot:title>
                关于我
            </template>
            <template #content>
                <ul ref="asideAbout">
                    <li title="点击跳转" v-for="(item, index) in links" :key="index" :class="item.class"
                        @click="handleLink(item.link)" :style="[styleObject2, styles[index]]">
                        {{ item.text }}
                    </li>
                </ul>
            </template>
        </AsideCard>

        <AsideCard class="home-aside-skill">
            <template #title>
                我的技术栈
            </template>
            <template #content>
                <ul>
                    <li v-for="(item, index) in skills" :key="index">
                        <i :style="{ background: item.colour }"></i>
                        <span>{{ item.content }}</span>
                    </li>
                </ul>
            </template>
        </AsideCard>

        <AsideCard class="home-aside-friends">
            <template #title>
                友情链接
            </template>
            <template #content>
                <ul ref="asideFriends">
                    <li class="fa fa-paperclip" title="点击跳转" v-for="(item, index) in friends" :key="index"
                        @click="handleLink(item.link)" :style="[styleObject, styles[index]]">
                        {{ item.text }}
                    </li>
                </ul>
            </template>
        </AsideCard>

    </aside>
</template>

<script>
import AsideCard from '@/views/home/card'
export default {
    name: 'right-aside',
    components: { AsideCard },
    data() {
        return {
            links: [
                { text: 'GitHub', link: 'https://github.com/sjhfuigashgrs', class: 'fa fa-github' },
                { text: 'bilibili', link: 'https://space.bilibili.com/1523405672?spm_id_from=333.1007.0.0', class: 'fa fa-television' },
                { text: '知乎', link: 'https://www.zhihu.com/people/kkkkk-17-62-86', class: 'fa fa-bookmark-o' },
                { text: 'npm', link: 'https://www.npmjs.com/king_liusiqi', class: 'fa fa-link' },
            ],
            skills: [
                { content: 'Vue', colour: 'rgb(66, 183, 128)' },
                { content: 'HTML5', colour: 'rgb(222, 234, 61)' },
                { content: 'CSS3', colour: 'rgb(5, 89, 156)' },
                { content: 'JavaScript', colour: 'rgb(74, 143, 6)' },
                { content: 'Less/Scss', colour: 'rgb(66, 183, 128)' },
                { content: 'Webpack', colour: 'rgb(234, 61, 218)' },
                { content: 'Java', colour: 'rgb(66, 183, 128)' },
                { content: 'Spring', colour: 'rgb(111, 183, 55)' },
                { content: 'MySql', colour: 'rgb(5, 89, 156)' },
                { content: 'Mybaits', colour: 'rgb(0, 149, 235)' },
            ],
            friends: [
                { text: 'king | 一个有趣的博客', link: 'https://king-cc.cn/' },
                { text: 'king | 一个有趣的博客', link: 'https://king-cc.cn/' }
            ],
            styles: [
                {
                    transition: "all 0.25s ease 0s",
                },
                {
                    transition: "all 0.25s ease 0.25s",
                },
                {
                    transition: "all 0.25s ease 0.5s",
                },
                {
                    transition: "all 0.25s ease 0.75s",
                }
            ],
            styleObject: {
                opacity: 0,
                transform: "translateX(999px)",
            },
            styleObject2: {
                opacity: 0,
                transform: "translateX(999px)",
            },
        };
    },
    methods: {
        // 该函数处理点击跳转页面
        handleLink(link) {
            this.$notify.info({
                title: '页面跳转',
                message: '正在跳转中，稍后会在新窗口打开~'
            });
            setTimeout(() => window.open(link), 2000);
        },
        handleScroll() {
            let vh = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight; // 可视化高度
            // 元素顶端到可见区域顶端的距离
            let elTop = this.$refs.asideFriends?.getBoundingClientRect()?.top;
            if (elTop <= (vh - 50)) {
                // 进入可视化区域
                this.styleObject.opacity = 1;
                this.styleObject.transform = "translateX(0px)";
            }
        },
        handleScroll2() {
            let vh = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight; // 可视化高度
            // 元素顶端到可见区域顶端的距离
            let elTop = this.$refs.asideAbout?.getBoundingClientRect()?.top;
            if (elTop <= (vh - 50)) {
                // 进入可视化区域
                this.styleObject2.opacity = 1;
                this.styleObject2.transform = "translateX(0px)";
            }
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler(newVla, oldVal) {
                if (newVla.name !== 'Home') {
                    window.removeEventListener('scroll', this.handleScroll);
                    window.removeEventListener('scroll', this.handleScroll2);
                } else {
                    this.$nextTick(() => {
                        window.addEventListener("scroll", this.handleScroll);
                        window.addEventListener("scroll", this.handleScroll2);
                    });
                }
            }
        }
    }
}
</script>