<template>
  <router-view/>
</template>
<script setup>
import { onMounted } from 'vue';
onMounted(()=>{
  document.body.style.setProperty('--el-color-primary','#3E79F6');
});
</script>
<style lang="less">
#app {
  font-family: 'noto sans sc','Microsoft Yahei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.bg-blue{
   background-color: #039BE5 !important;
   font-size:large;
   color:#FFF;

}
.bg-green{
   background-color: #7CB342 !important;
   font-size:large;
   color:#FFF;
}
.bg-banana{
   background-color: #F6BF26 !important;
   font-size:large;
   color:#FFF;
}
.bg-red{
   background-color: #F4511E !important;
   font-size:large;
   color:#FFF;
}
.el-table--enable-row-hover .el-table__body tr:hover >.bg-red{
    background-color: rgb(244,81,30)  !important;
    opacity: 0.9 !important;
    border-bottom: solid 1px #eee;
  }
.el-table--enable-row-hover .el-table__body tr:hover >.bg-blue{
    background-color: #039BE5 !important;
    opacity: 0.9 !important;
    border-bottom: solid 1px #eee;
  }
.el-table--enable-row-hover .el-table__body tr:hover >.bg-green{
    background-color: #7CB342 !important;
    opacity: 0.9 !important;
    border-bottom: solid 1px #eee;
  }
.el-table--enable-row-hover .el-table__body tr:hover >.bg-banana{
    background-color: #F6BF26 !important;
    opacity: 0.9 !important;
    border-bottom: solid 1px #eee;
  }
.el-cascader-panel{
      height: 400px;
    .el-cascader-menu__wrap.el-scrollbar__wrap {
      height: 100%;
    }
}
.el-autocomplete-suggestion li {
    padding: 5px 20px;
    line-height: 24px; 
}
</style>
