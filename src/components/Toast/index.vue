<template>
    <div class="toast" v-if="show" v-html="text" :style="styleTop"></div>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        show: {
            required: true,
            type: Boolean,
            default: false,
        },
        text: {
            // required: true,
            type: String,
            default: '这是一条提示',
        },
        duration: {
            type: Number,
            validator: function (val) {
                return val >= 1000 && val <= 15000;
            },
            default: 3000,
        },
        top: {
            type: String,
            default: '50%',
        },
    },
    computed: {
        styleTop() {
            return 'top: ' + this.top;
        },
    },
    watch: {
        show(val) {
            if (val) {
                setTimeout(() => {
                    this.$emit('update:show', false);
                }, this.duration);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    // transition: 1s;
    padding: 10px 20px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.68);
    color: white;
    font-size: 14px;
    border-radius: 10px;
    z-index: 9999;
}
</style>
