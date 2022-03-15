<template>
  <div class="comment">
    <CommentSend />
    <CommentList />
  </div>
</template>

<script>
import CommentSend from "./CommentSend.vue";
import CommentList from "./CommentList.vue";
export default {
  name: "Comment",
  components: {
    CommentSend,
    CommentList,
  },
};
</script>

<style scoped>
.comment {
  width: 100%;
  height: fit-content;
}
</style>

<style>
.el-textarea__inner {
  resize: none;
  border-radius: 6px;
  font-size: 16px;
  background: #f4f5f7;
}
.el-textarea__inner:focus {
  background-color: #fff;
}
</style>