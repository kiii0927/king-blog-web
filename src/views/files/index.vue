<template>
  <div class="files">
    <Header />
    <Main />
  </div>
</template>

<script>
import Header from "./header";
import Main from "./main";
export default {
  name: "Files",
  components: {
    Header,
    Main,
  },
};
</script>

<style scoped>
.files {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>