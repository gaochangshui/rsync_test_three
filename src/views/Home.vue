<script>
import ComponentsWarehouse from '../components/componentsWarehouse.vue';
import ComponentsHome from '../components/componentsHome.vue';
export default {
  components: {
    ComponentsWarehouse,
    ComponentsHome
  },
  data() {
    return {
      someCondition: 'warehouse'
    };
  }
};
</script>
<template>
  <div class="home">
    <div class="head">
      <div>
        <div @click="someCondition='home'">
          <svg t="1646049421475" 
          class="icon" 
          viewBox="0 0 1024 1024"
           version="1.1" 
           xmlns="http://www.w3.org/2000/svg"
            p-id="2055"
             width="32" 
             height="32">
            <path d="M512.256 949.28l176.64-543.648h-353.28l176.64 543.648z"
             fill="#E24329" 
             p-id="2056"></path>
            <path d="M512.288 949.28l-176.64-543.648H88.064L512.32 949.28z"
             fill="#FC6D26"
              p-id="2057"></path>
            <path d="M88.064 405.632L34.4 570.88c-4.896 15.04 0.448 31.584 13.28 40.896l464.576 337.536L88.064 405.632z" 
            fill="#FCA326" 
            p-id="2058"></path>
            <path d="M88.096 405.632h247.552L229.248 78.208c-5.44-16.832-29.312-16.832-34.784 0L88.096 405.632z" 
            fill="#E24329" 
            p-id="2059"></path>
            <path d="M512.32 949.28l176.64-543.648h247.552L512.32 949.28z"
             fill="#FC6D26"
              p-id="2060"></path>
            <path d="M936.512 405.632l53.664 165.216c4.896 15.04-0.48 31.584-13.28 40.896L512.32 949.28l424.192-543.648z"
             fill="#FCA326" 
             p-id="2061"></path>
            <path d="M936.48 405.632H688.96l106.4-327.424c5.44-16.832 29.312-16.832 34.784 0l106.368 327.424z"
             fill="#E24329" 
             p-id="2062"></path>
            </svg>
        </div>
        <div @click="someCondition='home'">&nbsp;GitLab&nbsp;&nbsp;|&nbsp;&nbsp;Manager</div>
      </div>
      <div>
        <div @click="someCondition='home'">Home</div>
        <div @click="someCondition='warehouse'">Executable Program</div>
      </div>
    </div>
    <div class="main">
      <ComponentsHome v-if="someCondition === 'home'"/>
      <ComponentsWarehouse v-if="someCondition === 'warehouse'"/>
    </div>
    <div class="footer1">
      <hr style="width: 80%;color: #eee;">
      <p>© 2022 - GitLab Manager
        <a
         href="http://code.trechina.cn/gitlab/public-lib/source-management-support/-/issues"
         title="欢迎提问！管理员很快会看到你的意见和建议">
         我要提问
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: #fff;
  width:100%;
  display: flex;
  min-height: 100vh;
  justify-content: space-between;
  flex-direction: column;
  & > .head {
    display: flex;
    justify-content: space-between;
    background: #0B2646;
    height: 55px;
    color: #FFFFFF;
    padding: 0px 20px;
    font-size: 16px;
    & > div {
      display: flex;
      & > div {
        margin: auto 0px;
        cursor:pointer;
      }
    }
  }
  & > .main {
    flex: 1;
    width: 100%;
    margin: 0 auto;
  }
  & > .footer1 {
    text-align: center;
  }

}
</style>
