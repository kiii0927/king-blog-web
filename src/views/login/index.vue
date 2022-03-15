<template>
  <div class="login">
    <div class="login-bg" :class="[isLogin ? '' : 'right']"></div>
    <div class="login-content">
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__lightSpeedInRight"
        leave-active-class="animate__hinge"
      >
        <div class="login-content__inner" v-show="isLogin">
          <div class="login-login-contain">
            <h2>登 录</h2>
            <div class="login-input-group">
              <i class="el-icon-user"></i>
              <input
                type="text"
                v-model="username"
                placeholder="请输入邮箱、用户名、账号"
              />
            </div>
            <div class="login-input-group">
              <i class="el-icon-lock"></i>
              <input :type="type" v-model="password" placeholder="请输入密码" />
              <span
                class="el-icon-view"
                v-show="password"
                @click="changeType"
              ></span>
            </div>
            <input
              type="button"
              class="login-btn"
              @click="handleLogin"
              value="登 录"
            />
            <div class="login-else">
              <a @click="$_notify_info('开发中...')">忘记密码？</a>
            </div>
            <div class="login-thirdpart">
              <span
                class="fa fa-qq"
                title="qq登录"
                @click="handleLoginQQ"
              ></span>
              <span
                class="fa fa-weixin"
                title="微信登录"
                @click="handleLoginWX"
              >
              </span>
              <span class="fa fa-weibo" title="微博登录" @click="handleLoginWB">
              </span>
            </div>
          </div>
        </div>
      </transition>
      <div class="login-content__mask" :class="[isLogin ? '_right' : '_left']">
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeInUp"
          leave-active-class="animate__fadeOutDown"
        >
          <div class="cutover-content__aside" v-show="isLogin">
            <h2>没有账号?</h2>
            <p>快来加入吧</p>
            <input
              type="button"
              class="login-btn"
              value="注册"
              @click="toRegister"
            />
          </div>
        </transition>
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeInUp"
          leave-active-class="animate__fadeOutDown"
        >
          <div class="cutover-content__aside" v-show="!isLogin">
            <h2>已有账号</h2>
            <p>赶紧登录</p>
            <input
              type="button"
              class="login-btn"
              value="登录"
              @click="toLogin"
            />
          </div>
        </transition>
      </div>

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

            <div class="login-input-group">
              <i class="el-icon-user"></i>
              <input
                type="text"
                v-model="username"
                placeholder="请输入邮箱、用户名、账号"
              />
            </div>
            <div class="login-input-group">
              <i class="el-icon-lock"></i>
              <input :type="type" v-model="password" placeholder="请输入密码" />
              <span
                class="el-icon-view"
                v-show="password"
                @click="changeType"
              ></span>
            </div>
            <input
              type="button"
              class="login-btn"
              @click="handleLogin"
              value="登 录"
            />
            <div class="login-else">
              <a @click="$_notify_info('开发中...')">忘记密码？</a>
            </div>
            <div class="login-thirdpart">
              <span
                class="fa fa-qq"
                title="qq登录"
                @click="handleLoginQQ"
              ></span>
              <span
                class="fa fa-weixin"
                title="微信登录"
                @click="handleLoginWX"
              >
              </span>
              <span class="fa fa-weibo" title="微博登录" @click="handleLoginWB">
              </span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import notify from "@/mixin/notify";
export default {
  name: "Login",
  mixins: [notify],
  data() {
    return {
      username: "",
      password: "",
      type: "password",
      isLogin: true,
      active: 0,
    };
  },
  methods: {
    changeType() {
      if (!this.password) return;
      this.type = this.type == "password" ? "text" : "password";
    },
    handleLogin() {
      if (!this.username) return this.$_notify_warning("请输入用户名...");
      if (!this.password) return this.$_notify_warning("请输入密码...");
      this.username = "";
      this.password = "";
      this.$_notify_success("登录成功~");
    },
    handleLoginQQ() {
      this.$_notify_info("开发中...");
    },
    handleLoginWX() {
      this.$_notify_info("开发中...");
    },
    handleLoginWB() {
      this.$_notify_info("开发中...");
    },
    toRegister() {
      this.isLogin = false;
    },
    toLogin() {
      this.isLogin = true;
    },
  },
};
</script>


