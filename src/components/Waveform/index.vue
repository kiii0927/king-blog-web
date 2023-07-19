<template>
    <div class="waveform" v-if="isShow">
        <div class="waveform__container" ref="container">
            <div class="loader-overlay" ref="loaderOverlay">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 80 60"
                    preserveAspectRatio="none"
                >
                    <path
                        id="path"
                        d="m -5,-5 0,70 90,0 0,-70 z M 0,30 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z"
                        fill="#fff"
                        ref="path"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Waveform',
    props: {
        isShow: {
            required: true,
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        this.$nextTick(() => this.handleLoad());
    },
    methods: {
        handleLoad() {
            let loader = this.$refs.loaderOverlay || document.querySelector('.loader-overlay');
            let path = this.$refs.path || document.querySelector('#path');

            path.addEventListener('animationend', event => {
                if (event.animationName === 'waveform_open') {
                    loader.classList.add('loading');
                    setTimeout(function () {
                        loader.classList.remove('loading');
                        path.style.d =
                            "path('m -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z')";
                        path.style.animation = 'waveform_close 1s ease-in-out reverse';
                    }, 2000);
                } else {
                    this.$nextTick(() => (this.$parent.isWaveformShow = false));
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.waveform {
    width: 100%;
    height: 100vh;
    min-height: 100%;
    // position: absolute;
    // top: 0;

    .waveform__container {
        width: 100%;
        height: 100vh;
        position: relative;
        // z-index: 100;

        // SVG 动画
        .loader-overlay {
            position: absolute;
            width: inherit;
            height: inherit;

            /* prettier-ignore */
            #path {
              // d: path("m -5,-5 0,70 90,0 0,-70 z M 0,30 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z");
              fill: rgb(255, 255, 255);
              animation: waveform_open 1s ease-in-out forwards;
			}

            &::before,
            &::after {
                content: '';
                width: 30px;
                height: 30px;
                position: absolute;
                top: 50%;
                left: 50%;
                border-radius: 50%;
                background-color: red;
                animation: rotate 2s infinite cubic-bezier(0.44, 0.1, 0.52, 0.95);
                mix-blend-mode: multiply;
                visibility: hidden;
            }

            &::before {
                background-color: #00f2ea;
            }

            &::after {
                background-color: #ff0050;
                animation-delay: 1s;
            }

            &.loading {
                &::before,
                &::after {
                    visibility: visible;
                }
            }
        }
    }
}
</style>

<style>
/* animation */
@keyframes rotate {
    0%,
    100% {
        transform: translate(20px);
    }

    25% {
        scale: 0.3;
    }

    50% {
        transform: translate(-50px);
    }

    75% {
        scale: 1.3;
    }
}

@keyframes waveform_open {
    0% {
        d: path(
            'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z'
        );
    }

    100% {
        d: path(
            'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z'
        );
    }
}

@keyframes waveform_close {
    0% {
        d: path(
            'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z'
        );
    }

    100% {
        d: path(
            'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z'
        );
    }
}
</style>
