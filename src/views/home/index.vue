<template>
  <div class="home" ref="home">
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
                v-for="(item, index) in imgList"
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
                  <span class="el-icon-caret-right"> 推荐文章 </span>
                  <div class="carousel-info-title paragraph-truncate">
                    "其实vue3的组合式api，就这么简单"
                  </div>
                  <button class="rain-btn">READ MORE</button>
                  <!-- el-icon-collection-tag -->
                  <div class="carousel-info-next el-icon-reading">
                    | <a @click="next">Next</a>
                  </div>
                </div>

                <!-- img -->
                <el-image
                  style="width: 100%; height: 100%"
                  :src="item.imgUrl"
                  fit="cover"
                >
                </el-image>
              </el-carousel-item>
              <div class="home-carousel-nav">
                <div
                  v-for="(img, index) in imgList"
                  :key="img.id"
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
                  <img :src="img.imgUrl" alt="" />
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
            <div
              class="home-banner-aside_bottom"
              title="点击复制到粘贴板"
              @click="onCopy"
            >
              <div class="home-banner-aside_bottom_bgimg">
                <img
                  :src="count ? bgmove[count - 1] : bgmove[count + 1]"
                  alt="图片未找到"
                />
              </div>
              <div class="_clock">
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
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-content">
      <el-row :gutter="30">
        <el-col :span="5">
          <div class="home-content__left"></div>
        </el-col>

        <el-col :span="13">
          <div class="home-content__center">
            <div class="request-list__content">
              <div
                class="study-lg-card"
                v-for="(item, index) in 5"
                :key="index"
              >
                <div class="study-lg-card_cover">
                  <img v-lazy="img[index]" alt="...." />
                  <p>
                    <span>前端</span>
                    <a>Pinia，完全版的vue全局状态管理（vuex的代替者）</a>
                  </p>
                  <div>
                    <p>
                      本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学
                    </p>
                  </div>
                </div>

                <div class="study-lg-card_footer">
                  <ul>
                    <li>
                      <i class="el-icon-date"></i>
                      <span>2022/1/23</span>
                    </li>
                    <li>
                      <i class="el-icon-chat-dot-round"></i>
                      <span>4条评论</span>
                    </li>
                    <li>
                      <i class="el-icon-view"></i>
                      <span>22次阅读</span>
                    </li>
                  </ul>
                  <div class="_read" @click="handleRead(index + 1)">
                    <a>点击阅读</a>
                    <!-- <i class="el-icon-reading"></i> -->
                    <i class="el-icon-sunrise-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="home-content__right"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import notify from "@/mixin/notify";
