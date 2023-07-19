<template>
    <div class="notify-attention">
        <ReplyTitle title="新增粉丝" />
        <el-empty :image-size="250" description="开发中..."></el-empty>
    </div>
</template>

<script>
export default {
    name: 'NotifyAttention',
    components: {
        ReplyTitle: () => import('@/views/notify/components/head.vue'),
    },
    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped></style>
