<template>
  <div class="headbar">
    <div class="left-title">
        <el-tooltip
          show-after="1000"
          effect="light"
          content="原意为广场，地处古典城市中心，它理性、开放、包容，故取名为agora。"
        >
          <svg class="left-logo" width="78" height="22" viewBox="0 0 78 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3014 15.3112C23.7874 15.3112 22.3074 14.8622 21.0485 14.0211C19.7897 13.1799 18.8085 11.9844 18.2291 10.5856C17.6497 9.18685 17.4981 7.64769 17.7935 6.16277C18.0889 4.67786 18.8179 3.31388 19.8885 2.24331C20.9591 1.17275 22.3231 0.443682 23.808 0.148313C25.2929 -0.147055 26.8321 0.00453384 28.2308 0.58392C29.6296 1.16331 30.8251 2.14447 31.6663 3.40332C32.5074 4.66217 32.9564 6.14218 32.9564 7.65619C32.9564 9.68641 32.1499 11.6335 30.7143 13.0691C29.2787 14.5047 27.3316 15.3112 25.3014 15.3112ZM25.3014 3.4247C24.4603 3.4247 23.638 3.67412 22.9387 4.14142C22.2393 4.60871 21.6942 5.2729 21.3724 6.04999C21.0505 6.82708 20.9663 7.68217 21.1304 8.50713C21.2944 9.33208 21.6995 10.0898 22.2942 10.6846C22.889 11.2794 23.6468 11.6844 24.4717 11.8485C25.2967 12.0126 26.1518 11.9284 26.9289 11.6065C27.7059 11.2846 28.3701 10.7395 28.8374 10.0402C29.3047 9.3408 29.5541 8.51857 29.5541 7.67746C29.5541 6.54955 29.1061 5.46784 28.3085 4.6703C27.511 3.87275 26.4293 3.4247 25.3014 3.4247Z" fill="#304AF3"/>
            <path d="M42.6145 15.3112C41.1004 15.3112 39.6204 14.8622 38.3616 14.0211C37.1027 13.1799 36.1216 11.9844 35.5422 10.5856C34.9628 9.18685 34.8112 7.64769 35.1066 6.16277C35.4019 4.67786 36.131 3.31388 37.2016 2.24331C38.2721 1.17275 39.6361 0.443682 41.121 0.148313C42.606 -0.147055 44.1451 0.0045338 45.5439 0.58392C46.9426 1.16331 48.1382 2.14447 48.9793 3.40332C49.8205 4.66217 50.2694 6.14218 50.2694 7.65619C50.2694 9.68641 49.4629 11.6335 48.0273 13.0691C46.5917 14.5047 44.6447 15.3112 42.6145 15.3112ZM42.6145 3.4247C41.7733 3.4247 40.9511 3.67412 40.2517 4.14142C39.5524 4.60871 39.0073 5.2729 38.6854 6.04999C38.3635 6.82708 38.2793 7.68217 38.4434 8.50713C38.6075 9.33208 39.0125 10.0898 39.6073 10.6846C40.2021 11.2794 40.9598 11.6844 41.7848 11.8485C42.6097 12.0126 43.4648 11.9284 44.2419 11.6065C45.019 11.2846 45.6832 10.7395 46.1505 10.0402C46.6178 9.3408 46.8672 8.51857 46.8672 7.67746C46.8672 6.54955 46.4191 5.46784 45.6216 4.6703C44.824 3.87275 43.7424 3.4247 42.6145 3.4247Z" fill="#304AF3"/>
            <path d="M73.3746 0.937083V1.49419C71.9034 0.412396 70.0915 -0.102507 68.2713 0.0440006C66.3359 0.242741 64.5487 1.17098 63.2731 2.64006C61.9975 4.10913 61.3292 6.00881 61.4039 7.95297C61.4786 9.89713 62.2909 11.7399 63.6755 13.1067C65.0601 14.4735 66.9132 15.2618 68.8582 15.3114C70.4785 15.313 72.0567 14.7959 73.3619 13.8357V14.4353C73.3619 14.6609 73.4514 14.8773 73.611 15.0368C73.7705 15.1963 73.9868 15.2859 74.2124 15.2859H76.1899C76.4155 15.2859 76.6319 15.1963 76.7914 15.0368C76.9509 14.8773 77.0405 14.6609 77.0405 14.4353V0.937083C77.0405 0.711502 76.9509 0.495161 76.7914 0.335651C76.6319 0.176142 76.4155 0.0865308 76.1899 0.0865308H74.2124C73.989 0.0898816 73.7759 0.180968 73.6192 0.340116C73.4624 0.499263 73.3746 0.713696 73.3746 0.937083ZM69.5939 11.8454C68.7037 12.0001 67.7874 11.8673 66.9777 11.4662C66.1681 11.0651 65.5073 10.4165 65.091 9.61454C64.6748 8.81258 64.5248 7.89888 64.6628 7.00594C64.8008 6.11299 65.2196 5.28721 65.8585 4.64831C66.4974 4.0094 67.3232 3.59059 68.2162 3.45259C69.1091 3.3146 70.0228 3.46458 70.8248 3.8808C71.6267 4.29703 72.2753 4.95787 72.6764 5.7675C73.0775 6.57713 73.2104 7.49346 73.0556 8.38366C72.9056 9.24703 72.4925 10.043 71.8728 10.6626C71.2532 11.2823 70.4573 11.6954 69.5939 11.8454Z" fill="#304AF3"/>
            <path d="M12.3476 0.937083V1.49419C10.8764 0.412396 9.06444 -0.102507 7.24425 0.0440006C5.30882 0.242741 3.5217 1.17098 2.2461 2.64006C0.970493 4.10913 0.302136 6.00881 0.37687 7.95297C0.451604 9.89713 1.26382 11.7399 2.64844 13.1067C4.03306 14.4735 5.88616 15.2618 7.83113 15.3114C9.45142 15.313 11.0297 14.7959 12.3348 13.8357V14.4353C12.3348 14.6609 12.4244 14.8773 12.5839 15.0368C12.7434 15.1963 12.9598 15.2859 13.1854 15.2859H15.1927C15.4182 15.2859 15.6346 15.1963 15.7941 15.0368C15.9536 14.8773 16.0432 14.6609 16.0432 14.4353V0.937083C16.0432 0.711502 15.9536 0.495161 15.7941 0.335651C15.6346 0.176142 15.4182 0.0865308 15.1927 0.0865308H13.2151C13.102 0.084268 12.9896 0.104592 12.8844 0.146322C12.7792 0.188052 12.6835 0.250344 12.6027 0.329551C12.5219 0.408759 12.4577 0.503295 12.4139 0.607613C12.3701 0.711932 12.3475 0.823941 12.3476 0.937083ZM8.56686 11.8454C7.67666 12.0001 6.76032 11.8673 5.95069 11.4662C5.14106 11.0651 4.48022 10.4165 4.06399 9.61454C3.64777 8.81258 3.49779 7.89888 3.63578 7.00594C3.77378 6.11299 4.19259 5.28721 4.8315 4.64831C5.4704 4.0094 6.29618 3.59059 7.18913 3.45259C8.08207 3.3146 8.99577 3.46458 9.79773 3.8808C10.5997 4.29703 11.2483 4.95787 11.6494 5.7675C12.0505 6.57713 12.1833 7.49346 12.0286 8.38366C11.8785 9.24703 11.4654 10.043 10.8458 10.6626C10.2262 11.2823 9.43023 11.6954 8.56686 11.8454Z" fill="#304AF3"/>
            <path d="M60.3909 0.864354V3.13958C60.3921 3.35051 60.3148 3.55434 60.1742 3.71152C60.0335 3.86869 59.8394 3.96799 59.6297 3.99014C59.0558 4.03147 58.494 4.17551 57.9711 4.41541C57.3947 4.69078 56.9086 5.12458 56.5697 5.66607C56.2308 6.20756 56.0531 6.83436 56.0574 7.47315V14.4307C56.0574 14.6562 55.9677 14.8726 55.8082 15.0321C55.6487 15.1916 55.4324 15.2812 55.2068 15.2812H53.2293C53.0037 15.2812 52.7874 15.1916 52.6278 15.0321C52.4683 14.8726 52.3787 14.6562 52.3787 14.4307V0.936656C52.3787 0.711076 52.4683 0.494734 52.6278 0.335224C52.7874 0.175715 53.0037 0.0861042 53.2293 0.0861042H55.2068C55.4324 0.0861042 55.6487 0.175715 55.8082 0.335224C55.9677 0.494734 56.0574 0.711076 56.0574 0.936656V2.42937C56.0578 2.44767 56.0642 2.46533 56.0755 2.47972C56.0869 2.49411 56.1025 2.50447 56.1202 2.50925C56.1379 2.51403 56.1566 2.51298 56.1736 2.50625C56.1907 2.49952 56.2051 2.48747 56.2147 2.4719C56.5333 1.87106 56.9747 1.34398 57.5103 0.924885C58.0459 0.505792 58.6637 0.204069 59.3235 0.039317C59.4496 0.0060643 59.5816 0.00225247 59.7094 0.0281686C59.8372 0.0540847 59.9573 0.109044 60.0605 0.188789C60.1637 0.268534 60.2472 0.37093 60.3044 0.488071C60.3617 0.605212 60.3913 0.733954 60.3909 0.864354Z" fill="#304AF3"/>
            <path d="M32.0293 19.0024C32.0873 19.1029 32.1242 19.2143 32.1376 19.3296C32.151 19.4449 32.1406 19.5617 32.1071 19.6729C32.0737 19.784 32.0178 19.8871 31.943 19.9759C31.8681 20.0646 31.7759 20.1371 31.6721 20.1889C29.6967 21.1773 27.5195 21.6954 25.3107 21.7028C23.1018 21.7102 20.9212 21.2066 18.9393 20.2314C18.8345 20.1801 18.7413 20.1077 18.6657 20.0188C18.59 19.9299 18.5335 19.8264 18.4996 19.7147C18.4657 19.603 18.4551 19.4855 18.4686 19.3695C18.482 19.2536 18.5192 19.1416 18.5778 19.0407L19.4284 17.5607C19.5357 17.3761 19.7086 17.2386 19.9127 17.1755C20.1167 17.1125 20.337 17.1286 20.5298 17.2205C22.018 17.9365 23.6491 18.3058 25.3006 18.3006C26.952 18.2955 28.5808 17.916 30.0645 17.1907C30.2573 17.0972 30.4782 17.0798 30.6832 17.1421C30.8882 17.2044 31.0621 17.3417 31.1702 17.5267L32.0293 19.0024Z" fill="#304AF3" stroke="#304AF3" stroke-width="0.212638" stroke-miterlimit="10"/>
          </svg>
        </el-tooltip>
        <p class="logo-name">|</p>
        <p class="page-name">Project and code management platform.</p>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="avatar"
            class="user-avatar"
          />      
          <span class="user-name">{{username}}</span>
