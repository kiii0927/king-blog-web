<template>
    <div class="user-notify">
        <!-- message content -->
        <div class="user-notify__content">
            <transition
                appear
                name="animate__animated animate__bounce"
                mode="in-out"
                enter-active-class="animate__fadeIn"
            >
                <!-- v-if="$route.meta.keepAlive" -->
                <!-- <keep-alive :max="10" exclude="NotifyReply"> -->
                <router-view ref="routerView" />
                <!-- </keep-alive> -->
                <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
            </transition>
        </div>

        <!-- aside -->
        <aside class="user-notify__aside">
            <div class="user-notify__aside-title">
                <div class="icon" />
                消息中心
            </div>
            <div class="user-notify__aside-link">
                <router-link to="/notify/reply" active-class="router-link-active">
                    <el-badge :is-dot="dots.reply">回复我的</el-badge>
                </router-link>
                <router-link to="/notify/love" active-class="router-link-active">
                    <el-badge :is-dot="dots.love">收到的赞</el-badge>
                </router-link>
                <router-link to="/notify/attention" active-class="router-link-active">
                    <el-badge :is-dot="dots.attention">新增粉丝</el-badge>
                </router-link>
                <router-link to="/notify/system" active-class="router-link-active">
                    <el-badge :is-dot="dots.system">系统通知</el-badge>
                </router-link>
                <router-link to="/notify/setting" active-class="router-link-active">
                    消息设置
                </router-link>
            </div>
        </aside>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { once } from 'lodash';
export default {
    name: 'Notify',
    computed: {
        ...mapGetters(['dots']),
        ...mapGetters('common', ['isCacheMessagePageSet']),
    },
    mounted() {
        // console.log('notify...');
        this.$nextTick(() => {
            if (this.isCacheMessagePageSet) {
                this.$store.commit(
                    'common/SET_CACHE_MESSAGE_PAGE',
                    this.$refs.routerView?.$options?.name
                );
            }
            // console.log(this.$refs.routerView?.$options?.name);
            // 重新定义那些message组件需要被缓存
            // this.isCacheMessagePageSet && this.changeCacheMessagePage();
            // console.log(this.$refs.routerView.$vnode.parent.componentInstance);
        });
    },
    // methods: {
    //     changeCacheMessagePage: once(function () {
    //         console.log('changeCacheMessagePage...');
    //         // 重新定义那些message组件需要被缓存
    //         this.$store.commit('common/SET_CACHE_MESSAGE_PAGE_ALL');
    //     }),
    // },
};
</script>

<style lang="scss" scoped>
.user-notify {
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
    background: #f4f5f7;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    overflow: hidden;

    .user-notify__content {
        flex: 1;
        padding: 20px 80px;
    }

    .user-notify__aside {
        // width: 300px;
        // position: sticky;
        // top: 0;
        width: calc(100% - 76.2%);
        height: 100%;
        background: #fff;
        box-shadow: -3px 0 20px #00000005;
        border-bottom-left-radius: 26px;
        border-top-left-radius: 26px;
        overflow: hidden;
        user-select: none;

        .user-notify__aside-title {
            width: calc(100% - 40px);
            height: 62px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            color: #333;
            font-weight: 700;

            .icon {
                width: 14px;
                height: 16px;
                margin-right: 10px;
                background: url(//s1.hdslb.com/bfs/static/blive/blfe-message-web/static/img/plane.c9984cf0.svg)
                    center/contain no-repeat;
            }
        }

        .user-notify__aside-link {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            // background: #fff;
            // padding: 8px 0;
            margin-top: 2.5rem;
            // border-radius: 2px;

            a {
                height: 48px;
                // line-height: 48px;
                line-height: 1.5em;
                font-size: 14px;
                color: #555666;
                box-sizing: border-box;
            }

            .router-link-active {
                color: #2faee3;
                // background: #fafafa;
            }
        }
    }
}
</style>
