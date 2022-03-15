<template>
  <main class="files-main">
    <div
      class="files-main__content"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
      <div class="conten-ls-card" v-for="(c, index) in contens" :key="index">
        <div class="conten-ls-card-img">
          <img v-lazy="c.img" />
        </div>
        <div class="conten-ls-card-info">
          <div class="conten-ls-card-title">{{ c.title }}</div>
          <div class="conten-ls-card-content">{{ c.content }}</div>
          <div class="conten-ls-card-else">
            <i class="el-icon-date">{{ c.else.date }}</i>
            <i class="el-icon-view">{{ c.else.viewCount }}</i>
            <i class="el-icon-chat-dot-round">{{ c.else.commentCount }}</i>
          </div>
        </div>
      </div>
    </div>
    <div v-show="loading" class="files-main__loading">{{ loadingText }}</div>
  </main>
</template>

<script>
export default {
  name: "filesMain",
  data() {
    return {
      contens: [
        {
          img: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          title: "Pinia，完全版的vue全局状态管理（vuex的代替者）",
          content:
            "本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学",
          else: {
            date: "2022.01.19",
            viewCount: "294",
            commentCount: "16",
          },
        },
        {
          img: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          title: "Pinia，完全版的vue全局状态管理（vuex的代替者）",
          content:
            "本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学",
          else: {
            date: "2022.01.19",
            viewCount: "294",
            commentCount: "16",
          },
        },
        {
          img: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          title: "Pinia，完全版的vue全局状态管理（vuex的代替者）",
          content:
            "本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学",
          else: {
            date: "2022.01.19",
            viewCount: "294",
            commentCount: "16",
          },
        },
        {
          img: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          title: "Pinia，完全版的vue全局状态管理（vuex的代替者）",
          content:
            "本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学",
          else: {
            date: "2022.01.19",
            viewCount: "294",
            commentCount: "16",
          },
        },
        {
          img: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          title: "Pinia，完全版的vue全局状态管理（vuex的代替者）",
          content:
            "本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学",
          else: {
            date: "2022.01.19",
            viewCount: "294",
            commentCount: "16",
          },
        },
      ],
      loading: false,
      loadingText: "~ 拼命加载中 ~",
    };
  },
  computed: {
    noMore() {
      if (this.contens.length >= 10) {
        this.loadingText = "~ 就这么多了 ~";
        this.loading = true;
      }
      return this.contens.length >= 10;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        const obj = {
          img: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          title: "Pinia，完全版的vue全局状态管理（vuex的代替者）",
          content:
            "本文讲解了Pinia的入门基础，适用于有typescript与vue3基础的同学",
          else: {
            date: "2022.01.19",
            viewCount: "294",
            commentCount: "16",
          },
        };
        this.contens.push(obj, obj, obj);
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.files-main {
  width: 100%;
  height: calc(100vh - 280px);
  min-height: calc(100vh - 280px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 18px #00000026;
  user-select: none;
}
.files-main .files-main__loading {
  color: #999;
  margin-top: 8px;
}

.files-main .files-main__content {
  position: relative;
  width: calc(1200px + 20px * 2);
  height: calc(100% - 40px);
  overflow-y: auto;
}
.files-main__content .conten-ls-card {
  position: relative;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  height: 180px;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 20px;
  overflow: hidden;
}

.files-main__content .conten-ls-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.8s ease;
  opacity: 1;
  transform: translateX(100%);
}

.files-main__content .conten-ls-card:hover {
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
  outline: 1px solid #eee;
}
.files-main__content .conten-ls-card:hover::before {
  opacity: 0;
  transform: translateX(-100%);
}

.conten-ls-card .conten-ls-card-img {
  width: 200px;
  height: 100%;
}
.conten-ls-card-img img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.conten-ls-card .conten-ls-card-info {
  width: calc(100% - 160px);
  padding: 2px 0 2px 16px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.conten-ls-card-info .conten-ls-card-title {
  font-size: 22px;
  font-weight: 600;
  color: #717171;
}
.conten-ls-card-info .conten-ls-card-content {
  margin-top: 15px;
}
.conten-ls-card-info .conten-ls-card-else {
  margin-top: auto;
}

.conten-ls-card-info .conten-ls-card-title,
.conten-ls-card-info .conten-ls-card-content {
  /* 实现限制文字显示多行，多余的用...代替 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.conten-ls-card-info .conten-ls-card-else i {
  margin-right: 10px;
}
.conten-ls-card-info .conten-ls-card-else i::before {
  margin-right: 4px;
}
.conten-ls-card-info .conten-ls-card-else {
  font-size: 16px !important;
}

.conten-ls-card-info .conten-ls-card-content,
.conten-ls-card-info .conten-ls-card-else {
  font-size: 18px;
  color: #768791;
}
</style>