<template>
    <div id="app">
        <!-- loading -->
        <!-- <Loading v-if="loading" /> -->
        <!-- greeting -->
        <Greeting v-if="isGreeting" />
        <!-- 项目骨架 -->
        <!-- v-show="!loading" -->
        <el-container>
            <el-aside width="200px" style="height: 100vh" :style="styleObject">
                <navbar />
            </el-aside>
            <el-main>
                <app-main ref="box" />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import AppMain from '@/components/AppMain.vue';
import Navbar from '@/components/Navbar.vue';
import { mapGetters } from 'vuex';
import { setCookie, getCookie } from '@/utils/cookie';
import { initWebSocket } from '@/utils/webSocket';

export default {
    name: 'App',
    data() {
        return {
            styleObject: {
                zIndex: 33,
            },
            loading: true,
            isGreeting: false,
        };
    },
    components: {
        AppMain,
        Navbar,
        Loading: () => import('@/components/MyLoading.vue'),
        Greeting: () => import('@/components/Greeting.vue'),
    },
    created() {
        this.isLogin();
    },
    beforeMount() {
        this.handleLoad();
    },
    methods: {
        isLogin() {
            this.$store
                .dispatch('user/isLogin')
                .then(res => {
                    // has login
                    if (res) {
                        // console.log(res);
                        this.$notify.info({
                            title: '提示',
                            message: `欢迎回来 ${res.user?.username}`,
                            duration: 4000,
                        });

                        this.$nextTick(() => {
                            // 建立ws连接
                            const websock = initWebSocket(this.uId);
                            this.$store.commit('common/SET_WEBSOCKET', websock);
                            const dots = localStorage.getItem('dots');
                            dots && this.$store.commit('message/SET_DOTS', JSON.parse(dots));
                        });
                    } else {
                        this.handleHasIdentify();
                    }
                })
                .catch(error => {
                    // no login
                    console.warn(error);
                });
        },
        handleHasIdentify() {
            let name = 'identify';
            let identify = getCookie(name);
            console.log(identify);
            if (!identify) {
                this.$API.user?.getIdentify().then(res => {
                    let value = res.data;
                    console.log(value);
                    setCookie(name, value, 30);
                });
            }
            // !cookie && setCookie(name, value, 30);
        },
        handleLoad() {
            setTimeout(() => {
                this.loading = false;
            }, 3200);
        },
    },
    computed: {
        ...mapGetters(['uId']),
        ...mapGetters('common', ['isZIndex']),
    },
    watch: {
        $route(to, from) {
            if (to.path === '/authlogin') {
                this.styleObject.zIndex = 0;
            } else {
                this.styleObject.zIndex = 33;
            }
        },
        isZIndex(val) {
            if (!val) {
                this.styleObject.zIndex = 0;
            } else {
                this.styleObject.zIndex = 33;
            }
        },
        loading(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.isGreeting = true;
                    setTimeout(() => {
                        this.isGreeting = false;
                    }, 3500);
                });
            }
        },
        /* uId(val) {
            if (val) {
                this.$nextTick(() => {
                    console.log(this.uId);
                    // 建立ws连接
                    const websock = initWebSocket(val);
                    this.$store.commit('common/SET_WEBSOCKET', websock);
                });
            }
        }, */
    },
    beforeDestroy() {
        if (this.websock && (this.websock.readyState == 1 || this.websock.readyState == 2)) {
            this.websock.close(); // 销毁前断开websocket连接
        }
    },

    // 监听组件报错
    errorCaptured(error, vm, info) {
        console.error('errorCaptured:', error, vm, info);
    },
};
</script>

<style scoped lang="scss">
::v-deep .el-aside {
    overflow: initial;
    position: fixed;
}

::v-deep .el-main {
    position: relative;
    left: 200px;
    width: calc(100vw - 200px);
    max-width: calc(100vw - 200px);
    background-color: #e9eef3;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    overflow: inherit;
    padding: 0;
}
</style>
