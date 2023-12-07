<template>
  <div class="app">
    <el-container style="height: 97vh">
      <el-aside
        width="200px"
        :style="{
          backgroundColor: asideBackgroundColor,
          width: asideWidth,
          height: '97vh',
        }"
      >
        <Aside @update="updateAside"></Aside>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
export default {
  name: "Index",
  components: {
    // Your components here
    Aside,
  },
  data() {
    return { asideWidth: "", asideBackgroundColor: "" };
  },
  methods: {
    updateAside(data) {
      this.asideWidth = data.width;
      this.asideBackgroundColor = data.backgroundColor;
    },
  },
};
</script>

        <style>
.app {
  height: 97vh;
  display: flex;
  flex-direction: row;
}

.el-container {
  flex: 1;
}

.el-aside {
  /* BEGIN: Adjust the margin-top to compensate for the removed header */
  margin-top: 0px;
  /* END: Adjust the margin-top to compensate for the removed header */
}

.el-main {
  height: 98vh;
  position: relative;
}

.nav {
  margin-top: 0px;
}

.nav-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.nav-item i {
  margin-right: 10px;
}

.toggle-aside {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  background-color: #f5f7fa;
}

.toggle-aside i {
  font-size: 20px;
}
</style>
