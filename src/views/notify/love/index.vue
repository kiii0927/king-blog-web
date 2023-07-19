<template>
    <div class="notify-love">
        <ReplyTitle title="收到的赞" />

        <NotifyContent :contentlList="loveList" :isLike="true" />
    </div>
</template>

<script>
export default {
    name: 'NotifyLove',

    components: {
        ReplyTitle: () => import('@/views/notify/components/head.vue'),
        NotifyContent: () => import('@/views/notify/components/content.vue'),
    },

    data() {
        return {
            loveList: [],
        };
    },

    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped></style>
