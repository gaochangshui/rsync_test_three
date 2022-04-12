<template>
  <div class="navbar">
    <div class="hamburger-container">
      <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(hamburger,i) in hamburgerList" :key="i"
      ><a href="/">{{hamburger}}</a></el-breadcrumb-item
    >
  </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hamburgerList: ['New Arrivals', 'Game', 'Sausage Man']
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #f2f3f5;

  .hamburger-container {
    color: #8E8E8E;
    padding-left: 10px;
    line-height: 46px;
    height: 100%;
    float: left;
    display: flex;
    -webkit-tap-highlight-color:transparent;
    & > .el-breadcrumb {
      padding-left: 10px;
      padding-top: 10px;
    }
  }
}
</style>
