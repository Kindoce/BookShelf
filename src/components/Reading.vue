<template>
  <div class="reading">
    <!-- Your template code here -->
    <div class="icon-container">
      <img
        src="../assets/beer.png"
        alt=""
        style="height: 40px"
        class="img1"
        @click="toggleDirectory"
      />
      <div class="span1" v-html="curChapter" :style="spanStyle"></div>
      <div class="span2" v-html="bookdData.name" :style="spanStyle"></div>
      <img
        src="../assets/setting.png"
        alt=""
        style="height: 20px"
        class="img2"
        @click="toggleSetting"
      />
    </div>
    <div v-if="showDirectory" class="directory">
      <!-- Directory content here -->
      <div style="height: 90vh; overflow-y: auto">
        <el-table
          height="90vh"
          :data="chapterlist"
          style="width: 250px; border-radius: 0 10px 10px 0"
        >
          <el-table-column>
            <template slot="header">
              <span style="margin-right: 60px">章节</span>
              <el-button
                type="primary"
                icon="el-icon-refresh-right"
                @click="getChapterList"
                round
                >刷新</el-button
              >
            </template>
            <template slot-scope="scope">
              <div @click="chapterClickHandler(scope.row)">
                {{ scope.row.chapterName }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <ReadSet
      :showSetting="showSetting"
      ref="setting"
      @update="handleUpdateData"
    ></ReadSet>
    <div
      class="content"
      v-html="content"
      :style="contentStyle"
      ref="content"
    ></div>
    <div class="footer">
      <el-button
        type="primary"
        @click="getUpperChapter"
        size="small"
        round
        class="btn0"
        >上一章</el-button
      >
      <el-button
        type="primary"
        @click="getNextChapter"
        size="small"
        round
        class="btn1"
        >下一章</el-button
      >
    </div>
  </div>
</template>

<script>
import ReadSet from "./ReadSet.vue";
export default {
  name: "Reading",
  components: {
    // Your components here
    ReadSet,
  },
  data() {
    return {
      // Your data properties here
      bookdData: this.$store.state.selectedRow,
      showDirectory: false,
      showSetting: false,
      chapterlist: [],
      bookInfo: {},
      content: "",
      curUrl: "",
      curChapter: "",
      font_size: 18,
      bg_color: "#ffffff",
      zt_color: "#000000",
      padding_size: 10,
      font_family: "SimSun",
    };
  },
  methods: {
    // Your methods here
    toggleDirectory() {
      this.showDirectory = !this.showDirectory;
    },
    toggleSetting() {
      this.showSetting = !this.showSetting;
    },
    async postChapterUrl(chapterUrl, rule) {
      try {
        const toServerUrl = this.$httpUrl + "/postChapter?url=" + chapterUrl;
        const response = await this.$axios.post(toServerUrl, rule);
        return response.data;
      } catch (error) {
        console.error(`Error posting URL: ${chapterUrl}`, error);
        return null;
      }
    },
    getChapterList() {
      const url = this.bookdData.bookUrl;
      this.postChapterUrl(url, { url }).then((data) => {
        this.chapterlist = data;
      });
    },
    chapterClickHandler(row) {
      this.curUrl = row.chapterUrl;
      this.curChapter = row.chapterName;
      this.getChapterContent();
    },
    async postChapterContent(conUrl, rule) {
      try {
        const toServerUrl =
          this.$httpUrl +
          "/postChapterContent?url=" +
          "http://www.zwduxs.com" +
          conUrl;
        const response = await this.$axios.post(toServerUrl, rule);
        this.addToBookShelf("add");
        return response.data;
      } catch (error) {
        console.error(`Error posting URL: ${conUrl}`, error);
        return null;
      }
    },
    getChapterContent() {
      const url = this.curUrl;
      this.postChapterContent(url, { url }).then((data) => {
        data = data
          .replace(/\s{2,}/g, "\n\n")
          .replace(/\n/g, "<br>&nbsp;&nbsp;");
        this.content = data;
        this.$nextTick(() => {
          this.$refs.content.scrollTop = 0; // Scroll to top
        });
      });
    },
    getNextChapter() {
      let index = this.chapterlist.findIndex(
        (item) => item.chapterUrl === this.curUrl
      );
      if (index < this.chapterlist.length - 1) {
        this.curUrl = this.chapterlist[index + 1].chapterUrl;
        this.curChapter = this.chapterlist[index + 1].chapterName;
        this.getChapterContent();
      } else {
        this.$message({
          message: "已经是最后一章了",
          type: "warning",
        });
      }
    },
    getUpperChapter() {
      let index = this.chapterlist.findIndex(
        (item) => item.chapterUrl === this.curUrl
      );
      if (index > 0) {
        this.curUrl = this.chapterlist[index - 1].chapterUrl;
        this.curChapter = this.chapterlist[index - 1].chapterName;
        this.getChapterContent();
      } else {
        this.$message({
          message: "已经是第一章了",
          type: "warning",
        });
      }
    },
    async addToBookShelf(val) {
      try {
        const url = this.$httpUrl + "/saveBook?val=" + val;
        this.bookInfo = Object.assign({}, this.bookdData);
        this.bookInfo.curUrl = this.curUrl;
        this.bookInfo.curChapter = this.curChapter;
        this.bookInfo.chapterIndex = this.chapterlist.findIndex(
          (item) => item.chapterUrl === this.curUrl
        );
        const response = await this.$axios.post(url, this.bookInfo);
        if (val === "find") {
          this.add = response.data.found;
          this.bookInfo = response.data.item;
        }

        if (val === "add") {
          this.add = true;
        }
      } catch (error) {
        console.error(`Error :`, error);
      }
    },
    handleUpdateData(newVal) {
      this.font_size = newVal.font_size;
      this.bg_color = newVal.bg_color;
      this.zt_color = newVal.zt_color;
      this.padding_size = newVal.padding_size;
      this.font_family = newVal.font_family;
    },
  },
  activated() {
    // Your activated hook code here

    this.$store.commit("setSelectedMenu", "/reading");
    if (this.$route.query.plan === "fromAside") {
      return;
    }
    this.bookdData = this.$store.state.selectedRow;
    if (this.bookdData != null) {
      this.addToBookShelf("find");
      this.getChapterList();
    }
  },
  watch: {
    chapterlist: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          if (!this.add) {
            this.curUrl = newVal[0].chapterUrl;
            this.curChapter = newVal[0].chapterName;
            this.getChapterContent();
          } else {
            this.curUrl = this.bookInfo.curUrl;
            this.curChapter = this.bookInfo.curChapter;
            this.getChapterContent();
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    contentStyle() {
      return {
        fontSize: this.font_size + "px",
        backgroundColor: this.bg_color,
        color: this.zt_color,
        paddingLeft: this.padding_size * 5 + "px", // 设置左偏移
        paddingRight: this.padding_size * 5 + "px", // 设置右偏移
        fontFamily: this.font_family,
      };
    },
    spanStyle() {
      return {
        fontSize: "18px",
        color: this.zt_color,
        fontFamily: this.font_family,
      };
    },
  },
};
</script>

<style scoped>
/* Your component styles here */
.reading {
  position: relative;
}
.icon-container {
  position: relative;
  /* other styles... */
}

.icon-container .img1 {
  position: absolute;
  left: 0;
  /* other styles... */
}
.icon-container .img2 {
  position: absolute;
  left: 95%;
  /* other styles... */
}

.icon-container .span1 {
  position: absolute;
  left: 45%;
  transform: translateX(-50%);
  /* other styles... */
}
.icon-container .span2 {
  position: absolute;
  left: 85%;
  transform: translateX(-50%);
  /* other styles... */
}
.content {
  position: relative;
  top: 55px;
  z-index: 0;
  height: 82vh;
  overflow-y: auto;
}
.footer {
  position: relative;
  top: 60px;
  z-index: 0;
  height: 5vh;
  align-content: center;
  overflow-y: auto;
}
.footer span {
  position: absolute;
  left: 40%;
  /* other styles... */
}
.footer .btn1 {
  position: absolute;
  left: 80%;
  /* other styles... */
}
.footer .btn0 {
  position: absolute;
  left: 5%;
  /* other styles... */
}
.directory {
  position: absolute;
  top: 40px;
  right: 0;
  width: 100%; /* adjust as needed */
  height: 100%; /* adjust as needed */
  background-color: rgba(10, 10, 10, 0.1); /* semi-transparent background */
  /* other styles as needed */
  z-index: 1; /* make sure it's above the content */
}
</style>
