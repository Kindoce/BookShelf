<template>
  <div style="height: 97vh">
    <div class="toggle-aside" @click="toggleAside">
      <!-- <i class="el-icon-menu"></i> -->
      <img src="../assets/apple.png" alt="" style="height: 30px" />
      <img
        src="../assets/girl.png"
        alt=""
        style="height: 40px; margin-left: 40px"
        v-show="asideWidth === '200px'"
      />
    </div>
    <el-menu
      router
      style="height: 88vh; padding-top: 10px"
      default-active="/index/search"
    >
      <el-menu-item
        index="/index/search"
        @click="changeBackgroundColor(1)"
        :style="{ backgroundColor: itemBackgroundColor[1] }"
      >
        <i class="el-icon-search"></i>
        <span v-show="asideWidth === '200px'">搜索</span>
      </el-menu-item>
      <el-menu-item
        index="/index/reading"
        @click="changeBackgroundColor(2)"
        :style="{ backgroundColor: itemBackgroundColor[2] }"
      >
        <i class="el-icon-reading"></i>
        <span v-show="asideWidth === '200px'">阅读</span>
      </el-menu-item>
      <el-menu-item
        index="/index/bookshelf"
        @click="changeBackgroundColor(3)"
        :style="{ backgroundColor: itemBackgroundColor[3] }"
      >
        <img src="../assets/bookshelf.png" alt="" style="height: 20px" />
        <span v-show="asideWidth === '200px'" style="margin-left: 17px"
          >书架</span
        >
      </el-menu-item>
      <el-menu-item
        index="/index/setting"
        @click="changeBackgroundColor(4)"
        :style="{ backgroundColor: itemBackgroundColor[4] }"
      >
        <i class="el-icon-setting"></i>
        <span v-show="asideWidth === '200px'">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      // Your data here
      asideWidth: "200px",
      asideBackgroundColor: "transparent",
      itemBackgroundColor: {
        1: "",
        2: "",
        3: "",
        4: "",
      },
    };
  },
  methods: {
    // Your methods here
    toggleAside() {
      if (this.asideWidth === "200px") {
        this.asideWidth = "70px";
        this.asideBackgroundColor = "transparent";
      } else {
        this.asideWidth = "200px";
        this.asideBackgroundColor = "transparent";
      }
    },
    changeBackgroundColor(index) {
      this.itemBackgroundColor = {
        1: "",
        2: "",
        3: "",
        4: "",
      };
      this.itemBackgroundColor[index] = "rgb(75, 75, 75)";
    },
  },
  mounted() {
    // Your mounted hook code here
    this.$emit("update", {
      width: this.asideWidth,
      backgroundColor: this.asideBackgroundColor,
    });
  },
  watch: {
    asideWidth(newVal) {
      this.$emit("update", {
        width: newVal,
        backgroundColor: this.asideBackgroundColor,
      });
    },
    asideBackgroundColor(newVal) {
      this.$emit("update", {
        width: this.asideWidth,
        backgroundColor: newVal,
      });
    },
  },
};
</script>

<style>
.el-container {
  flex: 1;
}

.el-header {
  /* BEGIN: Remove this line to remove the header */
  display: none;
  /* END: Remove this line to remove the header */
}

.el-aside {
  /* BEGIN: Adjust the margin-top to compensate for the removed header */
  margin-top: 0px;
  /* END: Adjust the margin-top to compensate for the removed header */
}

.nav {
  margin-top: 0px;
}

.nav-item {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
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

span {
  margin-left: 10px;
}
</style>

