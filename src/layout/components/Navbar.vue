<template>
  <div class="navbar">
    <div class="hamburger-container">
      <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="hamburgerList[1].path">{{hamburgerList[1].name}}</el-breadcrumb-item>
  </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed:{
hamburgerList(){
  return this.$route.matched
}
  },
  methods: {
   
  }
}
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #f2f3f5;

  .hamburger-container {
    color: #8E8E8E;
    line-height: 46px;
    height: 100%;
    float: left;
    display: flex;
    -webkit-tap-highlight-color:transparent;
    & > .el-breadcrumb {
     font-size: 14px;
      padding-top: 10px;
    }
  }
}
</style>
