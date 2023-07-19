<template>
    <div class="_clock" title="点击复制到粘贴板" @click="onCopy">
        <div class="_clock__bgimg">
            <img :src="image" alt="图片未找到" />
        </div>
        <div class="_clock__text">
            <div class="_clock-text-clockanm1">
                <p>{{ DateTime.hours }}</p>
                <span>hours</span>
            </div>
            <b>:</b>
            <div class="_clock-text-clockanm2">
                <p>{{ DateTime.minutes }}</p>
                <span>minutes</span>
            </div>
            <b>:</b>
            <div class="_clock-text-clockanm3">
                <p>{{ DateTime.seconds }}</p>
                <span>seconds</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Clock",
    data() {
        return {
            // image: 'https://api.adicw.cn/uploads/StudyImg/631c9a364765b.png',
            DateTime: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        };
    },
    mounted() {
        this.dateTime();
    },
    props: {
        image: {
            type: String,
            require: true,
            default: "",
        }
    },
    methods: {
        onCopy() {
            const date = new Date();
            this.$copyText(date).then(
                e => {
                    this.$notify.success({
                        title: '复制',
                        message: '复制成功'
                    });
                },
                e => {
                    this.$notify.error({
                        title: '复制',
                        message: '复制失败',
                    });
                    console.log(e);
                }
            );
        },
        dateTime() {
            this.timer2 = setInterval(() => {
                let date = new Date();
                let hours = date.getHours() + '';
                if (hours < 9) hours = '0' + hours;
                let minutes = date.getMinutes() + '';
                if (minutes < 9) minutes = '0' + minutes;
                let seconds = date.getSeconds() + '';
                if (seconds < 9) seconds = '0' + seconds;
                const obj = {
                    hours,
                    minutes,
                    seconds,
                };
                Object.assign(this.DateTime, obj);
            }, 1000);
        },
    }
}
</script>

<style scoped lang="scss">
._clock {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: default;
    position: relative;
    user-select: none;

    ._clock__bgimg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            transition: 1s;
        }
    }


    ._clock__text {
        color: white;
        width: 100%;
        height: 100%;
        z-index: 3;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        b {
            font-size: 32px;
            height: 90px;
            line-height: 1.3em;
            text-shadow: 1px 0px 5px #242323;
        }

        ._clock-text-clockanm1,
        ._clock-text-clockanm2,
        ._clock-text-clockanm3 {
            height: 90px;
            display: flex;
            // /* flex-direction 属性规定灵活项目的方向。 */
            // /* 灵活的项目将垂直显示，正如一个列一样。 */
            flex-direction: column;
            // /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */
            justify-content: space-between;
            align-items: center;
            opacity: 0;

            p {
                font-size: 40px;
                text-shadow: 1px 0px 5px #242323;
            }
        }

        ._clock-text-clockanm1 {
            // /* https://www.w3school.com.cn/cssref/pr_animation.asp */
            // /* https://www.cnblogs.com/fightjianxian/p/9391010.html */
            -webkit-animation: clockanm 1s ease forwards;
            animation: clockanm 1s ease forwards;
        }

        ._clock-text-clockanm2 {
            -webkit-animation: clockanm 1s ease 0.4s forwards;
            animation: clockanm 1s ease 0.4s forwards;
        }

        ._clock-text-clockanm3 {
            -webkit-animation: clockanm 1s ease 0.8s forwards;
            animation: clockanm 1s ease 0.8s forwards;
        }

    }


    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        opacity: 0;
        background: rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    &:hover {
        &:before {
            opacity: 1;
        }

        ._clock__bgimg {
            img {
                object-position: right bottom;
            }
        }
    }
}
</style>