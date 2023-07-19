<template>
    <div class="files">
        <Header></Header>

        <Main></Main>
    </div>
</template>

<script>
export default {
    name: 'Files',
    components: {
        Header: () => import('./header'),
        Main: () => import('./main'),
    },
    data() {
        return {
            page: {
                currentPage: 1,
                pageSize: 4,
            }, // 分页
            type: 0,
            search: {
                type: 1,
                keyword: '',
            },
        };
    },
    watch: {
        type(newVla, oldVal) {
            this.$store.commit('classify/SET_TYPE', newVla);
        },
    },
};
</script>

<style scoped>
.files {
    width: 100%;
    height: 100%;
    min-height: 100vh;
}
</style>
