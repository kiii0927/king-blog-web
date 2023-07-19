<template>
    <menu class="nav-bar">
        <div class="nav-bar_header">
            <div class="_logo">
                <!-- <img src="https://www.adicw.cn/assets/logo.43951157.png" alt="..." /> -->
                <span style="font-size: 1.5em">
                    <!-- {{ users.username || title }} -->
                    {{ title }}
                </span>
            </div>
        </div>
        <!-- _shake-horizontal -->
        <div class="nav-bar__user" :class="[!this.token ? '_click' : false]">
            <div
                class="nav-bar__user-login"
                v-if="!this.token"
                title="点击登录"
                @click="$router.push('/login')"
            >
                <span>未登录</span>
            </div>
            <div class="nav-bar__user-logged" v-else>
                <img :src="users.avatar" />
                <p>{{ users.username }}</p>
                <div class="nav-bar__user-logged__tools">
                    <!-- <el-badge is-dot hidden> -->
                    <i class="fa fa-user-o" @click="$router.push('/user/profile')" />
                    <!-- </el-badge> -->
                    <!-- medium size="small" -->
                    <el-dropdown placement="bottom" @command="handleCommand">
                        <el-badge :is-dot="isDot">
                            <i class="fa fa-envelope-o" @click="$router.push('/notify')" />
                        </el-badge>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="/notify/reply" style="padding: 3px 17px">
                                <el-badge :is-dot="dots.reply">回复我的</el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item command="/notify/love" style="padding: 3px 17px">
                                <el-badge :is-dot="dots.love">收到的赞</el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item command="/notify/attention" style="padding: 3px 17px">
                                <el-badge :is-dot="dots.attention">新增粉丝</el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item command="/notify/system" style="padding: 3px 17px">
                                <el-badge :is-dot="dots.system">系统通知</el-badge>
                            </el-dropdown-item>
                            <!-- disabled -->
                            <el-dropdown-item command="/notify/setting" style="padding: 3px 17px">
                                消息设置
                            </el-dropdown-item>
                            <!-- <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <el-badge is-dot hidden> -->
                    <i class="fa fa-bell-o" @click.stop="handleBell" />
                    <!-- </el-badge> -->
                </div>
            </div>
        </div>
        <div class="nav-bar_navs">
            <div class="tab-bar__navs-content">
                <div
                    class="nav-bar_navs__nav _click"
                    :class="{ nav_active: $route.path == '/home' }"
                    @click="$router.push('/home')"
                >
                    <div class="nav-content">
                        <p>首页</p>
                        <i></i>
                    </div>
                    <div class="nav-icon">
                        <svg-icon icon-class="home" />
                    </div>
                </div>

                <div
                    class="nav-bar_navs__nav _click"
                    :class="{ nav_active: $route.path == '/files' }"
                    @click="$router.push('/files')"
                >
                    <div class="nav-content">
                        <p>分类</p>
                        <i></i>
                    </div>
                    <div class="nav-icon">
                        <svg-icon icon-class="files" />
                    </div>
                </div>

                <div
                    class="nav-bar_navs__nav _click"
                    :class="{ nav_active: $route.path == '/timeline' }"
                    @click="$router.push('/timeline')"
                >
                    <div class="nav-content">
                        <p>时间轴</p>
                        <i></i>
                    </div>
                    <div class="nav-icon">
                        <svg-icon icon-class="timelien" />
                    </div>
                </div>

                <div class="nav-bar_navs__nav" :class="{ nav_active: isOther }">
                    <div class="nav-content">
                        <p>其它</p>
                        <i></i>
                        <ul class="nav-content_child">
                            <li class="_click" @click="$router.push('/about')">关于</li>
                            <li class="_click" @click="$router.push('/contact')">联系</li>
                            <li class="_click" @click="$router.push('/barrage')">弹幕</li>
                            <li class="_click" @click="$router.push('/codepen')">CodePen</li>
                        </ul>
                    </div>
                    <div class="nav-icon">
                        <svg-icon icon-class="other" />
                    </div>
                </div>

                <div
                    class="nav-bar_navs__nav _click"
                    v-if="!this.token"
                    :class="{ nav_active: $route.path == '/login' }"
                    @click="$router.push('/login')"
                >
                    <div class="nav-content">
                        <p>用户</p>
                        <i></i>
                    </div>
                    <div class="nav-icon">
                        <svg-icon icon-class="user" />
                    </div>
                </div>
                <div class="nav-bar_navs__nav" v-else>
                    <div class="nav-content">
                        <p>用户</p>
                        <i></i>
                        <ul class="nav-content_child">
                            <li class="_click" @click="$router.push('/user/home')">主页</li>
                            <li class="_click" @click="$router.push('/user/favor')">收藏</li>
                            <li class="_click" @click="$router.push('/user/profile')">个人信息</li>
                        </ul>
                    </div>
                    <div class="nav-icon">
                        <svg-icon icon-class="user" />
                    </div>
                </div>

                <div class="nav-bar_navs__line" :style="styleObject"></div>
            </div>
        </div>
        <div class="nav-bar_footer">
            <el-popconfirm @confirm="handleLogout" title="您确认要退出吗？" v-if="this.token">
                <!-- @click="handleLogout" -->
                <i class="fa fa-sign-out" title="注销" slot="reference" />
            </el-popconfirm>
        </div>
    </menu>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Navbar',
    data() {
        return {
            title: 'king`blog',
            styleObject: {
                opacity: 0,
                transform: '',
            },
            others: ['About', 'Contact', 'Codepen'],
            defaultImg: 'https://img.wwery.com/Sugar/GbdeNndT.jpg',
        };
    },
    methods: {
        // 注销
        handleLogout() {
            this.$store.dispatch('user/resetToken');
            this.$notify.success({
                title: '成功',
                message: '您已退出登录！',
            });
            this.$router.replace('/login');
            this.$nextTick(() => {
                this.$store.commit('common/SET_NOT_CACHE_PAGES');
                if (this.websocket) {
                    this.websocket.close();
                }
            });
        },
        handleCommand(command) {
            this.$router.push(command);
        },
        handleBell() {
            this.$alert(
                '<strong><i>开发中，</i>如果你有好的样式或其它方面的建议可以<i class="el-icon-position">issue</i>给博主</strong>',
                '提示',
                {
                    dangerouslyUseHTMLString: true, // 支持 html 片段
                }
            );
        },
    },
    computed: {
        ...mapGetters(['token', 'users', 'websocket', 'dots']),
        isOther() {
            return this.others.some(item => item == this.$route.name);
        },
        isDot() {
            return Object.values(this.dots).some(el => el === true);
        },
    },
    watch: {
        $route(to, from) {
            if (to.path == '/home') {
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateY(0)';
            }
            if (to.path == '/files') {
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateY(100%)';
            }
            if (to.path == '/timeline') {
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateY(200%)';
            }
            if (this.isOther) {
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateY(300%)';
            }
            if (to.path == '/login') {
                this.styleObject.opacity = 1;
                this.styleObject.transform = 'translateY(400%)';
            }
        },
        users: {
            immediate: true, // 立即处理 进入页面就触发
            handler(newVal, oldVal) {
                if (!newVal.token && this.token) {
                    // this.$store.dispatch("user/getUserInfo", this.token).then(response => {
                    //   response && this.$store.dispatch("userInfo/getUserSex", this.token);
                    // });
                    this.$store.dispatch('user/getUserInfo', this.token);
                }
            },
        },
    },
};
</script>