export default {
  name: "Home",
  mixins: [notify],
  data() {
    return {
      autoplay: true, // 自动切换 carousel
      count: 0,
      paused: false,
      timer: null,
      timer2: null,
      img: [
        "https://api.adicw.cn/images/StudyImg/610cefbc343a4.png",
        "https://api.adicw.cn/uploads/StudyImg/6050cbd7b7ee6.jpg",
        "https://api.adicw.cn/uploads/StudyImg/6050c98600b1c.jpg",
        "https://api.adicw.cn/uploads/StudyImg/20200929095155.jpg",
        "https://api.adicw.cn/uploads/StudyImg/20200611114033.jpg",
      ],
      imgList: [
        {
          id: 1,
          imgUrl: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          imgName: "001",
        },
        {
          id: 2,
          imgUrl: "http://img.wwery.com/Sugar/mjYVBNkj.jpg",
          imgName: "002",
        },
        {
          id: 3,
          imgUrl: "http://img.wwery.com/Sugar/fPcdwnDj.jpg",
          imgName: "003",
        },
      ],
      bgmove: [
        "https://api.adicw.cn/images/StudyImg/610cefbc343a4.png",
        "https://api.adicw.cn/images/StudyImg/60a671f8b7c20.jpg",
        "https://api.adicw.cn/uploads/ComicImg/108/6149d7e883d53.png",
        "https://api.adicw.cn/images/StudyImg/5feef2880891a.jpg",
        "https://api.adicw.cn/images/StudyImg/20191025115953.jpg",
        "https://api.adicw.cn/images/StudyImg/20191031060140.jpg",
        "https://api.adicw.cn/images/DfImg/wallhaven-256037.jpg",
        "https://api.adicw.cn/images/StudyImg/20200204110308.jpg",
        "https://api.adicw.cn/images/StudyImg/20201107102130.jpg",
        "https://api.adicw.cn/images/StudyImg/20191006010059.jpg",
        "https://api.adicw.cn/images/StudyImg/6141a4ce2715a.png",
        "https://api.adicw.cn/images/DfImg/ea81-hiycyfw6936247.jpg",
        "https://api.adicw.cn/images/StudyImg/20200326044543.jpg",
        "https://api.adicw.cn/images/StudyImg/20191023073450.jpg",
        "https://api.adicw.cn/images/StudyImg/20191021050854.jpg",
        "https://api.adicw.cn/images/StudyImg/20200902034741.jpg",
        "https://api.adicw.cn/images/StudyImg/20200805053247.jpg",
        "https://api.adicw.cn/images/StudyImg/20191129033520.jpg",
        "https://api.adicw.cn/images/StudyImg/20200929095155.jpg",
      ],
      screenWidth: document.body.clientWidth,
      carouselImgIndex: 0,
      carouselImgIndex2: 0,
      DateTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      cardList: [], // blog detail
    };
  },
  mounted() {
    this.count = Math.floor(Math.random() * this.bgmove.length);
    window.onresize = () => {
      // 浏览器宽度
      this.screenWidth = document.body.clientWidth;
    };
    this.dateTime();
    setInterval(() => {
      this.count = Math.floor(Math.random() * this.bgmove.length);
    }, 30000);
  },
  methods: {
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
    // date
    dateTime() {
      this.timer2 = setInterval(() => {
        let date = new Date();
        let hours = date.getHours() + "";
        if (hours < 9) hours = "0" + hours;
        let minutes = date.getMinutes() + "";
        if (minutes < 9) minutes = "0" + minutes;
        let seconds = date.getSeconds() + "";
        if (seconds < 9) seconds = "0" + seconds;
        const obj = {
          hours,
          minutes,
          seconds,
        };
        Object.assign(this.DateTime, obj);
      }, 1000);
    },
    onCopy() {
      const date = new Date();
      this.$copyText(date).then(
        (e) => {
          this.$_notify_success("复制成功");
        },
        (e) => {
          this.$_notify_error("复制失败");
          console.log(e);
        }
      );
    },
    // 点击阅读
    handleRead(id) {
      /* this.$router.push({
        name: "BlogDetail",
        params: {
          id,
        },
      }); */
      this.$router.push(`/detail/${id}`);
    },
  },
  computed: {
    showViewer() {
      return this.$refs.ElImage.showViewer || false;
    },
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler(val) {
        // if (val < 1200) {
        //   alert("请在PC端访问！！！！！");
        //   window.location.href = "about:blank";
        //   window.close();
        // }
      },
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    Object.assign(this._data, this.$options.data());
    window.removeEventListener("scroll", this.getScroll);
  },
};
</script>

<style scoped lang="scss">
@import "~@/style/home.scss";

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


<style>
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
@import "~@/style/animation.scss";

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

.home-banner
  .el-carousel
  .el-carousel__item
  .carousel-info:hover
  .carousel-info-next {
  transform: translateY(0);
}

.home-banner .el-carousel .el-carousel__item .carousel-info span::before {
  color: var(--marked-color) !important;
}

.home-banner
  .el-carousel
  .el-carousel__item
  .carousel-info
  .carousel-info-title {
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
  background: linear-gradient(
    90deg,
    var(--blue-color),
    var(--light-color),
    var(--blue-color)
  );
  background-size: 280%;
  animation: glow 6s linear infinite;
  transform: translateX(-140%);
  transition: all 0.25s ease;
}

.home-banner .el-carousel .el-carousel__item .carousel-info .rain-btn::before {
  position: absolute;
  content: "";
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

.home-banner
  .el-carousel
  .el-carousel__item
  .carousel-info
  .rain-btn:hover::before {
  opacity: 1;
  filter: blur(5px);
  animation: glow 8s linear infinite;
}

.home-banner
  .el-carousel
  .el-carousel__item
  .carousel-info
  .carousel-info-next {
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

.home-banner
  .el-carousel
  .el-carousel__item
  .carousel-info
  .carousel-info-next::before {
  padding-top: 4px;
  font-size: 22px;
}

.home-banner
  .el-carousel
  .el-carousel__item
  .carousel-info
  .carousel-info-next
  a {
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}
</style>