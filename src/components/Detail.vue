<template>
  <div class="body">
    <h1>{{ title }}</h1>
    <v-chart
      :auto-resize="true"
      :options="line"
      ref="echarts1"
      class="my-chart"
    />
        <router-link to="/" class="backBtn" tag="span">返回</router-link>

  </div>
</template>
<script>
import Echarts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/axis";
import "echarts/lib/component/dataZoom";

export default {
  name: "App",
  components: {
    "v-chart": Echarts,
  },
  data: function () {
    return {
      line: {},
      uuid: this.$route.params.uuid,
      title: ""
    };
  },
  methods: {
    returnPage: function () {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    creatEcharts: function (data) {
      this.title = data.title;
      let starList = [];
      let timeList = [];
      data.data.forEach((item) => {
        starList.push(item.star / 10000);
        timeList.push(this.$dayjs.unix(item.time).format("MM-DD HH:mm:ss"));
      });
      this.line = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {},
        xAxis: {
          axisLine: { onZero: false },
          boundaryGap: false,
          data: timeList,
        },
        yAxis: {
          name: "热度(万)",
          type: "value",
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        series: [
          {
            name: "热度",
            type: "line",
            data: starList,
          },
        ],
      };
    },
    rederEchart: function () {
      this.axios
        .get("http://wb-api.chaney.top/one/" + this.uuid)
        .then((response) => {
          var data = response.data.data;
          this.creatEcharts(data);
          this.$notify({
            title: "请求成功",
            message: "数据加载成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$notify({
            title: "系统错误",
            message: error,
            type: "error",
          });
        });
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.echarts1) {
        this.$refs.echarts1.resize();
      }
    },
  },
  mounted: function () {
    this.rederEchart();
    window.addEventListener("resize", this.resizeTheChart);
  },
  watch: {
    // uuid:function(newuuid,olduuid){
    //   this.rederEchart();
    // }
  },
};
</script>
<style>
.my-chart {
  width: 100%;
}
.body{
  text-align: center;
}
.backBtn {
  text-align: center;
  display: inline-block;
  color: #716d6d;
  margin-bottom: 20px;
  margin-top: 20px;

  padding: 15px 30px;
  border: 1px solid #675959;
  border-radius: 5px;
  cursor: pointer;
}
</style>
