<template>
  <div class="comment-list">
    <h3>评论列表</h3>
    <div class="comment-lisi-item" v-for="c in commentList" :key="c.id">
      <img v-lazy="c.avatarImg" />
      <div class="comment-lisi-item-contain">
        <h3>{{ c.nickname }}</h3>
        <p class="comment-lisi-item-text" @click="replyComment(c)" title="回复">
          {{ c.title }}
        </p>
        <span>{{ c.commentDate }}</span>
        <ul class="comment-list-item-child">
          <li
            v-for="child in c.commentChild"
            :key="child.childId"
            class="comment-list-item-child__list"
          >
            <img v-lazy="child.childAvatarImg" />
            <div class="comment-list-item-child__list-content">
              <b>{{ child.childNickname }}</b>
              <span>&nbsp;回复&nbsp;</span>
              <b style="color: #47a1de">@{{ child.fatherNickname }}</b>
              <span @click="replyComment(child)" title="回复"
                >：{{ child.childTitle }}</span
              >
            </div>
            <span>{{ child.childCommentDate }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import notify from "@/mixin/notify";
export default {
  name: "CommentList",
  mixins: [notify],
  data() {
    return {
      commentList: [
        {
          id: "001",
          avatarImg: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          nickname: "kkkk",

          title: "测试测试11111",
          commentDate: "2022-3-11 14:22:57",
          commentChild: [
            {
              fatherId: "001",
              childId: "001-1",
              childAvatarImg:
                "https://api.adicw.cn/images/StudyImg/5feef2880891a.jpg",
              fatherNickname: "kkkk",
              childNickname: "张三",
              childTitle: "fgsgd",
              childCommentDate: "2022-3-11 19:22:57",
            },
            {
              fatherId: "001",
              childId: "001-2",
              childAvatarImg: "http://img.wwery.com/Sugar/828800406084346.jpeg",
              fatherNickname: "kkkk",
              childNickname: "k",
              childTitle: "ggsdfgsfd",
              childCommentDate: "2022-3-11 1:21:05",
            },
            {
              fatherId: "001",
              childId: "001-3",
              childAvatarImg:
                "https://api.adicw.cn/images/DfImg/wallhaven-256037.jpg",
              fatherNickname: "kkkk",
              childNickname: "李四",
              childTitle: "测试测试11111",
              childCommentDate: "2022-3-11 13:12:27",
            },
          ],
        },
        {
          id: "002",
          avatarImg: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          nickname: "kkk",
          title: "测试测试222",
          commentDate: "2022-3-11 4:2:11",
          commentChild: [],
        },
        {
          id: "003",
          avatarImg: "http://img.wwery.com/Sugar/828800406084346.jpeg",
          nickname: "kkk",
          title: "测试测试3",
          commentDate: "2022-3-11 8:2:31",
          commentChild: [],
        },
      ],
    };
  },
  mounted() {
    this.$bus.$on("issueComment", (param) => this.issueComment(param));
  },
  methods: {
    replyComment(comments) {
      this.$bus.$emit("replyComment", comments);
    },
    issueComment({ commetns, content }) {
      console.log(commetns);
      const obj = {
        fatherId: commetns.id || commetns.childId,
        childId: "00002",
        childAvatarImg: "http://img.wwery.com/Sugar/828800406084346.jpeg",
        fatherNickname: commetns.nickname || commetns.childNickname,
        childNickname: "李四",
        childTitle: content,
        childCommentDate: new Date().toLocaleString(),
      };
      const choose = commetns.fatherId || commetns.id;
      this.commentList.forEach((element, index) => {
        if (element.id == choose) {
          // console.log(obj);
          this.commentList[index].commentChild.push(obj);
          this.$_notify_success("发布成功");
          return;
        }
      });
    },
  },
};
</script>

<style scoped>
.comment-list {
  width: 100%;
  overflow: hidden;
  padding: 15px;
  margin-top: 40px;
  box-sizing: border-box;
}

.comment-lisi-item {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}
.comment-lisi-item > img {
  cursor: pointer;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment-lisi-item .comment-lisi-item-contain {
  float: right;
  padding-bottom: 15px;
  width: calc(100% - 65px);
  box-sizing: border-box;
}
.comment-lisi-item-contain > h3 {
  font-size: 24px;
}

.comment-lisi-item-contain .comment-lisi-item-text {
  font-size: 16px;
  line-height: 25px;
}

.comment-lisi-item-contain > span {
  color: #99a2aa;
  font-size: 14px;
}

.comment-lisi-item-contain .comment-list-item-child {
  width: 100%;
  padding: 6px 0;
  box-sizing: border-box;
}

.comment-list-item-child .comment-list-item-child__list {
  margin: 12px 0px;
  width: 100%;
}

.comment-list-item-child__list img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  vertical-align: top;
  margin-right: 8px;
  cursor: pointer;
  display: inline-block;
}

.comment-list-item-child__list .comment-list-item-child__list-content {
  display: inline-block;
  width: fit-content;
  margin-top: 4px;
}

.comment-list-item-child__list > span {
  margin-top: 5px;
  font-size: 14px;
  display: block;
  color: #99a2aa;
}
</style>