<template>
    <!-- 第三方授权登录中转页 -->
    <div class="auth-login">
        <h2>登录中<i style="margin-left: 4px;" class="el-icon-loading"></i></h2>
    </div>
</template>

<script>
export default {
    name: 'WebAppAuthLoginTransfer',
    data() {
        return {
            res: this.$route.query.result,
        };
    },
    // created() {
    //     //获取到token 并封装到store中用于全程携带
    //     let tmp = this.getToken();
    //     console.log(tmp.token);
    //     let token = tmp.token;
    //     if (token != undefined && token != {}) {
    //         //vuex
    //         // this.$store.commit('SET_TOKEN', token)

    //         // this.localStorage.setItem('token',token)
    //         // let v = localStorage.getItem('token');

    //         //跳转到首页
    //         // this.$router.replace({ path: '/home' });
    //         this.$router.replace('/home');
    //     }
    // },
    mounted() {
        console.log("第三方授权认证通过");
        this.saveInfo();
        setTimeout(() => {
            this.$notify.success({
                title: '成功',
                message: '登录成功！'
            });
            this.$router.replace('/home');
        }, 1500);
    },

    methods: {
        getToken() {
            let url = window.document.location.href.toString();//获得当前url地址并转换成字符串
            let u = url.split("?");//以 `?` 来分割字符串，将？前后的值存到一个数组中
            if (typeof (u[1]) == "string") {//获得？后面具体的请求参数值
                u = u[1].split("&");
                var get = {};
                for (var i in u) {
                    var j = u[i].split("=");
                    get[j[0]] = j[1];
                }
                return get;
            }
        },
        saveInfo() {
            let info = JSON.parse(this.res);
            this.$store.commit("user/SET_USER_INFO", info);
        }
    },
};
</script>

<style lang="scss" scoped>
.auth-login {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    padding: 15px;

    h2 {
        font-size: 24px;
        font-weight: 400;
    }
}

::v-deep .el-aside,
[data-v-7ba5bd90] .el-aside {
    z-index: 0;
}
</style>