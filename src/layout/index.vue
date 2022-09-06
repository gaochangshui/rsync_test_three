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
import { Navbar, AppMain, Sidebar } from './components/index';
import Headbar from './components/headbar.vue';

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar,
    Headbar
}
};
</script>
<style lang="less">
.sidebar-container {
  width: 69px;
  height: calc(100vh - 64px);
  background-color: #f2f3f5;
  position:absolute ;
  padding-top: 35px;
}
.main-container {
  margin-left: 69px;
  height: calc(100vh - 64px);
  & > div {
    background: #f2f3f5;
  }
}
</style>
