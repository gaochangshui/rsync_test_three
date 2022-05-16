<template>
  <router-view/>
</template>
<script setup>
import { onMounted } from 'vue';
onMounted(()=>{
  document.body.style.setProperty('--el-color-primary','#3E79F6')
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
@media screen and (min-width:1281px) and (max-width:1366px) {
  html{
    font-size: 9px;
  } 
}
@media screen and (min-width:1367px) and (max-width:1440px) {
  html{
    font-size: 12px;
  } 
}
@media screen and (min-width:1441px) and (max-width:1920px) {
  html{
    font-size: 15px;
  } 
}
@media screen and (min-width:1921px) and (max-width:2194px) {
  html{
    font-size: 18px;
  } 
}
@media screen and (min-width:2195px) and (max-width:2559px) {
  html{
    font-size: 20px;
  } 
}
@media screen and (min-width:2560px) and (max-width:3071px) {
  html{
    font-size: 22px;
  } 
}
@media screen and (min-width:3072px) and (max-width:3839px) {
  html{
    font-size: 24px;
  } 
}
</style>
