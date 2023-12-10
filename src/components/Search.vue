<template>
  <div>
    <h1>搜你想搜</h1>
    <p>愿你终有一天能和你最爱的的人重逢</p>
    <!-- <p>{{ html }}</p> -->
    <!-- Add your login form here -->
    <el-input
      v-model="book_name"
      placeholder="请输入书名"
      suffix-icon="el-icon-search"
      style="width: 200px; margin-right: 10px"
      @keyup.enter.native="getBookList"
    ></el-input>
    <el-select
      v-model="bookSource_family"
      placeholder="请选择书源"
      style="margin-right: 10px; margin-left: 10px"
      size="medium"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-button type="primary" @click="getBookList">搜索</el-button>

    <el-table
      :data="tableData"
      stripe
      border
      highlight-current-row
      :header-cell-style="{ background: '#f3f6fd', color: '#555' }"
      size="small"
      style="
        padding-left: 5px;
        margin-right: auto;
        width: 1100px;
        margin-top: 10px;
      "
      v-show="tableData.length > 0"
      @cell-click="nameClickHandler"
    >
      <el-table-column prop="coverUrl" label="封面" width="90">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.coverUrl" alt=""  /> -->
          <img
            :src="scope.row.coverUrl"
            alt=""
            style="height: 100px; width: 75px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="书名"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column prop="author" label="作者" width="150">
      </el-table-column>
      <!-- <el-table-column prop="bookUrl" label="书Url" width="250">
      </el-table-column> -->
      <el-table-column
        prop="lastChapter"
        label="最后一章"
        width="470"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="words" label="字数" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="最后更新时间"
        width="120"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      html: "",
      book_name: "",
      tableData: [],
      bookSource_family: "八一中文①",
      options: ["八一中文①", "📚 SF轻小说", "9x阅读器"],
    };
  },
  methods: {
    // Add your component methods here
    async getBookList() {
      try {
        const toServerUrl =
          this.$httpUrl +
          "/getSearchBook?bookName=" +
          this.book_name +
          "&bookSource=" +
          this.bookSource_family;
        const response = await this.$axios.get(toServerUrl);
        this.tableData = response.data;
      } catch (error) {
        console.error(`Error posting URL: ${url}`, error);
      }
    },
    nameClickHandler(row, column, cell, event) {
      // do something with row
      if (column.label === "书名") {
        this.$store.commit("setSelectedRow", row);
        this.$store.commit("setSelectedBookSource", this.bookSource_family);
        this.$router.push("/reading");
      }
    },
  },
  mounted() {
    // Your component mounted hook here
  },
  activated() {
    // Your component activated hook here
    this.$store.commit("setSelectedMenu", "/search");
  },
  // Your component lifecycle hooks here
};
</script>

<style scoped>
/* Your component styles here */
</style>
