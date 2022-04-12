<template>
  <div>
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
import { Navbar, AppMain, Sidebar } from './components/index'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar
  }
}
</script>
<style lang="less">
.sidebar-container {
  width: 54px;
  background-color: #F2F3F5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}
.main-container {
  margin-left: 54px;
}
</style>
