<template>
    <div class="container">
        <div class="loading wave">
            Loading
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebAppMyLoading',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background: #141414;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading {
        text-transform: uppercase;
        font-family: "Cabin Condensed", sans-serif;
        font-weight: bold;
        font-size: 100pt;
        text-align: center;
        height: 120px;
        line-height: 110px;
        display: block;
    }

    .wave {
        background-image: url("http://i66.tinypic.com/optxd3.png");
        -moz-background-clip: text;
        -o-background-clip: text;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0px 0px rgba(255, 255, 255, 0.06);
        animation: wave-animation .8s infinite linear, loading-animation 5s infinite linear alternate;
        background-size: 200px 100px;
        background-repeat: repeat-x;
        opacity: 1;
    }
}

@keyframes wave-animation {
    0% {
        background-position: 0 bottom;
    }

    100% {
        background-position: 200px bottom;
    }
}

@keyframes loading-animation {
    0% {
        background-size: 200px 0px;
    }

    100% {
        background-size: 200px 200px;
    }
}
</style>