<template>
    <div class="user-favor">
        <div class="user-favor-title">
            <h3>
                文章·学习
                <sup>{{ favorList.length }}</sup>
            </h3>
            <span>
                <i class="el-icon-connection"></i>
                高级搜索
            </span>
        </div>
        <div class="user-favor-items">
            <div class="study-favor-card" v-for="(item, index) in favorList" :key="index">
                <div class="_cover" @click="handleSkip(item.id)">
                    <img :src="item.firstPicture" />
                    <i class="fa fa-heart"></i>
                </div>
                <div class="_info">{{ item.title }}</div>
                <ul class="_tips">
                    <li>{{ item.name }}</li>
                </ul>
                <p class="_time">
                    收藏于：
                    <span>{{ item.createTime | formatTimePro }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'UserFavor',
    beforeMount() {
        !this.$parent.isLoad && this.handleInit();
    },

    activated() {
        this.$parent.isLoad && this.handleInit();
    },

    methods: {
        // 获取用户的收藏
        handleInit() {
            this.$store.dispatch('userFavor/selectList', this.$parent.token);
        },
        // 文章跳转
        handleSkip(v1) {
            this.$router.push({
                path: `/detail/${v1}`,
                // query: { id: v2 }
            });
        },
    },
    watch: {
        // token: {
        //     immediate: true,
        //     handler(newVal, odldVal) {
        //         if (newVal) {
        //             this.handleInit();
        //         }
        //     },
        // },
        status(newVal, odldVal) {
            // console.log(newVal);
            if (newVal) {
                this.handleInit();
            }
        },
    },
    computed: {
        ...mapGetters(['token']),
        ...mapGetters('userFavor', ['favorList', 'status']),
    },
};
</script>

<style scoped lang="scss">
.user-favor {
    width: 100%;

    .user-favor-title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        user-select: none;

        h3 {
            font-size: 20px;
            color: #000000a3;

            sup {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                background: rgba(0, 0, 0, 0.32);
                border-radius: 10px;
                font-size: 12px;
                color: #fff;
                vertical-align: text-top;
            }
        }

        span {
            cursor: pointer;
            font-weight: 500;
        }
    }

    .user-favor-items {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(6, 1fr);
        gap: 14px;
        margin-top: 16px;

        .study-favor-card {
            width: 100%;
            cursor: pointer;

            ._tips {
                cursor: default;

                li {
                    display: inline-block;
                    font-size: 12px;
                    margin-left: 10px;

                    &:first-child {
                        margin-left: 0;
                    }
                }
            }

            ._time {
                font-size: 13px;
                color: darkgrey;
                margin-top: 6px;
                cursor: default;
            }

            ._info {
                min-height: 40px;
                margin-top: 4px;
                color: #000000e0;
                font-size: 14px;
                font-weight: 700;
                cursor: default;
            }

            ._cover {
                position: relative;
                width: 184px;
                // 纵向横比  13比18  see: https: //zxuqian.cn/videos/css/css-aspect-ratio-tutorial/
                aspect-ratio: 13/18;
                border-radius: 8px;
                overflow: hidden;
                background: #def;

                img {
                    width: 100%;
                    height: 100%;
                }

                i {
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                    font-size: 22px;
                    color: #ff4060;
                }

                &:hover {
                    &:before {
                        background-color: #fff3;
                    }
                }

                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