<style scoped>
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.login .login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://www.adicw.cn/assets/login-bg-blur.e1c64969.jpg");
  background-size: 200%;
  background-position: center right;
  transition: all 625ms;
}

.login .login-content {
  position: relative;
  width: 800px;
  height: 530px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(10, 107, 96, 0.2) 0px 20px 40px;
  transform: scale(1.3);
}
.login .login-content h2 {
  font-size: 36px;
  font-weight: 500;
}

.login .login-content .login-content__inner {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login .login-content .login-content__inner:first-child {
  float: left;
}
.login .login-content .login-content__inner:last-child {
  float: right;
}

.login .login-content .login-content__inner .login-login-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}

.login-content__inner .login-login-contain .login-input-group {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 30px;
  overflow: hidden;
  background: #f4f4f4;
  border-radius: 5px;
}
.login-content__inner .login-login-contain .login-input-group i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background: var(--blue-color);
  color: #fff;
  font-weight: 800;
}

.login-content__inner .login-login-contain .login-input-group input {
  width: 100%;
  height: 100%;
  color: #495057;
  border: none;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1rem;
  outline: none;
  background: 0 0;
  cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/texto.cur),
    auto;
}

.login-content__inner.login-login-contain .login-input-group span {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.login-content__inner .login-login-contain .login-btn {
  width: 100%;
  transition: all 0.25s ease;
  margin-top: 30px;
  background-color: var(--blue-color);
}

.login .login-btn {
  width: 100px;
  height: 38px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  border: none;
  box-sizing: border-box;
  display: block;
  background: 0 0;
}

.login-login-contain .login-else {
  width: 100%;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}
.login-login-contain .login-else a {
  color: var(--blue-color) !important;
}

.login-login-contain .login-thirdpart {
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.login-login-contain .login-thirdpart span {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #f4f4f4;
  cursor: pointer;
  color: #333;
}
.icon-size {
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login .login-content .login-content__mask {
  display: flex;
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 33;
  transition: all 0.6s;
}

.login-content__mask::before {
  content: "";
  display: block;
  position: absolute;
  top: 12px;
  left: 12px;
  width: calc(100% - 12px * 2);
  height: calc(100% - 12px * 2);
  transition: inherit;
  background-image: url("https://www.adicw.cn/assets/login-bg.23854de2.jpg");
  background-position: top right;
  background-size: cover;
  z-index: -1;
  border-radius: 10px;
}
.login-content__mask._left::before {
  background-position: top left;
}

.login-content__mask .cutover-content__aside {
  position: absolute;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.login
  .login-content
  .login-content__mask
  .cutover-content__aside
  input[type="button"] {
  border: 1px solid #fff;
}

.login input[type="text"] {
  font-size: 16px !important;
  text-indent: 0 !important;
}

.right {
  background-position: center left !important;
}
.login-content__mask._left {
  transform: translateX(-100%);
}

.login-content__mask._right {
  transform: translateX(0);
}
</style>

<style>
.el-steps {
  display: flex;
  width: 100%;
  margin: 26px 0px 20px;
}

.el-steps .el-step.is-horizontal {
  display: inline-block;
  flex-basis: 100%;
}

.el-step__head.is-finish {
  color: #409eff;
  /* border-color: #409eff; */
}

.step__icon ._step__icon-inner {
  user-select: none;
  font-weight: 700;
  color: inherit;
}
.el-step__line-inner {
  display: block;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  -webkit-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 0;
  height: 0;
}

.step__icon.is-text {
  border: 2px solid inherit;
  border-radius: 50%;
}

._step__head .step__icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
}

.el-step__line {
  background-color: #e6e7e9;
}
</style>