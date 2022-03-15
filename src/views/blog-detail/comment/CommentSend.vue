<template>
  <div class="comment-send">
    <template v-if="isLogin">
      <div class="comment-avatar">
        <img src="http://img.wwery.com/Sugar/828800406084346.jpeg" />
      </div>
      <div class="comment-input">
        <el-input
          type="textarea"
          v-model="commentContent"
          rows="3"
          :placeholder="placeholder"
          ref="commentContent"
          @blur="blurFun"
        />
        <button class="comment-input-emoji" @click.stop="handleEmoji">
          <i class="el-icon-sunrise-1"></i>
          表情
        </button>
        <!-- emoji -->
        <transition name="fade">
          <!-- 下面一行代码写不写都一样,因为该函数只要可以进来 `isEmoji` 就是为 true. 该函数主要为了防止冒泡!!! -->
          <div
            class="emoji-editor"
            v-show="isEmoji"
            @click.stop="isEmoji = true"
          >
            <div class="emoji-editor__contain" :style="styleObject">
              <div
                class="emoji-editor__contain-item"
                v-for="(emoji, index) in emojis"
                :key="index"
              >
                <span
                  v-for="(e, index) in emoji"
                  :key="index"
                  @click="commentContent += e"
                >
                  {{ e }}
                </span>
              </div>
            </div>

            <div class="emoji-editor__nav">
              <div
                class="emoji-editor__nav-item"
                :class="[active == index ? '_active' : '']"
                @click="handelEmojiNav(index)"
                v-for="(item, index) in emojisNav"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="comment-btn" @click="issueComment">
        <span>发布</span>
      </div>
    </template>
    <div v-else class="comment-unlogin">
      <span @click="handleLogin">点击登录</span>
    </div>
  </div>
</template>

<script>
import notify from "@/mixin/notify";
export default {
  name: "CommentSend",
  mixins: [notify],
  data() {
    return {
      commentContent: "", // 评论内容
      isEmoji: false, // 是否显示表情
      isLogin: true, // 是否登录
      emojis: require("@/json/emoji.json"),
      emojisNav: require("@/json/emoji_nav.json"),
      styleObject: {
        transform: "translateX(0%)",
      },
      active: 0,
      placeholder: "请输入内容",
      placeholderCopy: "",
      commetns: {},
    };
  },
  mounted() {
    this.$bus.$on("closeEmoji", () => (this.isEmoji = false));
    this.$bus.$on("replyComment", (param) => this.replyComment(param));
  },
  methods: {
    handleEmoji() {
      this.isEmoji = true;
    },
    handelEmojiNav(index) {
      switch (index) {
        case 0:
          this.styleObject.transform = "translateX(0%)";
          break;
        case 1:
          this.styleObject.transform = "translateX(-100%)";
          break;
        case 2:
          this.styleObject.transform = "translateX(-200%)";
          break;
        case 3:
          this.styleObject.transform = "translateX(-300%)";
          break;
        case 4:
          this.styleObject.transform = "translateX(-400%)";
          break;
        case 5:
          this.styleObject.transform = "translateX(-500%)";
          break;
        case 6:
          this.styleObject.transform = "translateX(-600%)";
          break;
        case 7:
          this.styleObject.transform = "translateX(-700%)";
          break;
      }
      this.active = index;
    },
    handleLogin() {
      this.$router.push("/login");
    },
    replyComment(param) {
      this.commetns = {};
      Object.assign(this.commetns, param);
      let nickname = param.childNickname || param.nickname;
      this.placeholder = "回复@" + nickname;
      this.$nextTick(() => {
        this.$refs.commentContent.focus();
      });
    },
    issueComment() {
      if (this.commentContent == "" || this.commentContent.length == 0) {
        this.$_notify_warning("请输入内容！！！");
        this.$nextTick(() => {
          this.$refs.commentContent.focus();
        });
        return;
      }

      if (this.commentContent.length > 200) {
        this.commentContent = "";
        this.placeholder = this.placeholderCopy;
        this.$_notify_warning("您输入的内容过大！！！");
        return;
      }
      if (this.placeholderCopy.indexOf("@") == 2) {
        const obj = {
          commetns: this.commetns,
          // nickname: this.placeholderCopy.slice(3),
          content: this.commentContent,
        };

        this.$bus.$emit("issueComment", obj);
        this.commentContent = "";
      } else {
      }
    },
    blurFun() {
      this.placeholderCopy = this.placeholder;
      this.placeholder = "请输入内容";
    },
  },
};
</script>


<style scoped>
.fade-enter-active {
  animation: scale-out-top 0.5s;
}
.fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  animation: scale-in-center 0.5s;
}

@keyframes scale-out-top {
  0% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>

<style scoped>
.comment .comment-send {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.comment-send .comment-unlogin {
  width: 100%;
  height: 45px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 18px;
  box-sizing: border-box;
}
.comment-unlogin span {
  -webkit-transition: 0.25s color ease 0.1s, 0.25s padding-left ease 0.1s,
    0.25s background-color ease 0.1s;
  transition: 0.25s color ease 0.1s, 0.25s padding-left ease 0.1s,
    0.25s background-color ease 0.1s;
}
.comment-unlogin span:hover {
  padding-left: 1em;
}

.comment .comment-avatar {
  width: 70px;
  height: 70px;
}

.comment .comment-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment .comment-input {
  position: relative;
  width: calc(100% - 200px);
  padding: 0 10px;
}

.comment .comment-input .comment-input-emoji {
  border: 1px solid #def;
  background: 0 0;
  margin-top: 8px;
  padding: 8px 6px;
  outline: 0;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
}

.comment .comment-input .comment-input-emoji:hover {
  box-shadow: 2px 3px 3px rgb(0 0 0 / 10%);
  border-color: #ddd;
}

.comment .comment-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
  width: 70px;
  height: 70px;
  border-radius: 6px;
  background: var(--blue-color);
  cursor: pointer;
  margin-top: 6px;
  transition: all 0.25s;
  user-select: none;
}

.comment .comment-btn:hover {
  box-shadow: 0 0 10px var(--blue-color);
}

.emoji-editor {
  position: absolute;
  left: 10px;
  top: 138px;
  width: 400px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 11px 12px 0 rgb(106 115 133 / 30%);
  border-radius: 8px;
  user-select: none;
  box-sizing: border-box;
}
.emoji-editor .emoji-editor__contain {
  width: 100%;
  box-sizing: border-box;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
}
.emoji-editor__contain .emoji-editor__contain-item {
  /* 将对象作为内联块级弹性伸缩盒显示 */
  display: inline-flex;
  /* flex-wrap 属性规定弹性项目是否应换行 */
  flex-wrap: wrap;
  height: 237px;
  max-height: 237px;
  overflow-y: auto;
  padding: 10px 0px 10px 20px;
  box-sizing: border-box;
}
.emoji-editor__contain .emoji-editor__contain-item span {
  display: inline-flex;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  cursor: pointer;
}

.emoji-editor .emoji-editor__nav {
  width: 100%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-around;
}
.emoji-editor__nav .emoji-editor__nav-item {
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
}
.emoji-editor__nav-item._active {
  background-color: #fff;
}
</style>