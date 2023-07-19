<template>
    <div class="home" ref="home">
        <!-- banner -->
        <div class="home-banner">
            <el-row :gutter="20" style="height: 100%">
                <!-- 轮播图 -->
                <el-col :span="18" style="height: 100%">
                    <div class="home-banner_banner">
                        <el-carousel
                            style="height: 100%"
                            ref="carousel"
                            :autoplay="autoplay"
                            :interval="5000"
                            @change="carouselActive"
                        >
                            <el-carousel-item
                                v-for="(item, index) in popularArticles"
                                :key="item.id"
                                :class="[
                                    'carousel-leave',
                                    index == 0 && carouselImgIndex == 0 ? 'carousel-active' : '',
                                    index == 1 && carouselImgIndex == 1 ? 'carousel-active' : '',
                                    index == 2 && carouselImgIndex == 2 ? 'carousel-active' : '',
                                ]"
                            >
                                <!-- carousel info -->
                                <div class="carousel-info">
                                    <span class="el-icon-caret-right">推荐文章</span>
                                    <div class="carousel-info-title paragraph-truncate">
                                        "{{ item.description }}"
                                    </div>
                                    <button class="rain-btn" @click="handleRead(item.id)">
                                        READ MORE
                                    </button>
                                    <!-- el-icon-collection-tag -->
                                    <div class="carousel-info-next el-icon-reading">
                                        |
                                        <a @click="next">Next</a>
                                    </div>
                                </div>
                                <el-image
                                    style="width: 100%; height: 100%"
                                    :src="item.firstPicture"
                                    fit="cover"
                                ></el-image>
                            </el-carousel-item>
                            <!-- small -->
                            <div class="home-carousel-nav">
                                <div
                                    v-for="(item, index) in popularArticles"
                                    :key="item.id"
                                    @mouseenter="changeCarousel(index)"
                                    :class="[
                                        carouselImgIndex2 == 0 && index == 0
                                            ? 'carousel_active'
                                            : '',
                                        carouselImgIndex2 == 1 && index == 1
                                            ? 'carousel_active'
                                            : '',
                                        carouselImgIndex2 == 2 && index == 2
                                            ? 'carousel_active'
                                            : '',
                                    ]"
                                >
                                    <img :src="item.firstPicture" alt="" />
                                </div>
                            </div>
                        </el-carousel>
                    </div>
                </el-col>
                <!-- aside img -->
                <el-col :span="6" style="height: 100%">
                    <div class="home-banner-aside">
                        <div class="home-banner-aside_top" title="点击查看">
                            <div
                                @click="openImg"
                                class="home-banner-aside_top_bg"
                                :class="{ animation_paused: paused }"
                                :style="`background-image: url(${bgmove[count]});`"
                            >
                                <el-image
                                    v-show="false"
                                    ref="ElImage"
                                    style="width: 100%; height: 100%"
                                    :src="bgmove[count]"
                                    fit="cover"
                                    :preview-src-list="bgmove"
                                    lazy
                                ></el-image>
                            </div>
                        </div>
                        <!-- bottom -->

                        <div class="home-banner-aside_bottom">
                            <ClockVue :image="bgmove[count2]" />
                        </div>
                    </div>
                </el-col>
            </el-row>
            <BacktopVue />
        </div>

        <!-- blog 主体内容 -->
        <div class="home-content" v-show="recommendList.length">
            <el-row :gutter="30">
                <el-col :span="4" class="home-content__left">
                    <LeftAsideVue :bgmove="bgmove" :recommendList="popularArticles"></LeftAsideVue>
                </el-col>

                <el-col :span="15">
                    <HomeMain />
                </el-col>

                <el-col :span="5" class="home-content__right">
                    <RightAside></RightAside>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import notify from '@/mixin/notify';
