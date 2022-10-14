<template>
    <div class="statistical">
        <div class="statistical-left">
      <div style="text-align: left">
        <svg-icon width="15" height="15" icon-class="four" />
        <span class="statistical-left-headlab">
            {{ labs[0].name }}
        </span>
      </div>
      
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item
          v-for="(labchildren, p) in labs[0].children"
          :key="p"
          :index="String(p)"
          class="menu-item"
          @click="getTitle(labchildren.name)" 
        >
          <div class="statistical-left-children-left">
            {{ labchildren.name }}
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="statistical-right">
      <div class="statistical-right-headBox">
        <div class="statistical-right-headBox-title">{{topTitle}}</div>
        <div class="statistical-right-headBox-headSelect">
            <HeadSelect :statisticalType="headselect.type"></HeadSelect>
        </div>
      </div>
        <div class="echartsBox">
            <Echarts :statisticalType="headselect.type"></Echarts>
        </div>
        <div class="tableBox">
          <InforTable :statisticalType="headselect.type"></InforTable>
        </div>
    </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Echarts from "./components/echarts.vue";
import HeadSelect from "./components/headSelect.vue";
import InforTable from "./components/inforTable.vue";
export default defineComponent({
  components: {
    Echarts,
    HeadSelect,
    InforTable
},
  name: 'Statistical',
  setup(){
    const name = ref('statistical');
    const topTitle = ref('仓库统计');
    const headselect=ref({
      type:'project',
    })
    const labs = ref( [
        {
          name: '统计',
          children: [
            {
              name: '仓库统计',
            },
            {
              name: '成员统计',
            }
          ]
        }
      ],);
      const getTitle = (val)=>{
        if (val === '仓库统计') {
          topTitle.value = '仓库统计'
          headselect.value.type='project'
      } else if (val === '成员统计') {
        topTitle.value = '成员统计'
        headselect.value.type='member'
      }
      }
      return {
        name,
        labs,
        topTitle,
        headselect,
        getTitle,
      }
  }
});
</script>
<style lang="less" scoped>
.el-menu-item:hover{
  background-color: #E1E2E5 !important;
}
.menu-item {
  height: 40px;
}
.statistical {
  display: flex;
  padding: 0 0 0 20px;
  height: calc(100vh - 100px);
  &-left {
    width: 230px;
    box-shadow: inset -1px 0px 0px #ececec;
    min-height: calc(100vh - 100px);
    & > div {
      padding-top: 20px;
    }
    &-headlab {
      line-height: 25px;
      padding-left: 20px;
      align-items: center;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
    }
    &-children {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px 0px 30px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      &-left {
        margin-left: 20px;
      }
    }
  }
  &-right {
    padding: 20px 0;
    width: calc(100vw - 300px);
    &-headBox {
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      &-title {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: #4b4b4b;
        margin-bottom: 24px;
        padding-left: 15px;
      }
    }
    &-table {
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #4b4b4b;
      padding-left: 15px;
    }
  }
}
</style>