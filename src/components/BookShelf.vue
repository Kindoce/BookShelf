<template>
  <div>
    <!-- Your code here -->

    <el-table
      :data="tableData"
      stripe
      border
      :header-cell-style="{ background: '#f3f6fd', color: '#555' }"
      size="small"
      style="padding-left: 5px; margin-right: auto; width: 1100px"
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
        width="270"
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
      <el-table-column
        prop="curChapter"
        label="当前阅读"
        width="200"
        align="center"
      >
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
    };
  },
  methods: {
    // Your methods here
    async getMyBook() {
      const url = this.$httpUrl + "/fetchBookList";
      const response = await this.$axios.get(url);
      this.tableData = response.data;
    },
    nameClickHandler(row) {
      console.log("Name clicked:", row);
      // do something with row
      this.$store.commit("setSelectedRow", row);
      this.$router.push("/index/reading");
    },
  },
  activated() {
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
