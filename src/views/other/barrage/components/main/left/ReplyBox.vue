<template>
    <transition
        name="animate__animated animate__bounce"
        mode="in-out"
        appear
        enter-active-class="animate__slideInUp"
        leave-active-class="animate__slideOutDown"
        v-on:after-enter="afterEnter"
    >
        <!-- :class="[this.shake ? '_shake' : false]" -->
        <div
            class="reply-box"
            :class="{ _shake: this.shake }"
            v-clickoutside="handleClose"
            v-if="isReplyBox"
        >
            <div class="reply-username">
                回复:
                <span>{{ replyInfo.replyUsername }}</span>
            </div>
            <!-- :text.sync="text" -->
            <Say :isReplyBox="isReplyBox" :text.sync="text" @onsubmit="handleSubmit" />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ReplyBox',
    components: {
        Say: () => import('./say'),
    },
    props: {
        replyInfo: {
            type: Object,
            required: true,
            default: function () {
                return {};
            },
        },
        isReplyBox: {
            type: Boolean,
            required: true,
            default: false,
        },
    },

    data() {
        return {
            text: '',
            disabled: true,
        };
    },

    /* beforeDestroy() {
        console.log('beforeDestroy...');
    }, */

    methods: {
        afterEnter(el) {
            this.$nextTick(() => {
                this.disabled = false;
            });
        },
        handleClose() {
            !this.disabled &&
                setTimeout(() => {
                    !this.shake && this.$emit('update:isReplyBox', false), (this.disabled = true);
                }, 0);
        },
        handleSubmit(val) {
            let { data, type, isReply } = val;
            this.$nextTick(() => {
                this.text = '';
                isReply && this.$emit('update:isReplyBox', false);
            });
        },
    },
    computed: {
        shake() {
            return this.$parent.isShowToast;
        },
    },
    watch: {
        shake(newVal, oldVal) {
            setTimeout(() => {
                // this.$nextTick(() => (this.disabled = newVal));
                this.disabled = newVal;
            }, 0);
        },
    },
};
</script>

<style lang="scss" scoped>
.reply-box {
    position: fixed;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 20px;
    // width: 600px;
    width: 39.3%;
    height: fit-content;
    z-index: 33;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    background: #fff;
    box-shadow: 0 0 10px #0003;
    box-sizing: border-box;

    .reply-username {
        letter-spacing: 1px;
        color: #333;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 16px;

        span {
            color: #00a1d6;
        }
    }
}
</style>
