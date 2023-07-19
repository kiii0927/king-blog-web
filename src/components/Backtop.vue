<template>
    <div class="backtop" title="点击返回顶部" :style="styleObject" @click="backtop"></div>
</template>

<script>
export default {
    name: 'Backtop',
    data() {
        return {
            styleObject: {
                top: "-900px",
            },
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            let scrollTop = document.documentElement.scrollTop;
            let visibilityHeight = 200; // 滚动高度达到此参数值才出现
            if (scrollTop > visibilityHeight) {
                this.styleObject.top = "-13px";
            } else {
                this.styleObject.top = "-900px";
            }
        },
        // 返回顶部
        backtop() {
            document.scrollingElement.scrollTop = 0;
        },
    }
}
</script>

<style scoped>
.backtop {
    position: fixed;
    right: 25px;
    top: 0;
    z-index: 111;
    width: 70px;
    height: 900px;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/No_Disponible.cur),
        auto;
    background: url(~@/assets/scroll.png) no-repeat bottom/cover;
    transition: all 0.6s;
    animation: float 2s linear infinite;
}
</style>