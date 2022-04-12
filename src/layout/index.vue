<template>
  <div>
    <headbar />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div>
          <navbar />
        </div>
        <app-main />
      </div>
  </div>
</template>

<script>
import { Navbar, AppMain, Sidebar } from "./components/index";
import Headbar from "./components/headbar.vue";

export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain,
    Sidebar,
    Headbar
},
};
</script>
<style lang="less">
.sidebar-container {
  width: 54px;
  height: calc(100vh - 50px);
  background-color: #f2f3f5;
  position:absolute ;
}
.main-container {
  margin-left: 54px;
  height: calc(100vh - 50px);
}
</style>