import { mapGetters } from 'vuex';
export default {
    name: 'Home',
    components: {
        HomeMain: () => import('./main'),
        RightAside: () => import('./aside/RightAside.vue'),
        LeftAsideVue: () => import('./aside/LeftAside.vue'),
        BacktopVue: () => import('@/components/Backtop.vue'),
        ClockVue: () => import('@/components/Clock.vue'),
    },
    mixins: [notify],
    data() {
        return {
            popularArticles: [],
            autoplay: true, // 自动切换 carousel
            count: 0,
            count2: 0,
            paused: false,
            timer: null,
            timer2: null,
            bgmove: [
                'https://api.adicw.cn/images/StudyImg/60a671f8b7c20.jpg',
                'https://api.adicw.cn/uploads/ComicImg/108/6149d7e883d53.png',
                'https://api.adicw.cn/images/StudyImg/5feef2880891a.jpg',
                'https://api.adicw.cn/images/StudyImg/20191025115953.jpg',
                'https://api.adicw.cn/images/StudyImg/20191031060140.jpg',
                'https://api.adicw.cn/images/DfImg/wallhaven-256037.jpg',
                'https://api.adicw.cn/images/StudyImg/20200204110308.jpg',
                'https://api.adicw.cn/images/StudyImg/20201107102130.jpg',
                'https://api.adicw.cn/images/StudyImg/20191006010059.jpg',
                'https://api.adicw.cn/images/StudyImg/6141a4ce2715a.png',
                'https://api.adicw.cn/images/DfImg/ea81-hiycyfw6936247.jpg',
                'https://api.adicw.cn/images/StudyImg/20200326044543.jpg',
                'https://api.adicw.cn/images/StudyImg/20191023073450.jpg',
                'https://api.adicw.cn/images/StudyImg/20191021050854.jpg',
                'https://api.adicw.cn/images/StudyImg/20200902034741.jpg',
                'https://api.adicw.cn/images/StudyImg/20200805053247.jpg',
                'https://api.adicw.cn/images/StudyImg/20191129033520.jpg',
                'https://api.adicw.cn/images/StudyImg/20200929095155.jpg',
            ],
            screenWidth: document.body.clientWidth,
            carouselImgIndex: 0,
            carouselImgIndex2: 0,
            DateTime: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        };
    },
    beforeMount() {
        this.handleInit();
    },
    mounted() {
        this.count = Math.floor(Math.random() * this.bgmove.length);
        this.count2 = Math.floor(Math.random() * this.bgmove.length);
        window.onresize = () => {
            // 浏览器宽度
            this.screenWidth = document.body.clientWidth;
        };
        setInterval(() => {
            this.count = Math.floor(Math.random() * this.bgmove.length);
        }, 30000);
    },
    methods: {
        handleInit() {
            this.$store.dispatch('blog/getInformation');
        },
        // 下一张
        next() {
            // 切换至下一张幻灯片
            this.$refs.carousel.next();
        },
        // 打开大图预览
        openImg() {
            this.autoplay = false;
            this.paused = true;
            // 打开图片预览
            this.$refs.ElImage.showViewer = true;
            if (!this.timer) {
                this.timer = setInterval(() => {
                    if (!this.showViewer) {
                        this.autoplay = true;
                        this.paused = false;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 100);
            }
        },
        // 幻灯片切换时触发; 参数: 目前激活的幻灯片的索引，原幻灯片的索引
        carouselActive(index) {
            this.carouselImgIndex2 = index;
            this.carouselImgIndex = index;
        },
        changeCarousel(index) {
            this.carouselImgIndex2 = index;
            this.$refs.carousel.setActiveItem(index);
        },
        // 点击阅读
        handleRead(id) {
            this.$router.push(`/detail/${id}`);
        },
    },
    computed: {
        showViewer() {
            return this.$refs.ElImage.showViewer || false;
        },
        ...mapGetters('blog', ['recommendList']),
        ...mapGetters(['uId']),
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.$nextTick(() => {
                if (from.path === '/login' && vm.uId) {
                    // 建立ws连接
                    const { initWebSocket } = require('@/utils/webSocket');
                    const websock = initWebSocket(vm.uId);
                    vm.$store.commit('common/SET_WEBSOCKET', websock);
                }
            });
        });
    },
    watch: {
        // screenWidth: {
        //   immediate: true,
        //   handler(val) {
        //     if (val < 1200) {
        //       alert("请在PC端访问！！！！！");
        //       window.location.href = "about:blank";
        //       window.close();
        //     }
        //   },
        // },
        recommendList: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal.length) {
                    const obj = [...newVal];
                    obj.length = 3;
                    this.popularArticles = [...obj];
                }
            },
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.timer2);
        Object.assign(this._data, this.$options.data());
    },
};
</script>

