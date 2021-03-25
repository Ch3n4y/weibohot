<template>
  <el-main>
    <h1>{{ title }}</h1>
    <v-chart
      :auto-resize="true"
      :options="orgOptions"
      ref="echarts1"
      theme="ovilia-green"
      v-loading="btndisable"
      class="my-chart"
    />
    <el-button round class="back" @click="returnPage">返回</el-button>
    <el-button round class="detail" @click="toWeibo" :disabled="btndisable">详情</el-button
    >
  </el-main>
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
      orgOptions: {},
      uuid: this.$route.params.uuid,
      title: "",
      btndisable: true,
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
    toWeibo: function () {
      let toPC = "https://s.weibo.com/weibo?q=" + this.title + "&Refer=top";
      let toMobile = "https://m.weibo.cn/p/100103type=1&q=" + this.title;
      let p = navigator.platform;
      if (
        p == "Win32" ||
        p == "Win64" ||
        p == "MacPPC" ||
        p == "MacIntel" ||
        p == "X11" ||
        p == "Linux i686"
      ) {
        window.open(toPC, "_blank");
      } else {
        window.open(toMobile, "_blank");
      }
    },
    rederEchart: function () {
      let starList = [];
      let timeList = [];
      this.orgOptions = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        lineStyle: {
          color: "rgba(124, 181, 236)",
        },
        itemStyle: {
          color: "rgba(124, 181, 236)",
        },
        legend: {},
        xAxis: {
          axisLine: { onZero: false },
          boundaryGap: false,
          data: timeList,
          name: "时间",
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
      this.axios
        .get("/one/" + this.uuid)
        .then((response) => {
          var data = response.data.data;
          data.data.forEach((item) => {
            starList.push(item.star / 10000);
            timeList.push(this.$dayjs.unix(item.time).format("MM-DD HH:mm:ss"));
          });
          this.orgOptions.series.data = starList;
          this.orgOptions.xAxis.data = timeList;
          this.title = data.title;
          this.btndisable = false;
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
};
</script>
<style>
.my-chart {
  width: 100%;
}
.back,
detail {
  margin: 20px 0 20px 10px;
}
</style>
