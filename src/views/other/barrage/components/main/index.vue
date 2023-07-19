<template>
    <div class="barrage-container__comment">
        <LeftBox />
        <RightBox />
    </div>
</template>

<script>
export default {
    name: 'BarrageMain',
    components: {
        LeftBox: () => import('./left'),
        RightBox: () => import('./right'),
    },
    data() {
        return {
            flag: 0, // 0 一级评论展示 1 回复评论展示  控制 emoji
        };
    },
};
</script>

<style lang="scss" scoped>
.barrage-container__comment {
    display: flex;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
    box-sizing: border-box;

    /* 屏幕大于 1440px 时应用该样式 */
    @media screen and (min-width: 1440px) {
        width: 80%;
    }

    /* 屏幕小于 1440px 时应用该样式 */
    @media screen and (max-width: 1440px) {
        width: 91.8%;
    }
}
</style>
