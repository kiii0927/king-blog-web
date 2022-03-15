<template>
  <div class="about">
    <canvas id="confetti"></canvas>
    <div class="blog-slider">
      <div class="blog-slider__wrp swiper-wrapper">
        <div
          class="blog-slider__item swiper-slide"
          v-for="(img, index) in imgs"
          :key="index"
        >
          <div class="blog-slider__img">
            <img v-lazy="img" alt="...." />
          </div>
          <div class="blog-slider__content">
            <span class="blog-slider__code">About me</span>
            <div class="blog-slider__title">{{ titles[index] }}</div>
            <div class="blog-slider__text">
              {{ texts[index] }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="blog-slider__pagination"></div> -->
    </div>
    <div class="_right-footer">
      <div class="_motto">
        <p>今夜は月が绮丽ですね，</p>
        <p>風も優しい</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "About",
  data() {
    return {
      imgs: [
        "http://img.wwery.com/Sugar/fPcdwnDj.jpg",
        -"http://img.wwery.com/Sugar/828800406084346.jpeg",
        "http://img.wwery.com/Sugar/mjYVBNkj.jpg",
      ],
      date: "2019年12月18",
      titles: ["音乐爱好者", "游戏狂热粉", "初级程序员"],
      texts: [
        "随时随地都在听音乐，无论在工作时、在休息时、在旅途中...其对音乐的喜爱甚至成为了一种习惯。",
        // "玩过大部分手机主流游戏，也玩过无人问津的单机游戏.... 可能有人会觉得游戏会影响学习、误人子弟、浪费时间... 但我想说，英国哲学家‘罗素’从说过：你能在浪费时间中获得乐趣，就不是浪费时间。 ----罗素"
        "玩过大部分手机主流游戏，也玩过无人问津的单机游戏.... ",
        "专注于后端开发，熟练使用Html5、Css3、Java、JavaWeb、Mysql以及Es6...，随心使用Bootstrap4、Element-ui、Layui等主流前端框架。掌握Vue等系列全家桶，能使用Vue-cli4、Webpack构建项目，对WebApp（小程序）和node有一定的了解，使用Nginx、Apache自己部署后端服务器。",
      ],
    };
  },
  mounted() {
    this.initCanvas();
    this.$nextTick(() => {
      let mySwiper = new Swiper(".blog-slider", {
        // spaceBetween: 30,
        effect: "fade",
        allowTouchMove: false, // 禁止触摸滑动
        autoplay: {
          delay: 8000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        // pagination: {
        //   el: ".blog-slider__pagination",
        //   clickable: true,
        // },
      });
      // this.handleHover(mySwiper);
    });
  },
  methods: {
    handleHover(target) {
      $(".swiper-pagination-bullet").hover(
        function () {
          $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
        },
        function () {
          target.autoplay.start(); //鼠标移出之后，自动轮播开启
        }
      );
    },
    initCanvas() {
      // global variables
      const confetti = document.getElementById("confetti");
      const confettiCtx = confetti.getContext("2d");
      let container,
        confettiElements = [],
        clickPosition;

      // helper
      let rand = (min, max) => Math.random() * (max - min) + min;

      // params to play with
      const confettiParams = {
        // number of confetti per "explosion"
        number: 70,
        // min and max size for each rectangle
        size: { x: [5, 20], y: [10, 18] },
        // power of explosion
        initSpeed: 25,
        // defines how fast particles go down after blast-off
        gravity: 0.65,
        // how wide is explosion
        drag: 0.08,
        // how slow particles are falling
        terminalVelocity: 6,
        // how fast particles are rotating around themselves
        flipSpeed: 0.017,
      };
      const colors = [
        { front: "#3B870A", back: "#E74C3C" },
        { front: "#B96300", back: "#F1C40F" },
        { front: "#E23D34", back: "#2ECC71" },
        { front: "#CD3168", back: "#3498DB" },
        { front: "#664E8B", back: "#9B59B6" },
      ];

      setupCanvas();
      updateConfetti();

      confetti.addEventListener("click", addConfetti);
      window.addEventListener("resize", () => {
        setupCanvas();
        hideConfetti();
      });

      // Confetti constructor
      function Conf() {
        this.randomModifier = rand(-1, 1);
        this.colorPair = colors[Math.floor(rand(0, colors.length))];
        this.dimensions = {
          x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
          y: rand(confettiParams.size.y[0], confettiParams.size.y[1]),
        };
        this.position = {
          x: clickPosition[0],
          y: clickPosition[1],
        };
        this.rotation = rand(0, 2 * Math.PI);
        this.scale = { x: 1, y: 1 };
        this.velocity = {
          x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
          y: rand(-confettiParams.initSpeed, confettiParams.initSpeed),
        };
        this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;

        if (this.position.y <= container.h) {
          this.velocity.y = -Math.abs(this.velocity.y);
        }

        this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;

        this.update = function () {
          this.velocity.x *= 0.98;
          this.position.x += this.velocity.x;

          this.velocity.y += this.randomModifier * confettiParams.drag;
          this.velocity.y += confettiParams.gravity;
          this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
          this.position.y += this.velocity.y;

          this.scale.y = Math.cos(
            (this.position.y + this.randomModifier) * this.flipSpeed
          );
          this.color =
            this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
        };
      }

      function updateConfetti() {
        confettiCtx.clearRect(0, 0, container.w, container.h);

        confettiElements.forEach((c) => {
          c.update();
          confettiCtx.translate(c.position.x, c.position.y);
          confettiCtx.rotate(c.rotation);
          const width = c.dimensions.x * c.scale.x;
          const height = c.dimensions.y * c.scale.y;
          confettiCtx.fillStyle = c.color;
          confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
          confettiCtx.setTransform(1, 0, 0, 1, 0, 0);
        });

        confettiElements.forEach((c, idx) => {
          if (
            c.position.y > container.h ||
            c.position.x < -0.5 * container.x ||
            c.position.x > 1.5 * container.x
          ) {
            confettiElements.splice(idx, 1);
          }
        });
        window.requestAnimationFrame(updateConfetti);
      }

      function setupCanvas() {
        container = {
          w: confetti.clientWidth,
          h: confetti.clientHeight,
        };
        confetti.width = container.w;
        confetti.height = container.h;
      }

      function addConfetti(e) {
        const canvasBox = confetti.getBoundingClientRect();
        if (e) {
          clickPosition = [
            e.clientX - canvasBox.left,
            e.clientY - canvasBox.top,
          ];
        } else {
          clickPosition = [
            canvasBox.width * Math.random(),
            canvasBox.height * Math.random(),
          ];
        }
        for (let i = 0; i < confettiParams.number; i++) {
          confettiElements.push(new Conf());
        }
      }

      function hideConfetti() {
        confettiElements = [];
        window.cancelAnimationFrame(updateConfetti);
      }
    },
  },
};
</script>

<style scoped>
._right-footer {
  height: 100%;
  position: relative;
}
._right-footer ._motto {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15px;
  width: 24px;
  height: 310px;
  margin: auto;
  text-align: center;
  color: rgba(123, 121, 146, 0.9);
}
._right-footer ._motto p {
  margin-top: 18px;
}

canvas {
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 2;
}
</style>

<style scoped>
.about {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  box-sizing: border-box;
  /* background: linear-gradient(to right, #7ed386, #3fb6a8); */
  /* background: #24a19c; */
}
.blog-slider {
  position: relative;
  max-width: 800px;
  margin: auto;
  background: #fff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  border-radius: 25px;
  height: 400px;
  transform: scale(1.5);
  transition: all 0.3s;
}
@media screen and (max-width: 992px) {
  .blog-slider {
    max-width: 680px;
    height: 400px;
  }
}
@media screen and (max-width: 768px) {
  .blog-slider {
    min-height: 500px;
    height: auto;
    margin: 180px auto;
  }
}
@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider {
    height: 350px;
  }
}
.blog-slider__item {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .blog-slider__item {
    flex-direction: column;
  }
}
.blog-slider__img {
  width: 300px;
  flex-shrink: 0;
  height: 300px;
  /* background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%); */
  /* box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2); */
  border-radius: 20px;
  transform: translateX(-80px);
  overflow: hidden;
}
.blog-slider__img:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%); */
  border-radius: 20px;
  opacity: 0.8;
}
.blog-slider__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  border-radius: 20px;
  transition: all 0.6s;
}
@media screen and (max-width: 768px) {
  .blog-slider__img {
    transform: translateY(-50%);
    width: 90%;
  }
}
@media screen and (max-width: 576px) {
  .blog-slider__img {
    width: 95%;
  }
}
@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider__img {
    height: 270px;
  }
}
.blog-slider__content {
  padding-right: 25px;
  user-select: none;
}
@media screen and (max-width: 768px) {
  .blog-slider__content {
    margin-top: -80px;
    text-align: center;
    padding: 0 30px;
  }
}
@media screen and (max-width: 576px) {
  .blog-slider__content {
    padding: 0;
  }
}
.blog-slider__content > * {
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.4s;
}
.blog-slider__code {
  color: #7b7992;
  margin-bottom: 15px;
  display: block;
  font-weight: 500;
}
.blog-slider__title {
  font-size: 24px;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 20px;
}
.blog-slider__text {
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
}

