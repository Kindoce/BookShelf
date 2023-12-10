<template>
  <div>
    <!-- Your code here -->

    <el-table
      :data="tableData"
      stripe
      border
      highlight-current-row
      :header-cell-style="{ background: '#f3f6fd', color: '#555' }"
      size="small"
      style="padding-left: 5px; margin-right: auto; width: 1200px"
      v-show="tableData.length > 0"
      @cell-click="nameClickHandler"
    >
      <el-table-column prop="coverUrl" label="封面" width="90" align="center">
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
      <el-table-column prop="author" label="作者" width="120" align="center">
      </el-table-column>
      <!-- <el-table-column prop="bookUrl" label="书Url" width="250">
      </el-table-column> -->
      <el-table-column
        prop="lastChapter"
        label="最后一章"
        width="190"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="words" label="字数" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="最后更新时间"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="curChapter"
        label="当前阅读"
        width="190"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="bookSource_family"
        label="书源"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除吗？"
            @confirm="delBook(scope.row)"
            style="margin-left: 5px"
          >
            <el-button slot="reference" size="small" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BookShelf",
  data() {
    return {
      // Your data here
      tableData: [],
      bookInfo: {},
    };
  },
  methods: {
    // Your methods here
    async getMyBook() {
      const url = this.$httpUrl + "/fetchBookList";
      const response = await this.$axios.get(url);
      this.tableData = response.data;
    },
    nameClickHandler(row, column, cell, event) {
      // do something with row
      if (column.label === "书名") {
        this.$store.commit("setSelectedRow", row);
        this.$store.commit("setSelectedBookSource", row.bookSource_family);
        this.$router.push("/reading");
      }
    },
    async delBook(row) {
      console.log("Delete clicked:", row);
      try {
        const url = this.$httpUrl + "/saveBook?val=delete";
        this.bookInfo = Object.assign({}, row);
        const response = await this.$axios.post(url, this.bookInfo);
        this.getMyBook();
      } catch (error) {
        console.error(`Error :`, error);
      }
    },
  },
  activated() {
    this.$store.commit("setSelectedMenu", "/bookshelf");
    this.getMyBook();
  },
  mounted() {
    // Your mounted code here
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
