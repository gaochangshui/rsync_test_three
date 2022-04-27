<template>
  <div class="headbar">
      <div class="left-title">
          <img src="../../assets/logo.png" class="left-logo">
          <p class="logo-name">GitLab<span>|</span></p>
          <p class="page-name">Manager</p>
      </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="'http://172.17.100.50:8080/static/fe150e16/favicon.ico'"
            class="user-avatar"
          />        
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/PanJiaChen/vue-admin-template/"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
<span class="user-name">{{username}}</span>
<svg t="1649734145906" class="user-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1268" width="200" height="200"><path d="M902.935273 742.074182v118.551273a126.091636 126.091636 0 0 1-125.952 125.905454H196.608a126.045091 126.045091 0 0 1-125.905455-125.905454V181.620364a126.091636 126.091636 0 0 1 125.905455-125.998546h580.421818A126.138182 126.138182 0 0 1 902.981818 181.620364v85.317818a34.909091 34.909091 0 0 1-69.818182 0V181.620364c0-30.999273-25.181091-56.180364-56.133818-56.180364H196.608c-30.952727 0-56.087273 25.227636-56.087273 56.180364V860.625455c0 30.906182 25.181091 56.087273 56.087273 56.087272h580.421818c30.952727 0 56.133818-25.181091 56.133818-56.087272v-118.551273a34.909091 34.909091 0 0 1 69.771637 0z m53.294545-220.997818a34.769455 34.769455 0 0 0-10.24-24.669091l-175.709091-175.662546a34.909091 34.909091 0 1 0-49.384727 49.384728l116.130909 116.084363H483.141818a34.909091 34.909091 0 0 0 0 69.818182h353.931637l-116.13091 116.130909a34.909091 34.909091 0 0 0 49.338182 49.384727l175.709091-175.709091a35.141818 35.141818 0 0 0 10.24-24.762181z" p-id="1269"></path></svg>
    </div>
  </div>
</template>
<script>
export default {
  name: "headbar",
  data(){
    return{
      username:''
    }
  },
  methods:{
    getCookie(){
      var allCookie = document.cookie
     var aryCookie =allCookie.split(';')
     for(let i in aryCookie){
       let getUserid=aryCookie[i].split("=")
        if(getUserid[0]==' LoginedUserName'){
          this.username=getUserid[1]
        }
     }
    },
     toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  created(){
    this.getCookie()
  }
};
</script>
<style lang="less" scoped>
.headbar {
  width: 100%;
  height: 60px;
  background: #f2f3f5;
}
.left-title{
    .left-logo{
        margin-right: 5px;
        margin-left: 30px;
        margin-top: 10px;
        width: 30px;
        height: 30px;
        float: left;
    }
    .logo-name{
        float: left;
        font-weight: bold;

         span{
            margin-left: 15px;
            margin-right: 15px;
        }
    }
    .page-name{
        font-weight: bold;
        float: left;
    }
}
.right-menu {
  float: right;
  height: 50px;
  line-height: 50px;
  margin-right: 20px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
  .user-icon{
          width: 17px;
          height: 14px;
          margin-left: 10px;
      }

  .avatar-container {
margin-right: 10px;
padding-top: 6px;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