<style scoped lang="scss">
::v-deep .el-avatar {
    width: 100%;
    height: 100%;
}

::v-deep .el-dropdown-menu--medium .el-dropdown-menu__item {
    padding: 5px 17px;
}
</style>

<style scoped lang="scss">
.nav-bar {
    position: relative;
    width: 100%;
    height: 100%;
    color: var(--deep-color);
    display: flex;
    flex-direction: column;
    user-select: none;
    // cursor: pointer;
    z-index: 33;
}

/* header logo */
.nav-bar .nav-bar_header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 140px;
}

.nav-bar .nav-bar_header ._logo {
    display: flex;
    justify-content: center;
    width: 80%;
    padding: 16px;
    background: #fff;
    box-shadow: 0 4px 10px #ddeeffc4;
    border-radius: 18px;
    box-sizing: border-box;
    user-select: none;
}

.nav-bar .nav-bar_header ._logo img {
    width: 100%;
}

/* user */
.nav-bar .nav-bar__user {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.nav-bar .nav-bar__user .nav-bar__user-login {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--light-color);
    border-radius: 50%;
    overflow: hidden;
}

.nav-bar .nav-bar__user .nav-bar__user-login span {
    font-size: 18px;
    font-weight: 600;
}

.nav-bar .nav-bar__user .nav-bar__user-logged {
    // width: 70px;
    // height: 70px;
    width: fit-content;
    height: fit-content;

    .nav-bar__user-logged__tools {
        // position: absolute;
        width: 100%;
        // height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        // bottom: -60px;

        & > div,
        & > i {
            cursor: pointer;
        }
    }

    p {
        // position: absolute;
        width: 100%;
        color: var(--deep-color);
        font-weight: 600;
        // margin-top: 6px;
        margin: 6px 0;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }

    img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        // &:hover {
        //     transform: scale(1.1);
        // }
    }
}
._shake-horizontal:hover {
    -webkit-animation: shake-horizontal 1s;
    animation: shake-horizontal 1s;
}

