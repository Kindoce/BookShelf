<template>
  <div class="app" :style="{ backgroundColor: bg_color }">
    <el-container style="height: 97vh">
      <el-aside
        width="200px"
        :style="{
          width: asideWidth,
          height: '97vh',
        }"
      >
        <Aside @update="updateAside"></Aside>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view @update="handleUpdateStyle"></router-view>
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
    return { asideWidth: "", bg_color: "#ffffff" };
  },
  methods: {
    updateAside(data) {
      this.asideWidth = data.width;
    },
    handleUpdateStyle(data) {
      this.bg_color = data.bg_color;
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
}

.toggle-aside i {
  font-size: 20px;
}
</style>