.blog-slider__pagination {
  position: absolute;
  z-index: 21;
  right: 20px;
  width: 11px !important;
  text-align: center;
  left: auto !important;
  top: 50%;
  bottom: auto !important;
  transform: translateY(-50%);
}
@media screen and (max-width: 768px) {
  .blog-slider__pagination {
    transform: translateX(-50%);
    left: 50% !important;
    top: 205px;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<style>
/* blog-slider__item */
.blog-slider__item.swiper-slide-active .blog-slider__img img {
  opacity: 1;
  transition-delay: 0.3s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > * {
  opacity: 1;
  transform: none;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(1) {
  transition-delay: 0.3s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(2) {
  transition-delay: 0.4s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(3) {
  transition-delay: 0.5s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(4) {
  transition-delay: 0.6s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(5) {
  transition-delay: 0.7s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(6) {
  transition-delay: 0.8s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(7) {
  transition-delay: 0.9s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(8) {
  transition-delay: 1s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(9) {
  transition-delay: 1.1s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(10) {
  transition-delay: 1.2s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(11) {
  transition-delay: 1.3s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(12) {
  transition-delay: 1.4s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(13) {
  transition-delay: 1.5s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(14) {
  transition-delay: 1.6s;
}
.blog-slider__item.swiper-slide-active .blog-slider__content > *:nth-child(15) {
  transition-delay: 1.7s;
}
/* .blog-slider .swiper-container-horizontal > .swiper-pagination-bullets,
.blog-slider .swiper-pagination-custom,
.blog-slider .swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
} */
.blog-slider__pagination.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 8px 0;
}
@media screen and (max-width: 768px) {
  .blog-slider__pagination.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 5px;
  }
}
.blog-slider__pagination .swiper-pagination-bullet {
  width: 11px;
  height: 11px;
  display: block;
  border-radius: 10px;
  background: #062744;
  opacity: 0.2;
  transition: all 0.3s;
}
.blog-slider__pagination .swiper-pagination-bullet-active {
  opacity: 1;
  background: #fd3838;
  height: 30px;
  box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);
}
@media screen and (max-width: 768px) {
  .blog-slider__pagination .swiper-pagination-bullet-active {
    height: 11px;
    width: 30px;
  }
}
</style>