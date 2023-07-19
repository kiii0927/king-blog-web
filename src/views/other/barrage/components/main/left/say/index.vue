<template>
    <div class="say" v-if="token">
        <!-- show-word-limit -->
        <el-input
            ref="message"
            type="textarea"
            resize="none"
            rows="4"
            maxlength="500"
            v-model.trim="message"
            placeholder="留下你的足迹吧~"
            @keydown.enter.native="handleSubmit"
            :class="{ _shake: this.shake }"
        />
        <div class="message-but">
            <el-popover
                ref="popover"
                placement="left-start"
                trigger="click"
                transition="fade-in-scale"
                popper-class="k-popover"
                @hide="hide"
                @show="show"
            >
                <Emoji :content.sync="content" :popover="$refs.popover" :input="$refs.message" />
                <div class="emoji" title="表情" slot="reference">OωO</div>
            </el-popover>

            <div class="submit" title="点击提交评论" @click.stop="handleSubmit">
                <span v-if="submit">
                    <i style="margin-right: 4px" class="el-icon-loading" />
                    执行中...
                </span>
                <span v-else>提交评论</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Say',
    components: {
        Emoji: () => import('@/components/Emoji'),
    },
    props: {
        text: {
            type: String,
            required: true,
            default: '',
        },

        isReplyBox: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            shake: false,
            submit: false,
            cityInfo: {
                city: undefined,
                province: undefined,
            },
        };
    },

    methods: {
        show() {
            this.$parent.disabled != undefined &&
                !this.$parent.disabled &&
                (this.$parent.disabled = true);
        },
        hide() {
            this.$parent.disabled != undefined &&
                this.$parent.disabled &&
                (this.$parent.disabled = false);
        },
        handleSubmit() {
            if (!this.message) {
                this.shake = true;
                this.$message({
                    message: '您再检查检查，看看哪还没写~',
                    type: 'warning',
                });
                setTimeout(() => {
                    this.shake = false;
                    this.$refs.message?.focus();
                }, 820);
                return;
            }
            this.$nextTick(() => {
                this.$refs.message?.blur();
            });
            this.submit = true;
            this.getAddress()
                .then(response => {
                    let { city, province } = response.data;
                    city && (this.cityInfo.city = city),
                        province && (this.cityInfo.province = province);
                })
                .catch(error => {
                    console.log(error);
                })
                .then(() => {
                    this.$nextTick(() => {
                        const data = {
                            adminComment: this.role === 'admin' ? 1 : 0,
                            formId: this.token,
                            username: this.username,
                            email: this.email,
                            avatar: this.avatar,
                            message: this.message,
                            province: this.cityInfo.province,
                            city: this.cityInfo.city,
                        };
                        // reply
                        if (this.isReplyBox) {
                            let replyInfo = this.$parent.replyInfo;
                            (data.replyUsername = replyInfo?.replyUsername),
                                (data.commentId = replyInfo?.commentId),
                                (data.parentCommentId = replyInfo?.parentCommentId);
                        }
                        this.submit = false;
                        let _val = {
                            data,
                            type: this.isReplyBox ? 'reply' : 'comment',
                            isReply: this.isReplyBox,
                        };
                        // send request
                        this.sendRequest(_val);
                    });
                });
        },

        sendRequest(val) {
            let { data, type, isReply } = val;
            this.$store
                .dispatch('barrage/addBarrage', { data, type })
                .then(response => {
                    this.$nextTick(() => {
                        // this.$emit('update:text', '');
                        this.$emit('onsubmit', val);
                        this.$message({
                            showClose: true,
                            message: isReply ? '回复成功' : '评论成功',
                            type: 'success',
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },

        /* 获取ip地址 */
        getAddress() {
            const axios = require('axios');
            let ipaddr = localStorage.getItem(ipaddr);
            if (ipaddr) {
                return axios
                    .get(
                        `https://restapi.amap.com/v3/ip?ip=${ipaddr}&key=1d12a0144b05d89cad2f19d8f933892e`
                    )
                    .then(response => {
                        return Promise.resolve(response);
                    })
                    .catch(error => {
                        console.log(error);
                        return Promise.reject('failed');
                    });
            } else {
                return axios
                    .get('https://v.api.aa1.cn/api/myip/index.php?aa1=json')
                    .then(response => {
                        if (response.data.myip) {
                            localStorage.setItem('ipaddr', response.data?.myip);
                            let result = axios.get(
                                `https://restapi.amap.com/v3/ip?ip=${response.data.myip}&key=1d12a0144b05d89cad2f19d8f933892e`
                            );
                            return Promise.resolve(result);
                        } else {
                            return Promise.reject('failed');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        return Promise.reject('failed');
                    });
            }
        },
    },

    computed: {
        ...mapGetters(['token', 'avatar', 'email', 'role', 'username']),
        message: {
            get() {
                return this.text;
            },
            set(newVal) {
                this.$emit('update:text', newVal);
            },
        },
        content: {
            get() {
                return this.text;
            },
            set(newVal) {
                this.$emit('update:text', newVal);
            },
        },
    },
};
</script>

<style>
.k-popover {
    background-color: transparent;
    border: 0;
    padding: 0;
}

.fade-in-scale-enter-active,
.fade-in-scale-leave-active {
    transition: all 0.3s;
}

.fade-in-scale-enter,
.fade-in-scale-leave-to {
    opacity: 0;
    transform: translateZ(50px) scale(0.3);
}
</style>

<style lang="scss" scoped>
.say {
    width: 100%;

    .message-but {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .submit,
        .emoji {
            padding: 3px 10px;
            box-sizing: border-box;
            border: 1px solid #ced4da;
            border-radius: 20px;
            font-weight: 700;
            color: #606266;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            &:hover {
                background: #ced4da;
                color: #fff;
                transition: 0.4s;
            }
        }
    }

    .clearmargin {
        margin-right: 0;
    }

    .textarea {
        width: 100%;

        ::v-deep .el-form-item__content {
            width: inherit;
        }
    }

    ::v-deep .el-textarea__inner {
        letter-spacing: 1px;
        font-weight: 500;
        background-image: url('~@/assets/blog_text.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 100%;

        &:focus {
            background-image: none;
        }
    }
}
</style>
