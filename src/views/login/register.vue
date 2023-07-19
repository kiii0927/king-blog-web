<template>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__lightSpeedInRight"
        leave-active-class="animate__lightSpeedOutRight"
    >
        <div class="login-content__inner" v-show="!isLogin">
            <div class="login-login-contain">
                <h2>注 册</h2>

                <el-steps
                    :active="active"
                    align-center
                    finish-status="success"
                    process-status="finish"
                >
                    <el-step title="基础信息"></el-step>
                    <el-step title="邮箱验证" status="process"></el-step>
                    <el-step title="自动登录"></el-step>
                </el-steps>
                <!-- 基础信息 -->
                <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__fadeInLeft"
                    leave-active-class="animate__fadeOutLeft"
                    v-on:after-leave="baseInfoAfterLeave"
                >
                    <div class="login-register-baseinfo" v-if="active === 0">
                        <div class="login-input-group" :class="{ _shake: verify === 1 }">
                            <i class="el-icon-user"></i>
                            <!-- @blur="handleCheckUserName" @keyup.enter="handleCheckUserName" -->
                            <input
                                type="text"
                                ref="username"
                                v-model.trim="userInfo.username"
                                placeholder="请输入用户名"
                                maxlength="8"
                                @blur="handleCheckUserName"
                                @keyup.enter="handleCheckUserName"
                            />
                            <span class="el-icon-circle-check" v-show="icons[0].circleCheck"></span>
                        </div>
                        <div class="login-input-group" :class="{ _shake: verify === 2 }">
                            <i class="el-icon-lock"></i>
                            <input
                                :type="userInfo.type"
                                ref="password"
                                v-model.trim="userInfo.password"
                                @keyup.enter="handleCheckPass"
                                placeholder="请输入密码"
                                maxlength="16"
                            />
                            <span
                                class="el-icon-view"
                                v-show="userInfo.password && !icons[1].circleCheck"
                                @click="changeType(1)"
                            ></span>
                            <span class="el-icon-circle-check" v-show="icons[1].circleCheck"></span>
                        </div>
                        <div class="login-input-group" :class="{ _shake: verify === 3 }">
                            <i class="el-icon-lock"></i>
                            <input
                                :type="userInfo.type2"
                                ref="password2"
                                v-model.trim="userInfo.password2"
                                @keyup.enter="handleNext"
                                maxlength="16"
                                placeholder="请再次输入密码"
                            />
                            <span
                                class="el-icon-view"
                                v-show="userInfo.password2 && !icons[2].circleCheck"
                                @click="changeType(2)"
                            ></span>
                            <span class="el-icon-circle-check" v-show="icons[2].circleCheck"></span>
                        </div>
                    </div>
                </transition>
                <!-- 邮箱注册 -->
                <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__fadeInRight"
                    leave-active-class="animate__fadeOutRight"
                    v-on:after-leave="emailAfterLeave"
                >
                    <div class="login-register-email" v-if="active === 1">
                        <div class="login-input-group" :class="{ _shake: verify === 4 }">
                            <i class="el-icon-message"></i>
                            <input
                                type="text"
                                ref="mail"
                                v-model.trim="mail"
                                placeholder="请输入邮箱"
                                maxlength="32"
                                @keyup.enter="checkEmail"
                            />
                            <span
                                class="el-icon-circle-close icon_tips"
                                v-show="icons[3].circleClose"
                            ></span>
                            <span
                                class="el-icon-circle-check icon_tips"
                                v-show="icons[3].circleCheck"
                            ></span>
                        </div>
                        <div class="login-input-group">
                            <i class="el-icon-paperclip"></i>
                            <input
                                type="text"
                                ref="verifiCode"
                                v-model.trim="verifiCode"
                                placeholder="请输入验证码"
                                @keyup.enter="handleRegister"
                                maxlength="6"
                            />
                            <span
                                class="verificode"
                                @click="handleVerifiCode"
                                v-if="!countdown.isShow"
                            >
                                获取验证码
                            </span>
                            <span class="_countdown verificode" v-else>{{ countdown.text }}</span>
                        </div>
                    </div>
                </transition>

                <!-- btn -->
                <div class="login-register-btngroup">
                    <!-- 下一步 -->
                    <input
                        type="button"
                        :value="stepText"
                        class="login-btn register-btn-change"
                        @click="handleStep"
                    />
                    <transition
                        name="animate__animated animate__bounce"
                        enter-active-class="animate__fadeInRight"
                        leave-active-class="animate__fadeOutRight"
                        mode="out-in"
                    >
                        <input
                            type="button"
                            value="注册"
                            v-if="active === 1"
                            class="login-btn register-btn-res"
                            @click="handleRegister"
                        />
                    </transition>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { debounce } from 'lodash';
