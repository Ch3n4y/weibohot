<template>
  <el-main>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="搜索">
        <el-input v-model="formInline.keyword" placeholder="关键词"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="currentData" style="width: 100%" v-loading="table_loading">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="关键词" sortable> </el-table-column>
      <el-table-column prop="star" label="热度(万)" sortable> </el-table-column>
      <el-table-column prop="start_time" label="开始时间" sortable>
      </el-table-column>
      <el-table-column prop="end_time" label="上次更新" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleClick(scope.$index)"
            type="text"
            size="small"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="50"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-main>
</template>
<script>
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      currentPage: 1,
      total: 0,
      currentData: [],
      table_loading: true,
      formInline: {
        keyword: "",
        date: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    handleCurrentChange: function (page) {
      this.rederPage(page);
    },
    handleClick: function (index) {
      this.$router.push({
        name: "detail",
        params: { uuid: this.currentData[index].uuid },
      });
    },
    datato: function (data) {
      data.forEach((element, index) => {
        data[index].star = parseInt(data[index].star / 1000);
        data[index].start_time = this.$dayjs
          .unix(data[index].start_time)
          .format("YYYY-MM-DD HH:mm:ss");
        data[index].end_time = this.$dayjs
          .unix(data[index].end_time)
          .format("YYYY-MM-DD HH:mm:ss");
      });
      return data;
    },
    rederPage: function (page) {
      if (page == undefined || page <= 0) {
        page = 1;
      }
      this.axios
        .get("http://wb-api.chaney.top/list/" + page)
        .then((response) => {
          this.currentData = this.datato(response.data.data);
          this.total = response.data.total;
        })
        .catch((error) => {
          this.$notify({
            title: "系统错误",
            message: error,
            type: "error",
          });
        });
      this.table_loading = false;
    },
    onSubmit: function () {
      this.loading();
      if (!this.formInline.date && !this.formInline.keyword) {
        this.rederPage(1);
        return;
      }
      this.axios
        .post("http://wb-api.chaney.top/search", this.formInline)
        .then((response) => {
          if (response.data.code == 0) {
            this.currentData = this.datato(response.data.data);
            this.total = 0;
          } else {
            this.$notify({
              message: response.data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$notify({
            title: "系统错误",
            message: error,
            type: "error",
          });
        });
      this.table_loading = false;
    },
    loading: function () {
      this.currentData = [];
      this.table_loading = true;
      this.total = 0;
    },
  },
  mounted: function () {
    this.rederPage(self.currentPage);
  },
  activated() {},
};
</script>
<style>
.el-pagination {
  margin-top: 20px;
}
</style>