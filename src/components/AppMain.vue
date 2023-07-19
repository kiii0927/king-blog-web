<template>
    <div class="main" ref="main">
        <!-- include="Login,Contact,BlogDetail" -->
        <!-- :include="cacheMessagePage" -->
        <keep-alive :max="10">
            <router-view v-if="$route.meta.keepAlive && !exclude" :key="key" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive || exclude" :key="key" />
        <div class="scroll-indicator" ref="j_scroll_indicator" v-if="isScroll"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path;
        },
        /**
         * 规定那些组件是需要过滤缓存的, 注: 组件路由name跟组件name一致
         */
        exclude() {
            return this.notCacheMessagePage.some(el => el === this.$route.name);
        },
        isScroll() {
            return this.$route.path === '/' || this.$route.path === '/home';
        },
        ...mapGetters('common', ['notCacheMessagePage']),
    },
    watch: {
        isScroll: {
            immediate: true, // 立即处理 进入页面就触发
            handler(newVal, oldVal) {
                if (!newVal) {
                    window.removeEventListener('scroll', this.handleScroll);
                } else window.addEventListener('scroll', this.handleScroll);
            },
        },
    },
    // data() {
    //     return {
    //         filterPath: ['#/codepen', '#/login', '#/about', '#/contact'],
    //     };
    // },
    methods: {
        handleScroll() {
            let scrollTop =
                document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let dh = this.$refs.main?.offsetHeight;
            let vh = document.documentElement?.clientHeight;
            let sHeight = dh - vh;
            let perc = scrollTop / sHeight;
            this.$refs.j_scroll_indicator.style.width = perc * 100 + '%';
        },
    },
};
</script>

<style scoped lang="scss">
.main {
    width: 100%;
    height: fit-content;
    min-height: 100vh;
}
</style>

<style scoped>
.scroll-indicator {
    position: fixed;
    height: 4px;
    top: 0;
    left: 0;
    /* background: var(--wathet-color); */
    background: linear-gradient(90deg, #9abdeb, #80f9b7, #9abdeb);
    z-index: 1000;
}
</style>