/* navs */
.nav-bar .nav-bar_navs {
    /* 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容 */
    flex: 1;
    display: flex;
    flex-direction: column;
    /* 居中排列 */
    justify-content: center;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content {
    position: relative;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    overflow: hidden;
}

// .nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav:active {
//   transform: scale(0.95);
// }

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav:hover {
    /*  unset 关键字我们可以理解为不设置，其实，它是关键字initial和inherit的组合。
      当我们给一个css属性设置了unset的话：
      1,如果该属性默认继承属性，该值等同于inherit
      2,如果该属性是非继承属性，该值等同于initial */
    overflow: unset;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav:hover .nav-icon,
.nav-bar .nav_active .nav-icon {
    opacity: 0;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav:hover .nav-content i,
.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav:hover .nav-content p {
    opacity: 1;
    transform: translateY(0);
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav:hover .nav-content ul {
    transform: translateX(0);
    opacity: 1;
    z-index: 3;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-content p {
    font-weight: 600;
    font-size: 18px;
    transform: translateY(-100%);
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-content i {
    margin-top: 8px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--deep-color);
    transform: translateY(100%);
}

.nav-bar_navs__nav .nav-content i,
.nav-bar_navs__nav .nav-content p {
    transition: all 0.5s;
    opacity: 0;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-content ul {
    position: absolute;
    left: 76%;
    background: #fff;
    width: 100px;
    font-size: 14px;
    box-shadow: 0 0 6px rgb(0 0 0 / 10%);
    padding: 10px 0;
    border-radius: 4px;
    transform: translateX(50%);
    opacity: 0;
    transition: all 0.25s;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-content ul li {
    color: var(--marked-color);
    padding: 9px 16px;
    transition: all 0.25s;
    line-height: 22px;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-content ul li:hover {
    text-indent: -2px;
    border-color: var(--light-color);
    color: var(--deep-color);
    background: rgba(0, 0, 0, 0.04);
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__nav .nav-icon {
    font-size: 34px;
    color: var(--light-color);
}

// line
.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__line {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 80px;
    transition: all 0.25s;
    overflow: hidden;
}

.nav-bar .nav-bar_navs .tab-bar__navs-content .nav-bar_navs__line::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
    // background-color: var(--orange-color);
    background-color: #ddd;
    border-radius: 6px;
    /* 缩放元素（垂直方向） */
    transform: scaleY(0.8);
}

/* footer */
.nav-bar .nav-bar_footer {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        font-size: 30px;
        color: var(--light-color);
        cursor: pointer;
    }
}

// /* nav-active */
.nav-bar .nav_active .nav-content p,
.nav-bar .nav_active .nav-content i {
    opacity: 1;
    transform: translateY(0) !important;
}

// .nav-bar .nav_active .nav-content p {
//   color: var(--orange-color);
// }
// .nav-bar .nav_active .nav-content i {
//   background: var(--orange-color) !important;
// }
</style>
