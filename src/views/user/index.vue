<template>
    <div class="user">
        <!-- bg  -->
        <div class="user-bg">
            <img :src="users.avatar" />
        </div>

        <!-- container -->
        <div class="user-container">
            <div class="user-container-margin">
                <!-- info -->
                <div class="user-container-info">
                    <div class="user-container-info__avatar">
                        <!-- <img :src="users.avatar" /> -->
                        <el-avatar :src="users.avatar" @error="errorHandler">
                            <img :src="defaultImg" />
                        </el-avatar>
                    </div>

                    <div class="user-container-info__main">
                        <div class="_main_title">
                            <b>{{ users.username }}</b>
                            <span @click="$router.push('/user/profile')">编辑个人资料</span>
                            <i class="el-icon-setting" title="系统设置"></i>
                        </div>
                        <div class="_main_item">
                            <b>{{ users.permission !== 'admin' ? '用户' : '管理员' }}</b>
                        </div>
                        <div class="_main_item _item-bigmargin">
                            <i class="fa fa-mars"></i>
                            <span>{{ gender }}（仅自己可见）</span>
                        </div>
                        <div class="_main_item _item-bigmargin">
                            <!-- <router-link to="/user/profile" active-class="_active">查看个人资料</router-link> -->
                            <a @click="$router.push('/user/profile')">查看个人资料</a>
                        </div>
                    </div>
                </div>
                <!-- nav -->
                <div class="user-container-nav">
                    <div class="_navs">
                        <router-link to="/user/home" active-class="_active">主页</router-link>
                        <router-link to="/user/favor" active-class="_active">收藏</router-link>
                        <router-link to="/user/profile" active-class="_active">
                            个人信息
                        </router-link>
                    </div>
                    <div class="_main">
                        <!-- include="UserProfile" -->
                        <!-- <keep-alive :max="10"> -->
                        <!-- :key="key" -->
                        <router-view />
                        <!-- </keep-alive> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'User',
    data() {
        return {
            // active: 0,
            defaultImg: 'https://img.wwery.com/Sugar/GbdeNndT.jpg',
            isLoad: false,
        };
    },
    watch: {
        token: {
            // immediate: true,
            handler(newVal, odldVal) {
                if (newVal) {
                    this.$nextTick(() => (this.isLoad = true));
                }
            },
        },
    },
    computed: {
        ...mapGetters(['users', 'sex', 'token']),
        key() {
            return this.$route.path;
        },
        gender() {
            let gender = '';
            if (this.sex === 0) {
                gender = '女';
            } else if (this.sex === 1) {
                gender = '男';
            } else {
                gender = '保密';
            }
            return gender;
        },
    },
    methods: {
        errorHandler(e) {
            this.$message.info('头像加载失败，将使用默认头像！');
            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
.user {
    position: relative;
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    background: #f4f5f7;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;

    .user-bg {
        position: sticky;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 50vh;
        filter: blur(44px);
        overflow: hidden;

        img {
            width: 120%;
            height: 120%;
            transform: translate(-10%, -10%);
        }
    }

    .user-container {
        position: relative;
        z-index: 2;
        top: 0;
        background: #fff;
        width: 100%;
        min-height: 800px;
        padding-bottom: 100px;

        .user-container-margin {
            width: 1200px;
            margin: 0 auto;
            height: fit-content;

            .user-container-info {
                width: 100%;
                display: grid;
                grid-template-columns: 124px 1fr;

                .user-container-info__avatar {
                    width: 100px;
                    height: 100px;
                    box-sizing: border-box;
                    border: 2px solid #fff;
                    margin-top: -40px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.25s;

                    img,
                    ::v-deep .el-avatar {
                        width: 100%;
                        height: 100%;
                    }

                    &:hover {
                        transform: scale(1.1);
                    }
                }

                .user-container-info__main {
                    width: 100%;
                    overflow: hidden;

                    ._main_title {
                        margin-top: 20px;
                        width: 100%;
                        display: grid;
                        grid-template-columns: 1fr 122px 40px;

                        b {
                            font-size: 20px;
                            align-self: center;
                        }

                        span {
                            background-color: #f5f5f5;
                            padding: 10px 25px;
                            line-height: 1;
                            border-radius: 16px;
                            font-size: 12px;
                            font-weight: 700;
                            transition: background-color 0.2s;
                            color: #666;
                            cursor: pointer;
                            text-align: center;
                        }

                        i {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 24px;
                            justify-self: flex-end;
                            align-self: center;
                            color: #adadad;
                            width: 32px;
                            height: 32px;
                            cursor: pointer;
                        }
                    }

                    ._main_item {
                        margin: 8px 0;

                        i {
                            margin-right: 5px;
                        }

                        b,
                        i,
                        a,
                        span {
                            font-size: 14px;
                            color: #5c5c5c;
                        }

                        a {
                            cursor: pointer;
                            font-size: 12px;
                        }
                    }

                    ._item-bigmargin {
                        margin: 16px 0;
                    }
                }
            }

            .user-container-nav {
                width: 100%;
                margin-top: 10px;

                ._navs {
                    width: 100%;

                    // li,
                    a {
                        display: inline-flex;
                        align-items: center;
                        padding: 0 24px;
                        height: 42px;
                        font-weight: 700;
                        font-size: 16px;
                        box-sizing: border-box;
                        color: #00000052;
                        cursor: pointer;

                        &._active {
                            color: #000000e0;
                            border-top: 4px solid var(--blue-color);
                        }
                    }
                }

                ._main {
                    // position: relative;
                    display: flex;
                    width: 100%;
                    padding-top: 30px;
                }
            }
        }
    }
}
</style>
