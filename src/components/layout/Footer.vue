<template>
  <el-footer class="main-footer">
    Copyright &copy; {{ year }} Ch3n4y. All rights reserved.
  </el-footer>
</template>
<script>
export default {
  data: function () {
    return {
      year: 2020,
    };
  },
  methods: {},
  mounted() {
    let nowDate = new Date();
    this.year = nowDate.getFullYear()
  }
}
</script>
<style>
.main-footer {
  -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  text-align: center;
  padding: 5px 15px;
  color: #444;
  width: 100%;
}
</style>
