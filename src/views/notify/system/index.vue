<template>
    <div class="notify-system">
        <div class="notify-system__top">
            <p>系统通知</p>
        </div>

        <div
            class="notify-system__bottom"
            ref="system__bottom"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            infinite-scroll-immediate="false"
        >
            <transition-group
                class="container"
                tag="div"
                appear
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeIn"
                leave-active-class="animate__fadeOut"
                v-on:before-enter="beforeEnter"
            >
                <div
                    class="system-item card"
                    v-for="(item, index) in list"
                    :key="item.id || item.key"
                    :animate-delay="`${(index + 1) / 100}s`"
                    :animate-duration="`${(index + 2) / 10}s`"
                >
                    <div class="top">
                        <span class="title">{{ item.title }}</span>
                        <span class="time">{{ item.create_time }}</span>
                    </div>
                    <div class="bottom">
                        <span class="text">
                            {{ item.content }}
                        </span>
                    </div>
                </div>
            </transition-group>

            <p v-if="loading">加载中...</p>
            <p v-if="noMore && list.length >= 8">没有更多了</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'NotifySystem',
    data() {
        return {
            // forbidden: false,
            loading: false,
            paramObj: {
                // lastId: new Date().getTime(),
                lastId: 0,
                offset: 0,
                topic: 'system',
            },
            list: [],
        };
    },

    beforeMount() {
        // console.log('querySystem...');
        this.getSystemMessage();
    },

    methods: {
        getSystemMessage() {
            this.$store
                .dispatch('message/getMessage', {
                    uId: this.uId,
                    type: 'system',
                    paramObj: this.paramObj,
                })
                .then(response => {
                    if (this.loading) {
                        this.loading = false;
                    }
                    const { data } = response;
                    if (data) {
                        // 合并数组
                        this.list = [...this.list, ...data.list] || data.list.concat(this.list);
                        // this.list.reverse(); // 反转
                        // this.paramObj.lastId = data.minTime;
                        if (!this.paramObj.lastId) {
                            this.paramObj.lastId = new Date().getTime();
                        }
                        this.paramObj.offset = data.offset;
                    }
                })
                .catch(error => {
                    console.log(error);
                    // this.forbidden = true;
                });
        },
        // before enter 实现 delay 效果
        beforeEnter(el) {
            let delay = el.getAttribute('animate-delay'),
                duration = el.getAttribute('animate-duration');
            // console.log('attr:' + delay, duration);
            let cssObj = {
                'animation-delay': delay,
                '-webkit-animation-delay': delay,
                'animation-duration': duration,
                '-webkit-animation-duration': duration,
                visibility: 'visible',
            };
            let getCssText = function (obj) {
                let text = [];
                for (let o in obj) {
                    text.push(o + ':' + obj[o]);
                }
                return text.join(';');
            };
            el.style.cssText = getCssText(cssObj);
        },

        // 滚动加载
        load() {
            this.loading = true;
            setTimeout(() => {
                this.getSystemMessage();
            }, 500);
        },
    },

    computed: {
        disabled() {
            return this.loading || this.noMore; //|| this.forbidden;
        },
        ...mapGetters(['uId']),
        ...mapGetters('message', ['scrollResult', 'noMore']),
    },
    watch: {
        list(val) {
            val.length >= 8
                ? this.$refs.system__bottom?.style.setProperty('--progress', '16px')
                : this.$refs.system__bottom?.style.setProperty('--progress', '8px');
        },
    },
};
</script>

<style lang="scss" scoped>
.notify-system {
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    .notify-system__top {
        height: 42px;
        background-color: #fff;
        -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        -ms-flex-negative: 0;
        flex-shrink: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 16px;
        font-size: 15px;
        color: #666;
        border-radius: 4px;
        z-index: 1;
    }

    .notify-system__bottom {
        --progress: 16px;
        margin-top: 10px;
        position: relative;
        width: calc(100% + var(--progress));
        height: calc(100vh - 66px);
        overflow-y: auto;
        box-sizing: border-box;

        & > p {
            color: #999;
            text-align: center;
            font-size: 14px;
        }

        .container {
            margin-right: 8px;
            .system-item {
                position: relative;
                line-height: 24px;
                font-size: 0.768rem;
                // margin-right: 8px;

                .bottom {
                    color: #666;
                    padding-left: 8px;

                    .text {
                        line-height: 19px;
                        word-break: break-word;
                    }
                }

                .top {
                    .title {
                        color: #333;
                        font-weight: 700;
                    }

                    .time {
                        color: #999;
                        margin: 0 10px;
                    }
                }
            }

            .card {
                padding: 24px 16px;
                background-color: #fff;
                -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
                box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
                margin-bottom: 10px;
                border-radius: 6px;
            }
        }
    }
}

// .animate__animated-move {
//     transition: transform 1s;
//     // transition: all var(--duration) ease-in;
// }

// .animate__animated-leave-active {
//     transition: all 1s ease-in;
//     position: absolute;
// }
</style>
