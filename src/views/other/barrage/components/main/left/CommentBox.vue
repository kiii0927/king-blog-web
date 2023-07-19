<template>
    <div class="comment-box" id="say">
        <div class="form-box">
            <!-- :comment.sync="$parent.commentForm" -->
            <Say :isReplyBox="false" :text.sync="text" @onsubmit="handleSubmit" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentBox',
    components: {
        Say: () => import('./say'),
    },
    data() {
        return {
            text: '',
        };
    },
    methods: {
        handleSubmit(val) {
            let { data, type, isReply } = val;
            this.$nextTick(() => {
                this.text = '';
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.comment-box {
    display: flex;
    justify-content: center;
    margin: 60px 0 30px;
    padding: 0 32px;
    box-sizing: border-box;

    .form-box {
        width: 81.7%;
    }
}
</style>
