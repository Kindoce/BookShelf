<template>
  <div v-if="showSetting" class="setting">
    <!-- <img src="../assets/cd.jpg" alt="" style="width: 250px" /> -->
    <div>
      <span class="demonstration" style="margin-left: 120px; margin-top: 30px"
        >字体大小</span
      >
      <el-slider
        v-model="font_size"
        :step="2"
        :max="30"
        :min="10"
        :marks="marks"
        style="margin-left: 10px; margin-right: 10px; margin-top: 5px"
      >
      </el-slider>
    </div>

    <div style="height: 50px">
      <span class="demonstration" style="margin-left: 120px; margin-top: 80px"
        >左右间距</span
      >
      <el-slider
        v-model="padding_size"
        :step="10"
        :max="100"
        :min="0"
        :marks="marks2"
        style="margin-left: 10px; margin-right: 10px"
      >
      </el-slider>
    </div>

    <div
      class="font-selector"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
      "
    >
      <span class="demonstration" style="margin-left: 10px">字体选择</span>
      <el-select
        v-model="font_family"
        placeholder="请选择字体"
        style="margin-right: 10px; margin-left: 10px"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div
      class="color-picker-container"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      <span class="demonstration" style="margin-right: 30px">背景颜色</span>
      <el-color-picker
        v-model="bg_color"
        show-alpha
        :predefine="predefineColors"
      >
      </el-color-picker>
    </div>
    <div
      class="color-picker-container"
      style="display: flex; justify-content: center; align-items: center"
    >
      <span class="demonstration" style="margin-right: 30px">字体颜色</span>
      <el-color-picker
        v-model="zt_color"
        show-alpha
        :predefine="predefineColors"
      >
      </el-color-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadSet",
  props: {
    // Your props here
    showSetting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Your data properties here
      font_size: 18,
      padding_size: 10,
      font_family: "SimSun",
      bg_color: "#ffffff",
      zt_color: "#000000",
      add: false,
      marks: {
        10: "10",
        12: "12",
        14: "14",
        16: "16",
        18: "18",
        20: "20",
        22: "22",
        24: "24",
        26: "26",
        28: "28",
        30: "30",
      },
      marks2: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      options: [
        {
          value: "Microsoft YaHei",
          label: "微软雅黑",
        },
        {
          value: "SimSun",
          label: "宋体",
        },
        {
          value: "SimHei",
          label: "黑体",
        },
        {
          value: "KaiTi",
          label: "楷体",
        },
        {
          value: "FangSong",
          label: "仿宋",
        },
      ],
      predefineColors: ["#ff4949", "#13ce66", "#f7ba2a", "#f56a00", "#7265e6"],
    };
  },
  methods: {
    // Your methods here
  },
  mounted() {
    // Your mounted hook code here
  },
  watch: {
    font_size(newVal) {
      this.$emit("update", {
        font_size: newVal,
        padding_size: this.padding_size,
        font_family: this.font_family,
        bg_color: this.bg_color,
        zt_color: this.zt_color,
        add: this.add,
      });
    },
    padding_size(newVal) {
      this.$emit("update", {
        padding_size: newVal,
        font_size: this.font_size,
        font_family: this.font_family,
        bg_color: this.bg_color,
        zt_color: this.zt_color,
        add: this.add,
      });
    },
    font_family(newVal) {
      this.$emit("update", {
        font_family: newVal,
        font_size: this.font_size,
        padding_size: this.padding_size,
        bg_color: this.bg_color,
        zt_color: this.zt_color,
        add: this.add,
      });
    },
    bg_color(newVal) {
      this.$emit("update", {
        bg_color: newVal,
        font_size: this.font_size,
        padding_size: this.padding_size,
        font_family: this.font_family,
        zt_color: this.zt_color,
        add: this.add,
      });
    },
    zt_color(newVal) {
      this.$emit("update", {
        zt_color: newVal,
        font_size: this.font_size,
        padding_size: this.padding_size,
        font_family: this.font_family,
        bg_color: this.bg_color,
        add: this.add,
      });
    },
    add(newVal) {
      this.$emit("update", {
        add: newVal,
        font_size: this.font_size,
        padding_size: this.padding_size,
        font_family: this.font_family,
        bg_color: this.bg_color,
        zt_color: this.zt_color,
      });
    },
    // Your watch properties here
  },
};
</script>

<style scoped>
/* Your component styles here */
.setting {
  position: absolute;
  top: 40px;
  right: 0;
  width: 300px; /* adjust as needed */
  height: 70vh; /* adjust as needed */
  background-color: white; /* semi-transparent background */
  /* other styles as needed */
  z-index: 1; /* make sure it's above the content */
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add shadow to the setting */
}
.setting > * {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
