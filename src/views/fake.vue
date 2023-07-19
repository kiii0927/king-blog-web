<template>
    <div class="fake">
        <div>
            <el-progress type="circle" :percentage="(fake.progress * 100) >>> 0" />

            <div>{{ (fake.progress * 100) >>> 0 }}</div>
            <div>
                <!-- <el-button type="primary" @click="fake.start()">开始</el-button> -->
                <el-button type="primary" @click="fake.end()">结束</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import FakeProgress from 'fake-progress';
export default {
    name: 'WebAppFake',

    data() {
        return {
            fake: new FakeProgress({
                timeConstant: 10000,
                autoStart: true,
            }),
        };
    },

    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
.fake {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
