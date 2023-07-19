<template>
    <transition
        name="animate__animated animate__bounce"
        mode="out-in"
        appear
        enter-active-class="animate__slideInUp"
        leave-active-class="animate__slideOutDown"
    >
        <!-- @click.stop="$parent.isShow = true" -->
        <div
            class="comment-reply-box"
            @close="$parent.isShow = false"
            v-show="$parent.isShow"
            ref="replybox"
        >
            <span class="el-icon-close" @click.stop="$parent.isShow = false"></span>
            <div class="reply-box__info">
                <p>
                    回复：
                    <b>{{ replyUsername }}</b>
                </p>
                <button class="reply-box__info-emoji" @click.stop="handleEmoji">
                    <i class="el-icon-sunrise-1"></i>
                    表情
                </button>
                <Emoji :flag="$parent.$parent.flag"></Emoji>
            </div>
            <el-input
                type="textarea"
                ref="textarea"
                :rows="5"
                placeholder="请输入内容"
                autofocus
                v-model="textarea"
                resize="vertical"
                maxlength="255"
                show-word-limit
            ></el-input>
            <div class="reply-box__btngroup">
                <button @click="handleSubmit">回复</button>
                <button @click.stop="$parent.isShow = false">取消</button>
            </div>
        </div>
    </transition>
</template>

<script>
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';
export default {
    name: 'CommentReplyBox',
    components: {
        Emoji: () => import('../components/Emoji.vue'),
    },
    props: {
        replyUsername: {
            type: String,
            require: true,
            default: 'king',
        },
        isShow: {
            type: Boolean,
            require: true,
        },
        replyContent: {
            type: Object,
            require: true,
            default: function () {
                return {};
            },
        },
    },
    watch: {
        isShow: {
            immediate: true,
            handler(val) {
                this.$parent.$parent.flag = val ? 1 : 0;
                this.$nextTick(() => val && this.$refs.textarea.$el?.children[0].focus());
                setTimeout(() => {
                    this.isCloseModal = val ? false : true;
                }, 1000);
            },
        },
    },
    computed: {
        emojiShow() {
            return this.$parent.$parent.flag === 1;
        },
        ...mapGetters(['users', 'role', 'websocket']),
    },
    data() {
        return {
            textarea: '',
            isCloseModal: false,
            // replyContent: {},
        };
    },
    created() {
        this.$bus.$on('closeEmoji', () => (this.isEmoji = false));
        this.$bus.$on('changeEmoji2', emoji => (this.textarea += emoji));
        // this.$bus.$on('produceReplyContent', obj => {
        //     console.log(obj);
        //     this.replyContent = obj;
        // });
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('click', this.closeModal);
        });
    },

    methods: {
        closeModal(event) {
            if (!this.isCloseModal) {
                // let el = this.$refs.textarea.$el?.children[0];
                let el = this.$refs.replybox;
                this.$parent.isShow = el && !el.contains(event.target) ? false : true;
            }
        },
        handleEmoji() {
            this.$bus.$emit('changeEmojiShow');
        },
        // debounce
        handleSubmit: debounce(function () {
            if (!this.textarea.length && this.textarea == '') {
                this.$notify.warning({
                    title: '回复',
                    message: '请输入回复内容！',
                });
                return;
            }
            const obj = {
                formId: this.users.token,
                toId: this.replyContent.receiverId,
                originalContent: this.replyContent.originalContent,
                blogId: this.$route.params.id,
                adminComment: this.role === 'admin' ? 1 : 0,
                username: this.replyUsername,
                replyUsername: this.users.username,
                email: this.users.email,
                avatar: this.users.avatar,
                content: this.textarea,
                parentCommentId: this.$parent.parentCommentId,
                commentId: this.$parent.commentId,
            };
            this.$store.dispatch('comment/reply', obj).then(response => {
                if (response) {
                    this.$parent.isShow = false;
                    this.$notify.success({
                        title: '成功',
                        message: '评论成功~',
                    });
                    this.textarea = '';
                    this.$nextTick(() => {
                        obj.topic = 'reply';
                        // 发送 websocket message
                        this.websocket && this.websocket.send(JSON.stringify(obj));
                    });
                }
            });
        }, 200),
    },
    beforeDestroy() {
        this.$bus.$off(['closeEmoji', 'changeEmoji2', 'produceReplyContent']);
        window.removeEventListener('click', this.closeModal);
        Object.assign(this._data, this.$options.data());
    },
    beforeRouteLeave(to, from, next) {
        this.$bus.$off(['closeEmoji', 'changeEmoji2', 'produceReplyContent']);
        next(true);
    },
};
</script>

<style lang="scss" scoped>
.comment-reply-box {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 20px;
    width: 600px;
    height: fit-content;
    z-index: 33;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    background: #fff;
    box-shadow: 0 0 10px #0003;
    box-sizing: border-box;

    & > span {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            color: var(--marked-color);
            transform: rotate(180deg) scale(1.1);
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 10px #0003;
        }
    }

    .reply-box__btngroup {
        width: 100%;
        height: 38px;
        margin-top: 8px;

        button {
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 100%;
            border: none;
            background: none;
            overflow: hidden;
            cursor: pointer;

            &:before {
                content: '';
                position: absolute;
                display: block;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.1);
                top: 100%;
                transition: all 0.4s ease;
            }

            &:hover {
                &:before {
                    top: 0;
                }
            }
        }

        & > button:nth-child(1) {
            color: #fff;
            background: #17a2b8;
            border-bottom-left-radius: 6px;
        }

        & > button:nth-child(2) {
            background: #eee;
            border-bottom-right-radius: 6px;
        }
    }

    .reply-box__info {
        position: relative;
        display: flex;
        width: 100%;
        margin-bottom: 12px;

        .reply-box__info-emoji {
            position: absolute;
            right: 12px;
            top: 0;
            // color: var(--color-text-default);
            color: #000;
            border: 1px solid #def;
            background: none;
            padding: 4px 8px;
            outline: none;
            font-size: 12px;
            border-radius: 6px;
            cursor: pointer;

            i {
                margin-right: 2px;
            }
        }
    }
}

::v-deep .el-textarea .el-input__count {
    background: transparent;
}

.fade-leave-active {
    animation: scale-in-center 0.5s;
}

@keyframes scale-in-center {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        opacity: 0;
    }
}
</style>
