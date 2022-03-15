<template>
  <div class="contact">
    <div class="contact-envelope">
      <div class="contact-envelope-head"></div>
      <div class="contact-envelope-paper">
        <h2>’留 言</h2>
        <p>描述你的问题，我将尽力解决~</p>
        <el-input
          type="textarea"
          rows="5"
          placeholder="请输入内容"
          v-model.lazy="desc"
        ></el-input>
        <div class="contact-box-inner">
          <el-input placeholder="昵称" v-model.lazy="nickname"></el-input>
        </div>
        <div class="contact-box-inner">
          <el-input placeholder="邮箱" v-model.lazy="mail"></el-input>
        </div>
        <el-input placeholder="标题" v-model.lazy="title"></el-input>
        <input type="button" value="发表" @click="handlePublish" />
      </div>
      <div class="contact-envelope-body"></div>
    </div>
  </div>
</template>

<script>
import notify from "@/mixin/notify";
export default {
  name: "Contact",
  mixins: [notify],
  data() {
    return {
      desc: "",
      nickname: "",
      mail: "",
      title: "",
    };
  },
  methods: {
    handlePublish() {
      this.$_notify_info("开发中....");
    },
  },
};
</script>

<style scoped>
.contact {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background: url(https://www.adicw.cn/assets/contact-bg.d29f59aa.jpg)
    center/cover;
}
.contact .contact-envelope {
  position: relative;
  width: 530px;
  height: 576px;
  transform: scale(1.2);
  overflow: hidden;
}
.contact .contact-envelope .contact-envelope-head {
  position: absolute;
  top: 28px;
  width: 100%;
  height: 316px;
  background: url(https://www.adicw.cn/assets/envelope-head.b81bfcfb.png);
  transition: all 0.4s ease;
}
.contact .contact-envelope .contact-envelope-paper {
  position: absolute;
  top: 222px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 490px;
  height: 206px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  overflow: hidden;
  background-color: #fff;
  transition: all 0.6s;
}
.contact .contact-envelope .contact-envelope-body {
  position: absolute;
  top: 212px;
  width: 100%;
  height: 260px;
  background: url(https://www.adicw.cn/assets/envelope-body.a455a96b.png);
  transition: all 0.4s ease;
}

.contact .contact-envelope .contact-envelope-paper p {
  font-size: 12px;
  margin: 10px 0;
}
.contact .contact-envelope .contact-envelope-paper .contact-box-inner {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  margin: 12px 0;
}
.contact .contact-envelope .contact-envelope-paper > div:nth-of-type(2) {
  padding-right: 8px;
}

.contact .contact-envelope .contact-envelope-paper > input,
.contact .contact-envelope .contact-envelope-paper > button {
  position: relative;
  left: 50%;
  margin-top: 15px;
  width: 118px;
  height: 32px;
  display: block;
  background-color: #666;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transform: translateX(-50%);
}

/* hover */
.contact .contact-envelope:hover .contact-envelope-head,
.contact .contact-envelope:hover .contact-envelope-body {
  transform: translateY(115px);
}

.contact .contact-envelope:hover .contact-envelope-paper {
  transform: translateY(-220px);
  height: 440px;
}
</style>