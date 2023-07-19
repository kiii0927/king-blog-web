<template>
    <div class="notify-head">
        <div class="notify-head__title">
            <p>{{ title }}</p>
            <!-- <el-divider /> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlotHead',

    props: {
        title: {
            type: String,
            required: true,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
.notify-head {
    width: 100%;
    display: flex;
    margin-bottom: 10px;

    .notify-head__title {
        height: 42px;
        background-color: #fff;
        -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        -ms-flex-negative: 0;
        flex-shrink: 1;
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
        width: 100%;
        // p {
        //     height: 100%;
        //     // background-color: #fff;
        //     // box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        //     // -ms-flex-negative: 0;
        //     // display: flex;
        //     // align-items: center;
        //     // justify-content: space-between;
        //     // padding: 0 16px;
        //     // color: #666;
        //     // border-radius: 4px;
        //     // width: 100%;
        //     // box-sizing: border-box;
        // }
    }
}
</style>
