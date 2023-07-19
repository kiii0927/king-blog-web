<template>
    <div class="barrage">
        <div class="barrage-container">
            <Header />

            <Main />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Barrage',
    components: {
        Header: () => import('./components/header'),
        Main: () => import('./components/main'),
    },
};
</script>

<style lang="scss" scoped>
.barrage {
    width: 100%;
    height: 100%;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    // align-items: center;
    overflow: hidden;

    .barrage-container {
        min-height: 100vh;
        height: 100%;
        width: 92%;
    }
}
</style>
