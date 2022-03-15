<template>
  <div id="app">
    <!-- 项目骨架 -->
    <el-container>
      <el-aside width="200px" style="height: 100vh">
        <navbar />
      </el-aside>
      <el-main>
        <app-main ref="box" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: { AppMain, Navbar },
};
</script>

<style>
</style>

<style scoped lang="scss">
::v-deep.el-aside {
  overflow: initial;
  position: fixed;
  z-index: 333;
}

::v-deep.el-main {
  position: relative;
  left: 200px;
  width: calc(100vw - 200px);
  max-width: calc(100vw - 200px);
  background-color: #e9eef3;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  overflow-x: hidden;
  padding: 0;
}
</style>