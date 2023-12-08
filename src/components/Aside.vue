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

    <div style="height: 88vh; padding-top: 10px">
      <div
        v-for="(menuItem, key) in menuItems"
        :key="key"
        class="menu"
        @click="menuClickhandler(menuItem.path)"
        :style="menuItem.style"
      >
        <i :class="menuItem.icon"></i>
        <span v-show="asideWidth === '200px'">{{ menuItem.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
export default {
  name: "Aside",
  data() {
    return {
      // Your data here
      menuItems: [
        {
          name: "搜索",
          icon: "el-icon-search",
          path: "/search",
        },
        {
          name: "阅读",
          icon: "el-icon-reading",
          path: "/reading",
        },
        {
          name: "书架",
          icon: "el-icon-collection",
          path: "/bookshelf",
        },
        {
          name: "设置",
          icon: "el-icon-setting",
          path: "/setting",
        },
      ],
      asideWidth: "200px",
    };
  },
  methods: {
    // Your methods here
    toggleAside() {
      if (this.asideWidth === "200px") {
        this.asideWidth = "50px";
      } else {
        this.asideWidth = "200px";
      }
    },
    menuClickhandler(toPath) {
      if (this.$route.path === toPath) return;
      this.$router.push({ path: toPath, query: { plan: "fromAside" } });
    },
  },
  mounted() {
    // Your mounted hook code here
    this.$emit("update", {
      width: this.asideWidth,
    });
  },
  created() {
    this.menuItems.forEach((item, key) => {
      this.$set(item, "style", {
        backgroundColor: "#ffffff",
        color: "#000000",

        borderRadius: "2px 25px 25px 2px",
      });
    });
  },
  computed: {
    ...mapState({
      activedMenu: (state) => state.selectedMenu,
    }),
  },
  watch: {
    asideWidth(newVal) {
      this.$emit("update", {
        width: newVal,
      });
    },
    activedMenu(newVal) {
      this.menuItems.forEach((item) => {
        if (item.path === newVal) {
          this.$set(item, "style", {
            backgroundColor: "rgb(75,75,75)",
            color: "#ffffff",

            borderRadius: "2px 25px 25px 2px",
          });
        } else {
          this.$set(item, "style", {
            backgroundColor: "#ffffff",
            color: "#000000",

            borderRadius: "2px 25px 25px 2px",
          });
        }
      });
    },
  },
};
</script>

<style>
.el-container {
  flex: 1;
}

.menu {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 15px;
  cursor: pointer;
}

.menu i {
  margin-left: 20px;
  margin-right: 20px;
}

.menu span {
  margin-left: 10px;
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
  background-color: #ffffff;
}

.toggle-aside i {
  font-size: 20px;
}

span {
  margin-left: 10px;
}
</style>

