<template>
  <div>
    <div id="vditor" name="description"></div>
    <button @click="getData">点我获取内容</button>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  name: "Vditor",
  data() {
    return {
      contentEditor: "",
    };
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 500,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.contentEditor.setValue("hello,Vditor+Vue!");
      },
    });
  },
  methods: {
    getData() {
      console.log(this.contentEditor.getValue());
    },
  },
};
</script>

<style>
</style>