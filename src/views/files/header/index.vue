<template>
  <header class="files-header">
    <div class="files-header__search">
      <!-- :fetch-suggestions="fetchSuggestions" -->
      <el-autocomplete
        v-model="keyword"
        placeholder="请输入内容"
        @select="handleSelect"
      >
      </el-autocomplete>
      <el-dropdown>
        <span class="el-dropdown-link">
          发布时间<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>发布时间</el-dropdown-item>
          <el-dropdown-item>浏览量</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="files-header__search-btn el-icon-search"></i>
    </div>
    <div class="files-header__filter">
      <ul class="files-header__filter-type">
        <li
          v-for="(t, index) in types"
          :class="[active == index ? 'activeColor' : '']"
          :key="index"
          @click="handleActive(index)"
        >
          {{ t }}
        </li>
      </ul>
      <div class="active" :style="styleObject"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "filesHeader",
  data() {
    return {
      keyword: "",
      types: ["全部", "前端", "后端", "游戏", "日常", "资源"],
      active: 0,
      styleObject: {
        transform: "translateX(0)",
      },
    };
  },
  methods: {
    handleSelect() {},
    handleActive(index) {
      this.active = index;
      this.styleObject.transform = "translateX(" + index * 144.1 + "%)";
    },
  },
};
</script>

<style scoped>
.files-header {
  width: 100%;
  height: 280px;
  background: #c6dfdf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.files-header .files-header__search {
  position: relative;
  width: 1200px;
  height: 55px;
  box-shadow: 0 4px 44px rgba(8, 217, 214, 0.2);
  display: flex;
}

.files-header__search .files-header__search-btn {
  width: 55px;
  height: 55px;
  background: var(--blue-color);
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.25s;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.files-header__search .files-header__search-btn:hover {
  box-shadow: 0 0 10px var(--blue-color);
}

.files-header__filter {
  position: relative;
  width: 1200px;
  padding: 20px 0;
  font-size: 18px;
}

.files-header__filter .files-header__filter-type {
  display: flex;
  gap: 32px;
  margin-bottom: 10px;
}

.files-header__filter .files-header__filter-type li {
  display: flex;
  align-items: center;
  padding: 0 18px;
  height: 40px;
  cursor: pointer;
  color: #fff;
  user-select: none;
  transition: all 0.3s;
  box-sizing: border-box;
  z-index: 2;
}
/* activeColor */
.files-header__filter .files-header__filter-type li.activeColor {
  color: #08d9d6;
}

.files-header__filter .active {
  position: absolute;
  bottom: 30px;
  width: 72px;
  height: 40px;
  background: #fff;
  border-radius: 10px;
  transition: all 0.3s;
  z-index: 1;
}
</style>

<style>
/* input */
.files-header__search .el-autocomplete {
  /* Detail：https://www.ruanyifeng.com/blog/2015/07/flex-examples.html */
  flex: 1;
}
.files-header__search .el-autocomplete .el-input {
  height: 100%;
}
.files-header__search .el-autocomplete .el-input .el-input__inner {
  height: 100%;
  border-radius: 8px;
  font-size: 18px;
}

/* dropdown */
.files-header__search .el-dropdown {
  position: absolute;
  /* 顶 14px, 搜索按钮宽 55px */
  right: calc(55px + 14px);
  top: calc((55px - 16px) / 2);
  font-size: 16px;
  color: #bbb;
}
</style>