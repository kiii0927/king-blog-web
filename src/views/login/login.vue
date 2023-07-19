<template>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__lightSpeedInRight"
        leave-active-class="animate__hinge"
    >
        <div class="login-content__inner" v-show="isLogin">
            <div class="login-login-contain">
                <h2>登 录</h2>
                <!-- 表单 -->
                <div class="login-input-group" :class="{ _shake: verify === 1 }">
                    <i class="el-icon-user"></i>
                    <!-- @blur="checkUsername" @keyup.enter="checkUsername" -->
                    <input
                        type="text"
                        ref="username"
                        v-model="userInfo.username"
                        placeholder="请输入用户名、邮箱"
                        maxlength="8"
                    />
                    <span class="el-icon-circle-close" v-show="icons[0].circleClose"></span>
                    <span class="el-icon-circle-check" v-show="icons[0].circleCheck"></span>
                </div>
                <div class="login-input-group" :class="{ _shake: verify === 2 }">
                    <i class="el-icon-lock"></i>
                    <input
                        :type="userInfo.type"
                        ref="password"
                        v-model="userInfo.password"
                        placeholder="请输入密码"
                        @keyup.enter="checkPassWord"
                        maxlength="16"
                    />
                    <span
                        class="el-icon-view"
                        v-show="userInfo.password"
                        @click="changeType('text')"
                    ></span>
                </div>
                <!-- 登录相关 -->
                <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
                <input
                    v-if="!loading"
                    type="button"
                    class="login-btn _click"
                    @click="handleValidation"
                    value="登 录"
                />
                <div class="login-state" v-else>
                    <div class="login-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="login-else _click" @click.stop="isForgetPwd = true">
                    <a>忘记密码？</a>
                </div>
                <!-- 第三方登录 -->
                <div class="login-thirdpart">
                    <span class="fa fa-qq _click" title="qq登录" @click="handleLoginQQ"></span>
                    <!-- <span class="fa fa-weixin _click" title="微信登录" @click="handleLoginWX"></span> -->
                    <span
                        class="fa fa-github _click"
                        title="GitHub登录"
                        @click="handleAuthLogin('github')"
                    ></span>
                    <span class="fa _click" title="Gitee登录" @click="handleAuthLogin('gitee')">
                        <svg-icon icon-class="gitee" />
                    </span>
                    <!-- <span class="fa fa-weibo _click" title="微博登录" @click="handleLoginWB"></span> -->
                    <span class="fa _click" title="百度登录" @click="handleAuthLogin('baidu')">
                        <svg-icon icon-class="baidu" />
                    </span>
                </div>
            </div>
            <!-- 忘记密码组件 -->
            <ForgetPass v-if="isForgetPwd" />
        </div>
    </transition>
</template>

<script>
import { debounce } from 'lodash';
import { isEmpty, checkPass } from '@/utils/validate';

export default {
    props: {
        isLogin: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    data() {
        return {
            verify: 0, // 1: 用户名   2: 密码
            loading: false,
            authLoading: null,
            userInfo: {
                username: '',
                password: '',
                type: 'password',
            },
            icons: [
                {
                    circleClose: false, // 圆形 `x`
                    circleCheck: false, // 圆形 `√`
                },
            ],
            isShow: false,
            isForgetPwd: false,
            // myWindow: null,
        };
    },
    components: {
        Vcode: () => import('vue-puzzle-vcode'), // 滑块验证组件
        ForgetPass: () => import('./components/ForgetPassword.vue'), // 忘记密码
    },
    methods: {
        // 处理用户名是否合法
        checkUsername() {
            if (isEmpty(this.userInfo.username)) {
                this.$parent.$notify_warning('请输入用户名！');
                this.icons[0].circleClose = true;
                this.icons[0].circleCheck = false;
                this.verify = 1;
                setTimeout(() => (this.verify = 0), 820);
                return false;
            }
            this.icons[0].circleClose = false;
            this.icons[0].circleCheck = true;
            return true;
        },
        // 处理密码是否合法
        checkPassWord() {
            if (!this.checkUsername()) return;
            if (isEmpty(this.userInfo.password) || checkPass(this.userInfo.password) < 2) {
                this.$parent.$notify_warning('密码不合法，请检查！');
                this.verify = 2;
                setTimeout(() => (this.verify = 0), 820);
                return false;
            }
            return true;
        },
        // 处理表单验证
        handleValidation() {
            if (!this.checkPassWord()) return;
            this.handleLogin();
        },

        // 处理登录函数
        handleLogin: debounce(function () {
            // 检测表单是否合法
            // if (!this.handleValidation()) return;
            this.isShow = true;
        }, 500),

        /* 滑块验证处理函数 */
        onSuccess(msg) {
            this.isShow = false; // 通过验证后，需要手动关闭模态框
            this.loading = true;
            const obj = {
                username: this.userInfo.username,
                password: this.userInfo.password,
            };
            this.$store
                .dispatch('user/login', obj)
                .then(response => {
                    if (response) {
                        setTimeout(() => {
                            this.$parent.$notify_success('登录成功！');
                            this.$router.replace({ path: '/home' });
                            (this.userInfo.username = ''), (this.userInfo.password = '');
                        }, 300);
                    }
                })
                .catch(error => {
                    console.warn(error);
                })
                .finally(() => {
                    this.$nextTick(() => {
                        this.loading = false;
                    });
                });
        },
        onClose() {
            this.$nextTick(() => (this.isShow = false)); // 通过验证后，需要手动关闭模态框
        },

        // 更换 input 类型
        changeType(param) {
            if (!param) return;
            this.userInfo.type = this.userInfo.type == 'password' ? 'text' : 'password';
        },
        /* 第三方登录 */
        handleLoginQQ() {
            this.$parent.$notify_info('开发中...');
        },
        handleLoginWX() {
            this.$parent.$notify_info('开发中...');
        },
        handleAuthLogin(type) {
            this.loading = true;
            this.authLoading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            this.$API.user
                .oauthlogin(type)
                .then(res => {
                    // 获取到后端传递过来的授权路径
                    let { code, message, data } = res;
                    if (code !== 200) {
                        if (this.authLoading !== null) {
                            this.authLoading.close();
                        }
                        this.loading = false;
                        this.$message.error(message || '登录失败！');
                        return;
                    }
                    setTimeout(() => {
                        if (this.authLoading !== null) {
                            this.authLoading.close();
                        }
                        this.loading = false;
                        // 跳转到第三方授权页
                        window.location.href = res.data.url;
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleLoginWB() {
            this.$parent.$notify_info('开发中...');
        },
    },
};
</script>

<style scoped>
.login-state {
    position: relative;
    margin-top: 30px;
    width: 100px;
    height: 38px;
    background-color: var(--marked-color);
    border-radius: 50%;
    animation: 0.25s login-state ease forwards;
}

.login-state .login-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 40%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
}

.login-state .login-loading > div {
    width: 3px;
    height: 3px;
    background: white;
    border-radius: 50%;
    animation: 0.9s login-loading ease-in-out infinite alternate;
}

.login-state .login-loading > div:nth-child(2) {
    animation-delay: 0.2s;
}

.login-state .login-loading > div:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes login-state {
    to {
        width: 40px;
    }
}

@keyframes login-loading {
    to {
        transform: translateY(-10px);
    }
}

@keyframes login-loaded {
    to {
        stroke-dashoffset: 0px;
    }
}
</style>