import { checkPass, isEmail, isEmpty } from '@/utils/validate';
import { SendEmailCode, register } from '@/api/user';
import { userIsExist, emailIsExist, checkEmailCode } from '@/api/validation';

export default {
    props: {
        isLogin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            valid: true, // 标记表单数据是否合法
            stepText: '下一步',
            mail: '',
            verifiCode: '', // 验证码
            verify: 0, // 1 用户名 2 密码 3 二次密码  4 邮箱
            countdown: {
                // 倒计时
                text: 60, // 数字
                time: null, // 定时器
                isShow: false, // 控制显示
            },
            active: 0,
            sendCount: 0,
            userInfo: {
                username: '',
                password: '',
                password2: '',
                type: 'password',
                type2: 'password',
            },
            icons: [
                {
                    circleClose: false,
                    circleCheck: false, // 圆形 `√`
                },
                {
                    circleClose: false,
                    circleCheck: false, // 圆形 `√`
                },
                {
                    circleClose: false,
                    circleCheck: false, // 圆形 `√`
                },
                {
                    circleClose: false,
                    circleCheck: false, // 圆形 `√`
                },
            ],
        };
    },
    methods: {
        // 离开后
        baseInfoAfterLeave(el) {
            this.active = 1;
        },
        emailAfterLeave() {
            this.active = 0;
        },
        // 检测用户是否存在
        async handleCheckUserName() {
            if (isEmpty(this.userInfo.username)) {
                this.verify = 1;
                this.icons[0].circleCheck = false;
                this.commonValidate('请输入用户名！');
                return false;
            }
            let { data, code, message } = await userIsExist(this.userInfo.username);
            if (code !== 200) {
                this.verify = 1;
                this.icons[0].circleCheck = false;
                this.$nextTick(() => {
                    this.$refs.username.focus();
                });
                setTimeout(() => (this.verify = 0), 820);
                return false;
            }
            this.icons[0].circleCheck = true;
            // this.$nextTick(() => {
            //     this.$refs.password.focus();
            // });
            return true;
        },

        // 检测邮箱; 是否合法是否存在
        async checkEmail() {
            if (isEmpty(this.mail) || !isEmail(this.mail)) {
                this.commonEmail();
                this.$parent.$notify_warning('请输入正确的邮箱格式！');
                this.valid = false;
                return false;
            }
            let { data, code, message } = await emailIsExist(this.mail);
            if (code !== 200) {
                this.commonEmail();
                this.valid = false;
                return false;
            }
            this.icons[3].circleClose = false;
            this.icons[3].circleCheck = true;
            this.valid = true;
            return true;
        },
        commonEmail() {
            this.icons[3].circleClose = true;
            this.icons[3].circleCheck = false;
            this.verify = 4;
            setTimeout(() => (this.verify = false), 820);
        },

        // 处理步骤函数
        handleStep: debounce(function () {
            this.handleValidate();
            this.$nextTick(() => {
                if (!this.valid) {
                    this.$notify({
                        title: '警告',
                        message: '请检查表单内容是否完整！',
                        type: 'warning',
                    });
                    return;
                }
                this.stepText = this.stepText == '下一步' ? '上一步' : '下一步';
                this.active = -1;
            });
        }, 300),

        // 处理注册函数
        handleRegister: debounce(async function () {
            // if (!this.handleValidate() || !this.icons[3].circleCheck || !this.verifiCode) return this.$parent.$notify_warning("请检查表单内容是否完整！");
            if (!this.valid() || !this.verifiCode) return;
            let _this = { ...this };
            let { data, code, message } = await checkEmailCode({
                email: this.mail,
                code: this.verifiCode,
            });
            if (code !== 200) return;
            const obj = {
                username: _this.userInfo.username,
                password: _this.userInfo.password,
                email: _this.mail,
            };
            let result = await register(obj);
            if (result.code === 200) {
                this.aoutLogin(result.data);
            }
        }, 500),

        // 处理自动登录, 把用户信息存储起来
        aoutLogin(user) {
            this.active += 1;
            this.$store.commit('user/SET_USER_INFO', user);
            this.$parent.$notify_success('登录成功！');
            setTimeout(() => {
                this.$router.replace({ path: '/home' });
            }, 800);
        },

        // 表单验证
        handleValidate() {
            if (isEmpty(this.userInfo.username)) {
                this.verify = 1;
                this.icons[0].circleCheck = false;
                this.commonValidate('请输入用户名！');
                this.valid = false;
                return false;
            }
            if (isEmpty(this.userInfo.password) || checkPass(this.userInfo.password) != 2) {
                this.verify = 2;
                this.commonValidate('密码不合法！');
                this.valid = false;
                return false;
            }
            if (this.userInfo.password2 !== this.userInfo.password) {
                this.verify = 3;
                this.commonValidate('两次密码输入不一致！');
                this.valid = false;
                return false;
            }
            this.valid = true;
            return true;
        },
        commonValidate(msg) {
            this.$parent.$notify_warning(msg);
            setTimeout(() => (this.verify = false), 820);
        },

        // 处理验证码函数
        handleVerifiCode() {
            this.checkEmail().then(response => {
                if (!response) {
                    this.commonEmail();
                    this.$nextTick(() => {
                        this.$refs.mail.focus();
                    });
                    return;
                }
                this.sendCount++;
                if (this.sendCount > 3) {
                    this.$message.warning('邮箱或获取异常，请联系管理员！');
                    return;
                }
                this.sendEmailCode();
            });
        },
        async sendEmailCode() {
            let { data, code, message } = await SendEmailCode(this.mail);
            if (code === 200) {
                this.$message.success('验证码已发送，可能会有延迟，请注意查收！');
                this.handleCountDown();
                // this.$nextTick(() => {
                //     this.$refs.verifiCode.focus();
                // });
            }
        },
        /* 倒计时 */
        handleCountDown() {
            if (!this.countdown.time) {
                this.countdown.isShow = true;
                this.countdown.time = setInterval(() => {
                    this.countdown.text -= 1;
                    if (this.countdown.text <= 0) {
                        this.countdown.text = 60;
                        clearInterval(this.countdown.time);
                        this.countdown.time = null;
                        this.countdown.isShow = false;
                    }
                }, 1000);
            }
        },

        changeType(param) {
            if (param === 1) {
                if (!this.userInfo.password) return;
                this.userInfo.type = this.userInfo.type == 'password' ? 'text' : 'password';
            } else {
                if (!this.userInfo.password2) return;
                this.userInfo.type2 = this.userInfo.type2 == 'password' ? 'text' : 'password';
            }
        },

        handleCheckPass() {
            if (isEmpty(this.userInfo.password) || checkPass(this.userInfo.password) != 2) {
                this.verify = 2;
                this.icons[1].circleCheck = false;
                this.commonValidate('密码不合法！');
                return false;
            }
            this.icons[1].circleCheck = true;
            return true;
        },
        handleCheckPass2() {
            if (!this.handleCheckPass()) return;
            if (this.userInfo.password2 != this.userInfo.password) {
                this.verify = 3;
                this.icons[2].circleCheck = false;
                this.commonValidate('两次密码输入不一致！');
                return false;
            }
            this.icons[2].circleCheck = true;
            return true;
        },
    },
};
</script>

<style scoped lang="scss">
.login-content__inner {
    .login-login-contain {
        .login-register-baseinfo,
        .login-register-email {
            min-height: 210px;
            height: -webkit-fit-content;
            height: -moz-fit-content;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .login-input-group {
                .verificode {
                    position: absolute;
                    top: 0;
                    right: 0;
                    box-sizing: border-box;
                    font-size: 12px;
                    width: 80px;
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: var(--blue-color);
                    cursor: pointer;
                    border: 2px solid var(--blue-color);
                    transition: all 0.25s;
                    border-radius: 5px;

                    &:hover {
                        background-color: #eee;
                    }
                }

                ._countdown {
                    font-size: 18px;
                }
            }
        }

        .login-register-btngroup {
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .register-btn-res {
                // width: 80px;
                background: #ce4a50;
            }
        }

        ._top {
            margin-top: 30px;
        }
    }
}
</style>
