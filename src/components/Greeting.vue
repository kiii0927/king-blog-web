<template>
    <div class="greetingbox">
        <div class="greeting" :class="{ 'show': flag }">
            {{ greetings }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebAppGreeting',
    data() {
        return {
            greetings: '',
            flag: true
        };
    },
    mounted() {
        this.$nextTick(() => this.handleGreeting());
    },

    methods: {
        handleGreeting() {
            const nowTime = new Date().getHours();
            if (0 <= nowTime && nowTime <= 5) {
                this.greetings = '晚安😴';
            } else if (5 < nowTime && nowTime <= 10) {
                this.greetings = '早上好鸭👋, 祝你一天好心情！';
            } else if (10 < nowTime && nowTime <= 11) {
                this.greetings = '上午好👋, 状态很好，鼓励一下～';
            } else if (11 < nowTime && nowTime < 12) {
                this.greetings = '11点多啦, 在坚持一下就吃饭啦～';
            } else if (12 < nowTime && nowTime < 13) {
                this.greetings = '忙碌了一上午,该吃午饭了哦！';
            } else if (13 <= nowTime && nowTime < 14) {
                this.greetings = '午安👋, 宝贝';
            } else if (14 <= nowTime && nowTime <= 18) {
                this.greetings = '下午好👋, 继续加油喔。';
            } else if (18 < nowTime && nowTime <= 19) {
                this.greetings = '充实的一天辛苦啦！';
            } else if (19 < nowTime && nowTime <= 20) {
                this.greetings = '19点喽, 奖励一顿丰盛的大餐吧。';
            } else if (19 < nowTime && nowTime <= 24) {
                this.greetings = '晚上好👋, 在属于自己的时间好好放松😌~';
            } else {
                this.greetings = '晚上好👋';
            }
            setTimeout(() => {
                this.flag = false;
            }, 3000);
        }
    },
};
</script>

<style lang="scss" scoped>
.greetingbox {
    position: fixed;
    top: 10px;
    left: 10%;
    width: 400px;
    text-align: center;
    z-index: 999;
    pointer-events: none;

    .greeting {
        display: inline-block;
        position: relative;
        opacity: 0;
        top: -110px;
        padding: 8px 30px;
        border-radius: 50px;
        background-color: #fff;
        color: #000;
        // font-size: small;
        transition: .5s;
        box-shadow: rgb(0 0 0 / 5%) 0 10px 20px;
        font-size: 14px;

        &.show {
            opacity: 1;
            top: 0;
        }
    }
}
</style>