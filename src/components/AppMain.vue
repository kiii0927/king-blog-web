<template>
  <div class="main" ref="main">
    <router-view :key="key" />
    <div
      class="backtop"
      title="点击返回顶部"
      :style="styleObject"
      @click="backtop"
    ></div>
    <div class="scroll-indicator" ref="j_scroll_indicator"></div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      styleObject: {
        top: "-900px",
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      let dh = this.$refs.main.offsetHeight;
      let vh = document.documentElement.clientHeight;
      let sHeight = dh - vh;
      let perc = scrollTop / sHeight;
      this.$refs.j_scroll_indicator.style.width = perc * 100 + "%";
      let visibilityHeight = 200; // 滚动高度达到此参数值才出现
      if (scrollTop > visibilityHeight) {
        this.styleObject.top = "-13px";
      } else {
        this.styleObject.top = "-900px";
      }
    },
    backtop() {
      document.scrollingElement.scrollTop = 0;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: fit-content;
}
</style>

<style scoped>
.scroll-indicator {
  position: fixed;
  height: 4px;
  top: 0;
  left: 0;
  /* background: var(--wathet-color); */
  background: linear-gradient(90deg, #9abdeb, #80f9b7, #9abdeb);
  z-index: 1000;
}

.backtop {
  position: fixed;
  right: 25px;
  top: 0;
  z-index: 111;
  width: 70px;
  height: 900px;
  cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/No_Disponible.cur),
    auto;
  background: url(~@/assets/scroll.png) no-repeat bottom/cover;
  transition: all 0.6s;
}

/* backtop   float */
.backtop {
  animation: float 2s linear infinite;
}
@keyframes float {
  0% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>