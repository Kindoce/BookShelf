<template>
  <div>
    <div style="display: flex">
      <div class="readsetting" :style="ReadSetStyle">
        <h1>阅读设置</h1>
        <ReadSet
          :showSetting="showSetting"
          :showfrush="false"
          :readSetting="bookSettings"
          ref="setting"
          @update="handleUpdateData"
        ></ReadSet>
      </div>
      <div class="booksetting" style="margin-left: 5%">
        <h1>书源设置</h1>
        <el-select
          v-model="bookSource_family"
          placeholder="请选择书源"
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
    </div>
    <div>
      <el-button
        type="primary"
        round
        class="confirmBtn"
        @click="confirmBtnHandle"
        >确定更改</el-button
      >
    </div>
  </div>
</template>

<script>
import ReadSet from "./ReadSet.vue";
export default {
  name: "Setting",
  components: {
    // Your components here
    ReadSet,
  },
  data() {
    return {
      // Your data properties here
      showSetting: true,
      bookSource_family: "1",
      bookSettings: {
        font_size: 18,
        padding_size: 10,
        font_family: "SimSun",
        bg_color: "#ffffff",
        zt_color: "#000000",
      },
      ReadSetStyle: {
        position: "relative",
        top: "0",
        rleft: "0",
        width: "45%",
        height: "100%",
        background: "#fff",
      },
      options: [
        {
          value: "1",
          label: "书源1",
        },
        {
          value: "2",
          label: "书源2",
        },
        {
          value: "3",
          label: "书源3",
        },
        {
          value: "4",
          label: "书源4",
        },
      ],
    };
  },
  methods: {
    // Your methods here
    handleUpdateData(data) {
      this.bookSettings = data;
    },
    async confirmBtnHandle() {
      try {
        const url = this.$httpUrl + "/saveSettings";
        const res = await this.$axios.post(url, {
          bookSettings: this.bookSettings,
          bookSource_family: this.bookSource_family,
        });
        if (res.status === 200) {
          this.$store.commit("setSelectedBookSource", this.bookSource_family);
          this.$store.commit("setSelectedSettings", this.bookSettings);
          this.$message({
            message: "保存成功",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // Your mounted hook code here
  },
  activated() {
    // Your activated hook code here
    try {
      const url = this.$httpUrl + "/fetchSettings";
      this.$axios.get(url).then((res) => {
        if (res.status === 200) {
          this.bookSettings = res.data.bookSettings;
          this.bookSource_family = res.data.bookSource_family;
          this.$store.commit(
            "setSelectedBookSource",
            res.data.bookSource_family
          );
          this.$store.commit("setSelectedSettings", res.data.bookSettings);
        }
      });
    } catch (error) {
      console.log(error);
    }
    this.$store.commit("setSelectedMenu", "/setting");
  },
};
</script>

<style scoped>
/* Your component styles here */
.confirmBtn {
  position: relative;
  top: 60px;
  bottom: 0;
  left: 83%;
  margin-bottom: 20px;
}
</style>
