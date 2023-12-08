<template>
  <div v-if="showSetting" class="setting" :style="customStyle">
    <!-- <img src="../assets/cd.jpg" alt="" style="width: 250px" /> -->
    <div>
      <span
        class="demonstration"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
        "
        >字体大小</span
      >
      <el-slider
        v-model="readSetting.font_size"
        :step="2"
        :max="30"
        :min="10"
        :marks="marks"
        style="left: 45%; margin-right: 10px; margin-top: 5px"
      >
      </el-slider>
    </div>

    <div style="height: 50px">
      <span
        class="demonstration"
        style="display: flex; align-items: center; justify-content: center"
        >左右间距</span
      >
      <el-slider
        v-model="readSetting.padding_size"
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
        v-model="readSetting.font_family"
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
        v-model="readSetting.bg_color"
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
        v-model="readSetting.zt_color"
        show-alpha
        :predefine="predefineColors"
      >
      </el-color-picker>
    </div>
    <div
      class="color-picker-container"
      style="display: flex; justify-content: center; align-items: center"
      v-show="showfrush"
    >
      <span class="demonstration" style="margin-right: 30px">恢复默认设置</span>
      <el-button type="danger" @click="reFlush" round size="samll"
        >恢复</el-button
      >
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
    showfrush: {
      type: Boolean,
      default: true,
    },
    customStyle: Object,
    readSetting: {
      type: Object,
      default: () => {
        return {
          font_size: 18,
          padding_size: 10,
          font_family: "SimSun",
          bg_color: "#ffffff",
          zt_color: "#000000",
        };
      },
    },
  },
  data() {
    return {
      // Your data properties here
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
    reFlush() {
      this.readSetting.font_size = 18;
      this.readSetting.padding_size = 10;
      this.readSetting.font_family = "SimSun";
      this.readSetting.bg_color = "#ffffff";
      this.readSetting.zt_color = "#000000";
    },
  },
  mounted() {
    // Your mounted hook code here
  },
  watch: {
    readSetting: {
      handler: function (newVal, oldVal) {
        this.$emit("update", newVal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* Your component styles here */
.setting > * {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
