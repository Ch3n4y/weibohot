<template>
  <el-main>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      @keyup.enter.native="onSubmit"
    >
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
    <el-table :data="currentData" v-loading="showloading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="关键词" sortable> </el-table-column>
      <el-table-column prop="star" label="热度(万)" sortable width="100">
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" sortable>
      </el-table-column>
      <el-table-column prop="end_time" label="上次更新" sortable>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleClick(scope.row.uuid)"
            size="small"
            round
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
      showloading: true,
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
    handleClick: function (uuid) {
      this.$router.push({
        name: "detail",
        params: { uuid: uuid },
      });
    },
    datato: function (data) {
      data.forEach((element, index) => {
        data[index].star = parseInt(data[index].star / 10000);
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
        .get("/list/" + page)
        .then((response) => {
          this.currentData = this.datato(response.data.data);
          this.total = response.data.total;
          this.showloading = false;
        })
        .catch((error) => {
          this.$notify({
            title: "系统错误",
            message: error,
            type: "error",
          });
        });
    },
    handleCurrentChange: function (page) {
      this.loading();
      this.rederPage(page);
    },
    onSubmit: function () {
      this.loading();
      if (!this.formInline.date && !this.formInline.keyword) {
        this.rederPage(1);
        return;
      }
      this.axios
        .post("/search", this.formInline)
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
          this.showloading = false;
        })
        .catch((error) => {
          this.$notify({
            title: "系统错误",
            message: error,
            type: "error",
          });
        });
    },
    loading: function () {
      this.currentData = [];
      this.showloading = true;
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
.el-table {
  margin: 0 auto;
}
@media screen and (min-width: 990px) {
  .el-table {
    width: 60%;
  }
}
</style>