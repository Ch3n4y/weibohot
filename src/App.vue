<template>
  <div id="app">
    <AppHeader />
    <el-main>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
      </router-view>
    </el-main>
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from "./components/layout/Header.vue";
import AppFooter from "./components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>