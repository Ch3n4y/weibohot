<template>
  <div id="app">
    <AppHeader />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"> </router-view>
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