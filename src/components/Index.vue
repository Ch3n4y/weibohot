<template>
  <div class="body">
    <div ref="content">
      <el-row>
        <el-col v-for="o in currentData" :key="o.uuid" class="v-card">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span @click="detail(o.uuid)" class="v-card-title">{{
                o.title.slice(0, 14)
              }}</span>
            </div>
            <div class="text item">最高热度：{{ o.star / 10000 }} 万</div>
            <div class="text item">
              开始时间：{{
                $dayjs.unix(o.start_time).format("YYYY-MM-DD HH:mm:ss")
              }}
            </div>
            <div class="text item">
              上次更新：{{ dispose(o.end_time * 1000) }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div ref="pagination">
      <el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="7"
          :total="5000"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-row>
    </div>
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
    detail: function (uuid) {
      this.$router.push({ name: "detail", params: { uuid: uuid } });
    },
    rederPage: function (page) {
      console.log(this.$refs);
      if (page == undefined || page <= 0) {
        page = 1;
      }
      this.axios
        .get("http://wb-api.chaney.top/list/" + page)
        .then((response) => {
          var data = response.data.data;
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
.body {
}

.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.v-card {
  width: 280px !important;
  margin: 5px 5px 5px 5px;
}
.v-card-title {
  cursor: pointer;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>