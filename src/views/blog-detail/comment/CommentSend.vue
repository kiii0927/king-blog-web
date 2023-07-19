<template>
    <div class="comment-send" ref="comment">
        <template v-if="token">
            <div class="comment-avatar">
                <img :src="avatar" />
            </div>
            <div class="comment-input">
                <el-input
                    type="textarea"
                    v-model="commentContent"
                    rows="3"
                    maxlength="255"
                    show-word-limit
                    placeholder="请输入内容"
                    ref="commentContent"
                />
                <!-- emoji -->
                <button class="comment-input-emoji" @click.stop="handleEmoji">
                    <i class="el-icon-sunrise-1"></i>
                    表情
                </button>
                <Emoji v-if="!$parent.flag" :flag="$parent.flag"></Emoji>
            </div>
            <div class="comment-btn" @click="issueComment">
                <span>发布</span>
            </div>
        </template>
        <div v-else class="comment-unlogin">
            <span @click="handleLogin">点击登录~</span>
        </div>
    </div>
</template>

<script>
import notify from '@/mixin/notify';
import { mapGetters } from 'vuex';

export default {
    name: 'CommentSend',
    mixins: [notify],
    components: {
        Emoji: () => import('../components/Emoji.vue'),
    },
    data() {
        return {
            commentContent: '', // 评论内容
            placeholderCopy: '',
            commetns: {},
        };
    },
    created() {
        this.$bus.$on('skipComment', () => {
            this.$refs.comment?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        });
        this.$bus.$on('changeEmoji', emoji => (this.commentContent += emoji));
        this.$bus.$on('replyComment', param => this.replyComment(param));
    },
    methods: {
        handleLogin() {
            this.$router.push('/login');
        },
        handleEmoji() {
            this.$bus.$emit('changeEmojiShow');
        },
        // 回复函数
        replyComment(param) {
            this.commetns = {};
            Object.assign(this.commetns, param);
            let nickname = param.childNickname || param.nickname;
            this.placeholder = '回复@' + nickname;
            this.$nextTick(() => {
                this.$refs.commentContent.focus();
            });
        },
        // 评论函数
        issueComment() {
            if (this.commentContent == '' || this.commentContent.length == 0) {
                this.$notify_warning('请输入内容！');
                this.$nextTick(() => {
                    this.$refs.commentContent.focus();
                });
                return;
            }
            const obj = {
                formId: this.users.id,
                blogId: this.$route.params.id,
                adminComment: this.role === 'admin' ? 1 : 0,
                username: this.users.username,
                email: this.users.email,
                avatar: this.avatar,
                content: this.commentContent,
            };
            this.$store.dispatch('comment/save', obj).then(response => {
                if (response) {
                    this.$notify_success('评论成功~');
                    this.commentContent = '';
                }
            });
        },
    },
    computed: {
        ...mapGetters(['token', 'users', 'role', 'avatar']),
    },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__count {
    background: transparent;
}

::v-deep .el-input--medium {
    margin-top: 2px;
}

::v-deep .el-textarea__inner {
    max-height: 65px;
}
</style>

<style scoped>
.comment .comment-send {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.comment-send .comment-unlogin {
    width: 100%;
    height: 45px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin: 0 18px;
    box-sizing: border-box;
}

.comment-unlogin span {
    -webkit-transition: 0.25s color ease 0.1s, 0.25s padding-left ease 0.1s,
        0.25s background-color ease 0.1s;
    transition: 0.25s color ease 0.1s, 0.25s padding-left ease 0.1s,
        0.25s background-color ease 0.1s;
}

.comment-unlogin span:hover {
    padding-left: 1em;
}

.comment .comment-avatar {
    width: 70px;
    height: 70px;
}

.comment .comment-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.comment .comment-input {
    position: relative;
    width: calc(100% - 200px);
    padding: 0 10px;
}

.comment .comment-input .comment-input-emoji {
    border: 1px solid #def;
    background: 0 0;
    margin-top: 8px;
    padding: 8px 6px;
    outline: 0;
    font-size: 18px;
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;
}

.comment .comment-input .comment-input-emoji:hover {
    box-shadow: 2px 3px 3px rgb(0 0 0 / 10%);
    border-color: #ddd;
}

.comment .comment-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    width: 70px;
    height: 70px;
    border-radius: 6px;
    background: var(--blue-color);
    cursor: pointer;
    transition: all 0.25s;
    user-select: none;
}

.comment .comment-btn:hover {
    box-shadow: 0 0 10px var(--blue-color);
}
</style>