<span class="user-icon" >
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" data-v-78e17ca8="">
    <path fill="currentColor" d="m192 384 320 384 320-384z"></path>
    </svg>
    </span>  
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <!-- <router-link to="/" style="text-decoration: none;">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link> -->
            <a
            style="text-decoration: none;"
              target="_blank"
              href="http://docs.trechina.cn/docs/code_management/faq"
            >
              <el-dropdown-item>运用规则</el-dropdown-item>
            </a>
            <a
            style="text-decoration: none;"
              target="_blank"
              href="https://code.trechina.cn/gitlab/public-lib/source-management-support/-/issues"
            >
              <el-dropdown-item>我要提问</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block; color: #3E79F6;"  >退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { store } from '../../store/store.js'
import axios from '@/http'
export default {
  name: 'headbar',
  data(){
    return{
      username:'',
      avatar:'',
      usercd:''
    }
  },
  methods:{
    getCookie(){
      var allCookie = document.cookie;
     var aryCookie =allCookie.split(';');
     for(let i in aryCookie){
       let getUserid=aryCookie[i].split('=');
        if(getUserid[0].trim()==='LoginedUserName'){
          this.username=getUserid[1];
        }
        if(getUserid[0].trim()==='LoginedUserAvatar'){
          this.avatar=getUserid[1];
        }
        if(getUserid[0].trim()==='UserCD'){
          this.usercd=getUserid[1];
        }
     }
    },
     toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys){
        for(var i = keys.length; i--;){
          document.cookie=keys[i]+'=0;path=/;expires='+new Date(0).toUTCString();
        }
      }
      localStorage.clear('token')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    getStateData(){
      axios.get('/actionapi/FeatureHistory/GetMark',{
        params:{
          user_id:this.usercd
        }
      }).then((e)=>{
        store.stateData=JSON.parse(e.data.data)
        store.statefather=store.stateData.map((item)=>{
          return item.value
        })
        store.statechildren=store.stateData.map((item)=>[
          item.children.map((item)=>{
            return item.value
          })
        ])
      })
      console.log(store.stateData);
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.getStateData()
    })
    
  },
  created(){
      this.getCookie();
  }
};
</script>
<style lang="less" scoped>
.headbar {
  width: 100%;
  height: 55px;
  background: #f2f3f5;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e1e2;
  padding-bottom: 10px;
}
.left-title{
    display: flex;
    justify-content: left;
    .left-logo{
      margin-left: 30px;
      margin-top: 18px;
    }
    .logo-name{
        font-size: 25px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 6px;
        color: #3652FB;
    }
    .page-name{
        font-weight: 500;
        font-style: normal;
        font-size: 18px;
        margin-top: 13px;
    }
}
.right-menu {
  float: right;
  height: 50px;
  line-height: 50px;
  width: 160px;
  cursor: pointer;
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
  .user-name{
    font-size: 14px;
    color: #000000;
  line-height: 22px;
    position:relative;
    top: -10px;
    margin-right: 40px;
  }
  .user-icon{
          position:relative;
          top: -10px;
          margin-right: 4px;
      }
.avatar-wrapper:hover{
  background: #E1E2E5;
}
  .avatar-container {
margin-right: 10px;
padding-top: 6px;
    .avatar-wrapper {
      margin-top: 5px;
      border-radius: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 8px;
        margin-top:4px ;
        margin-left:4px ;
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
.el-dropdown-menu{
  width: 130px;
  border-radius:5px ;
  padding-left: 4px;
  padding-right: 4px;
}
/deep/.el-dropdown-menu__item:not(.is-disabled):hover{
  background-color:#FAFAFA;
  color: #4B4B4B;
}
/deep/.el-popper[data-popper-placement^=bottom]>.el-popper__arrow{
  top: 0 !important;
}
</style>
