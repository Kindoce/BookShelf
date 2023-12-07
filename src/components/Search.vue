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
    <el-button type="primary" @click="getBookList">搜索</el-button>
    <el-button type="primary" @click="test">Test</el-button>

    <el-table
      :data="tableData"
      stripe
      border
      :header-cell-style="{ background: '#f3f6fd', color: '#555' }"
      size="small"
      style="
        padding-left: 5px;
        margin-right: auto;
        width: 1100px;
        margin-top: 10px;
      "
      v-show="tableData.length > 0"
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
      <el-table-column prop="name" label="书名" width="180" align="center">
        <template slot-scope="scope">
          <div @click="nameClickHandler(scope.row)">{{ scope.row.name }}</div>
        </template></el-table-column
      >
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
    };
  },
  methods: {
    // Add your component methods here
    async postUrl(url, rule) {
      try {
        const toServerUrl = this.$httpUrl + "/postData?url=" + url;
        const response = await this.$axios.post(toServerUrl, rule);
        return response.data;
      } catch (error) {
        console.error(`Error posting URL: ${url}`, error);
        return null;
      }
    },
    getBookList() {
      const url =
        "http://www.zwduxs.com/modules/article/search.php?searchkey=" +
        this.book_name +
        "&searchtype=articlename";
      var ruleSearch = {
        author: "tag.td.2@text",
        bookList: "class.grid@tag.tr!0",
        bookUrl: "tag.td.0@tag.a@href",
        coverUrl:
          "tag.td.0@tag.a@href<js>\nvar id = result.match(/(\\d+)\\/?$/)[1];\nvar iid = parseInt(id/1000);\n'http://www.zwduxs.com/files/article/image/'+iid+'/'+id+'/'+id+'s.jpg';\n</js>",
        lastChapter: "tag.td.1@tag.a@text",
        name: "tag.td.0@tag.a@text##\\（.*|\\(.*|免费阅读|全文.*阅读|最新章节|笔趣阁|小说",
      };
      this.postUrl(url, ruleSearch).then((res) => {
        this.tableData = res;
      });
    },
    nameClickHandler(row) {
      // do something with row
      this.$store.commit("setSelectedRow", row);
      this.$router.push("/reading");
    },
    test() {
      let books = ["天才", "小心", "穷鬼"];
      let i = 0;
      let intervalId = setInterval(() => {
        this.book_name = books[i];
        console.log(this.book_name);
        this.getBookList();
        i++;
        if (i >= books.length) {
          clearInterval(intervalId);
        }
      }, 5000);
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
