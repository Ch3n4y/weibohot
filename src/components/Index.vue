<template>
  <div class="body">
    <el-table :data="currentData" style="width: 100%">
      <el-table-column prop="title" label="关键词" width=""> </el-table-column>
      <el-table-column prop="star" label="热度" width="">
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间"> </el-table-column>
      <el-table-column prop="end_time" label="上次更新"> </el-table-column>
      <el-table-column label="操作" >
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
      :page-count="7"
      :total="5000"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      currentPage: 1,
      pagesize: 28,
      currentData: [],
    };
  },
  methods: {
    handleCurrentChange: function (page) {
      this.rederPage(page);
    },
    handleClick: function (index) {
      // console.log(index)
      this.$router.push({
        name: "detail",
        params: { uuid: this.currentData[index].uuid },
      });
    },
    rederPage: function (page) {
      if (page == undefined || page <= 0) {
        page = 1;
      }
      this.axios
        .get("http://wb-api.chaney.top/list/" + page)
        .then((response) => {
          var data = response.data.data;
          data.forEach((element, index) => {
            data[index].star = parseInt(data[index].star / 1000);
            data[index].start_time = this.$dayjs
              .unix(data[index].start_time)
              .format("YYYY-MM-DD HH:mm:ss");
            data[index].end_time = this.dispose(data[index].end_time * 1000);
          });
          this.currentData = data;
        })
        .catch((error) => {
          this.$notify({
            title: "系统错误",
            message: error,
            type: "error",
          });
        });
    },
    dispose: function (dateTimeStamp) {
      var minute = 1000 * 60;

      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;
      var result = "";
      if (diffValue < 0) {
        return;
      }
      var minC = diffValue / minute;
      var hourC = diffValue / hour;
      var dayC = diffValue / day;
      var weekC = diffValue / week;
      var monthC = diffValue / month;
      if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前";
      } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前";
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚";
      } else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth =
          datetime.getMonth() + 1 < 10
            ? "0" + (datetime.getMonth() + 1)
            : datetime.getMonth() + 1;
        var Ndate =
          datetime.getDate() < 10
            ? "0" + datetime.getDate()
            : datetime.getDate();
        var Nhour =
          datetime.getHours() < 10
            ? "0" + datetime.getHours()
            : datetime.getHours();
        var Nminute =
          datetime.getMinutes() < 10
            ? "0" + datetime.getMinutes()
            : datetime.getMinutes();
        var Nsecond =
          datetime.getSeconds() < 10
            ? "0" + datetime.getSeconds()
            : datetime.getSeconds();
        result = Nyear + "年" + Nmonth + "月" + Ndate + "日";
      }
      return result;
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