<style scoped lang="scss">
.scroll-indicator {
    position: fixed;
    height: 4px;
    top: 0;
    left: 0;
    // background: var(--wathet-color);
    background: linear-gradient(90deg, #9abdeb, #80f9b7, #9abdeb);
    z-index: 1000;
}

/* 修改 element ui 样式 */
::v-deep .el-carousel__container {
    height: inherit;
}

::v-deep .el-image img {
    border-radius: 6px;
    user-select: none;
    cursor: default;
}
</style>

<style lang="scss">
/* 自定义 element ui 轮播图演示 */
.home-banner .el-carousel .el-carousel__arrow {
    border-radius: 0 !important;
    border: 56px solid transparent !important;
    border-bottom: 60px solid rgb(233 238 243) !important;
    /* border-bottom: 60px solid rgba(255, 255, 255, 0.9) !important; */
    background-color: transparent !important;
}

.home-banner .el-carousel .el-carousel__arrow i {
    display: none !important;
}

.home-banner .el-carousel .el-carousel__arrow {
    margin-top: -56px;
}

.home-banner .el-carousel .el-carousel__arrow--left {
    transform: rotate(90deg) translateY(-50%) !important;
    left: -60px;
}

.home-banner .el-carousel .el-carousel__arrow--right {
    transform: rotate(-90deg) translateY(-50%) !important;
    right: -60px;
}

.el-carousel--horizontal {
    overflow-y: hidden;
}
</style>

<style>
/* carousel info */
.home-banner .el-carousel .el-carousel__item .carousel-info {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 40%;
    height: 300px;
    padding: 16px;
    margin: 0 0 36px 100px;
    color: #fff;
    transition: all 0.25s ease-in-out;
    z-index: 4;
    user-select: none;
    overflow: hidden;
    border-radius: 16px;
    cursor: default;
}

.home-banner .el-carousel .el-carousel__item .carousel-info:hover .rain-btn {
    transform: translateX(0);
}

.home-banner .el-carousel .el-carousel__item .carousel-info:hover .carousel-info-next {
    transform: translateY(0);
}

.home-banner .el-carousel .el-carousel__item .carousel-info span::before {
    color: var(--marked-color) !important;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .carousel-info-title {
    margin-top: 24px;
    width: 100%;
    height: 105px;
    font-size: 36px;
    line-height: 50px;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .rain-btn {
    position: relative;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-left: 10px;
    padding: 10px 20px;
    /* 它是描述相对于应用在当前元素的字体尺寸，所以它也是相对长度单位。一般浏览器字体大小默认为16px，则2em == 32px； */
    border-radius: 2em;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(90deg, var(--blue-color), var(--light-color), var(--blue-color));
    background-size: 280%;
    animation: glow 6s linear infinite;
    transform: translateX(-140%);
    transition: all 0.25s ease;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .rain-btn::before {
    position: absolute;
    content: '';
    top: -5px;
    left: -5px;
    bottom: -5px;
    right: -5px;
    z-index: -1;
    background: inherit;
    background-size: inherit;
    border-radius: 4em;
    opacity: 0;
    transition: 0.5s;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .rain-btn:hover::before {
    opacity: 1;
    filter: blur(5px);
    animation: glow 8s linear infinite;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .carousel-info-next {
    /* 设置为弹性盒 */
    display: flex;
    /* 均匀排列每个元素, 每个元素周围分配相同的空间 */
    justify-content: space-around;
    /* 居中对齐弹性盒的各项 (<div>) 元素： */
    /* 元素位于容器的中心。弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。 */
    align-items: center;
    width: 111px;
    height: 46px;
    color: #c7b8b8;
    margin: 14px 10px;
    /* transform效果, 默认不在轮播图内, 当鼠标移入 .home-banner .el-carousel .el-carousel__item .carousel-info:hover .carousel-info-next */
    /* 当中则还原 y 轴 */
    transform: translateY(100%);
    /* 过度效果 */
    transition: all 0.4s ease;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .carousel-info-next::before {
    padding-top: 4px;
    font-size: 22px;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .carousel-info-next a {
    font-size: 16px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
}

.home-banner .el-carousel .el-carousel__container .el-carousel__item .el-image {
    transition: all 0.3s ease;
}

.home-banner .el-carousel .el-carousel__container .el-carousel__item .el-image::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgb(151 133 133 / 10%);
}

.home-banner .el-carousel .el-carousel__container .el-carousel__item:hover .el-image {
    /* background: rgba(0, 0, 0, 0.3); */
    filter: blur(3px);
}
</style>
