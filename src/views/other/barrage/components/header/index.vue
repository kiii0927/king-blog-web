<template>
    <div class="barrage-container__header">
        <transition
            name="animate__animated animate__bounce"
            enter-class="animate__fadeIn"
            appear
            mode="in-out"
        >
            <img
                :style="styleObject"
                class="bgimg helloboStyle"
                src="https://img.wwery.com/wanghaibo/Lwb1L2yy.jpg"
            />
        </transition>

        <div class="memorial" ref="memorial">
            <!-- <div class="bullet-item sender">到此一游</div> -->
            <div
                class="bullet-item"
                :class="{ sender: uId && uId === item.formId }"
                v-for="item in showingBullets"
                :key="item.barrageNo"
                :id="`bullet_${item.barrageNo}`"
                :data-id="item.barrageNo"
                :data-line="item.line"
                :style="{ '--progress': item.time, top: item.top }"
                v-html="item.message"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'BarrageHeader',
    data() {
        return {
            bulletsTime: null,
            memorialsTime: null,
            styleObject: {
                backgroundColor: 'rgb(51, 51, 51)',
                display: 'inline-block',
                opacity: 0.96,
            },
            // 将要显示(wait)的弹幕队列
            waitBullets: [],
            // 显示的弹幕列队
            showingBullets: [],
            lines: 30,
            currentLine: 1,
            listQuery: {
                page: 1,
                limit: 30,
            },
        };
    },
    watch: {
        records: {
            // deep: true,
            handler(val) {
                let _v = [...val];
                _v.forEach(el => {
                    el['time'] = Math.floor(Math.random() * 10 + 1) + 's';
                    el['time'] > 2 && (el['time'] += 2);
                });
                this.$nextTick(() => {
                    this.memorials.total <= 30 && (this.lines = 10);
                    this.waitBullets.push(..._v);
                    this.showNextBullet();
                    this.bulletsTime = setInterval(this.showNextBullet, 700);
                    this.memorials.extras.hasNext &&
                        setTimeout(() => {
                            this.getList();
                        }, 800);
                });
            },
        },
        waitBulletList: {
            handler(val) {
                this.$nextTick(() => {
                    // val.length && val.length > 0
                    if (val.length && val.length > 0) {
                        val.forEach(el => {
                            el['time'] = Math.floor(Math.random() * 7 + 2) + 's';
                        });
                        this.waitBullets.push(...val);
                        this.bulletsTime = setInterval(this.showNextBullet, 700);
                        this.$nextTick(() => {
                            this.$store.commit('barrage/SET_WAIT_BULLET_LIST');
                        });
                    }
                });
            },
        },
    },
    computed: {
        ...mapGetters('barrage', ['memorials', 'waitBulletList']),
        ...mapGetters(['uId']),
        records() {
            return this.memorials?.records;
        },
    },
    mounted() {
        setTimeout(() => {
            this.getList();
        }, 0);
    },
    methods: {
        getList() {
            this.$store.dispatch('barrage/getMemorial', this.listQuery).then(response => {
                this.$nextTick(() => {
                    this.listQuery.page++;
                });
            });
        },
        showNextBullet() {
            if (!this.waitBullets.length) {
                this.bulletsTime && clearInterval(this.bulletsTime), (this.bulletsTime = null);
                return;
            }
            // 先确定弹道，跟上一个弹道错开即可
            this.currentLine = (this.currentLine % this.lines) + 1;
            // 从等待集合里取出第一个
            const currentBullet = this.waitBullets.shift();
            // 设置弹幕的弹道
            currentBullet.line = this.currentLine;
            // currentBullet.top = parseInt(425 / this.lines) * currentBullet.line;
            currentBullet.top = ((425 / this.lines) >>> 0) * currentBullet.line;

            if (currentBullet.line === 1) {
                currentBullet.top += Math.floor(Math.random() * 16 + 16);
            } else if (currentBullet.line === this.lines) {
                currentBullet.top -= Math.floor(Math.random() * 10 + 20);
            }
            currentBullet.top += 'px';

            // 弹幕放进显示集合里，弹幕开始滚动
            this.showingBullets.push(currentBullet);
            this.handleTransitionend(currentBullet);
        },
        handleTransitionend(val) {
            this.$nextTick(() => {
                let el = document.getElementById(`bullet_${val.id}`);
                // 监听元素动画执行结束
                el?.addEventListener('animationend', event => {
                    // 删除元素
                    let id = event.target?.getAttribute('data-id');
                    this.showingBullets.some((el, i) => {
                        if (el.id < id) {
                            this.showingBullets.length > this.lines && this.showingBullets.shift();
                        }
                    });
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.barrage-container__header {
    position: relative;
    width: 100%;
    height: 52vh;
    color: #fff;
    border-radius: 2rem;
    margin-bottom: 0.4em;
    overflow: hidden;
    .bgimg {
        display: none;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 1s, transform 0.25s, filter 0.25s;

        &.helloboStyle {
            -webkit-animation-name: slideshow--alt;
            animation-name: slideshow--alt;
            -webkit-animation-duration: 10s;
            animation-duration: 10s;
        }
    }

    .memorial {
        width: 100%;
        height: inherit;
        overflow: hidden;
        position: relative;
        z-index: 2;

        .bullet-item {
            position: absolute;
            max-height: 20px;
            max-width: 251px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            will-change: transform;
            -webkit-animation: right-to-left var(--progress) linear both;
            animation: right-to-left var(--progress) linear both;

            // &:hover {
            //     animation-play-state: paused;
            // }

            &.sender {
                // color: #ffd69e;
                color: #0fddff;
                font-weight: 500;
            }
        }
        /* .bullet-item[data-line='1'] {
            // top: 20px;
            top: 44px;
        }
        .bullet-item[data-line='2'] {
            // top: 75px;
            top: 88px;
        }
        .bullet-item[data-line='3'] {
            // top: 150px;
            top: 132px;
        }
        .bullet-item[data-line='4'] {
            // top: 225px;
            top: 176px;
        }
        .bullet-item[data-line='5'] {
            // top: 300px;
            top: 220px;
        }
        .bullet-item[data-line='6'] {
            top: 264px;
        }
        .bullet-item[data-line='7'] {
            top: 308px;
        }
        .bullet-item[data-line='8'] {
            top: 352px;
        }
        .bullet-item[data-line='9'] {
            top: 396px;
        }
        .bullet-item[data-line='10'] {
            top: 440px;
        } */
    }
}

@keyframes slideshow--alt {
    100% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
}
@keyframes right-to-left {
    0% {
        transform: translateX(100vw);
    }
    100% {
        transform: translateX(-30vw);
    }
}
</style>
