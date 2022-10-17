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
            <HeadSelect 
            :statisticalType="headselect.type" 
            :warehouseShow="warehouseShow"
            :memberShow="memberShow"
            @warehouseSelect="warehouseSelect" 
            @memberSelect="memberSelect"></HeadSelect>
        </div>
      </div>
        <div class="echartsBox">
            <Echarts 
            :statisticalType="headselect.type" 
            :warehouseList="warehouseList" 
            :memberList="memberList"
            :warehouseTable="warehouseTable"
            :warehouseChangeList="warehouseChangeList"
            :memberChangeList="memberChangeList"
            :warehouseShow="warehouseShow"
            :memberShow="memberShow"
            ></Echarts>
        </div>
        <div class="tableBox">
          <InforTable 
          :statisticalType="headselect.type" 
          :memberTable="memberTable" 
          :warehouseTable="warehouseTable"
          :warehouseShow="warehouseShow"
          :memberShow="memberShow"
          ></InforTable>
        </div>
    </div>
    </div>
</template>
<script>
import axios from '@/http'
import { defineComponent, ref } from "vue";
import Echarts from "./components/echarts.vue";
import HeadSelect from "./components/headSelect.vue";
import InforTable from "./components/inforTable.vue";
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    Echarts,
    HeadSelect,
    InforTable
},
  name: 'Statistical',
  setup(){
    const warehouseShow=ref(false);
    const memberShow=ref(false);
    const name = ref('statistical');
    const topTitle = ref('仓库统计');
    const headselect=ref({
      type:'project',
    });
    const warehouseList = ref({
      xList:[],
      nameList:[],
      yList:[]
    });
    const warehouseChangeList =ref([]);
    const warehouseTable = ref([]);
    const memberList = ref({
      xList:[],
      nameList:[],
      yList:[]
    });
    const memberChangeList =ref([])
    const memberTable = ref([])
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
      };
      const memberSelect =(val,val2)=>{
        axios.get('/actionapi/GitlabCodeAnalysis/GetDetailMember',{
          params:{
            members:val.join(),
            startDate:val2?val2[0]:'',
            endDate:val2?val2[1]:''
          }
        }).then((e)=>{
          if(e.data.detailData.length!==0){
          let nameArr = []
          let yArr=[]
          let changeArr=[]
          memberList.value.xList=e.data.graphData.date
          for(let i =0;i<e.data.graphData.data.length; i++){
            let ojb={}
            let changeOjb={}
            nameArr.push(e.data.graphData.data[i].name)
            ojb.name=e.data.graphData.data[i].name
            ojb.type=e.data.graphData.data[i].type
            ojb.stack=e.data.graphData.data[i].totalTitle+i
            ojb.data=e.data.graphData.data[i].totalData
            yArr.push(ojb)
            changeOjb.add=e.data.graphData.data[i].additionsData
            changeOjb.del=e.data.graphData.data[i].deletionsData
            changeArr.push(changeOjb)
          }
          memberList.value.nameList=nameArr
          memberList.value.yList=yArr
          memberTable.value=e.data.detailData
          memberChangeList.value=changeArr
          memberShow.value=true
        }else{
          memberShow.value=false
          ElMessage.error('查询数据为空')
        }
        })
      };
      const warehouseSelect = (val,val2)=>{
        axios.get('/actionapi/GitlabCodeAnalysis/GetDetailWarehouse',{
          params:{
            idList:val.join(),
            startDate:val2?val2[0]:'',
            endDate:val2?val2[1]:''
          }
        }).then((e)=>{
          if(e.data.detailData.length!==0){
            let nameArr = []
          let yArr=[]
          let changeArr=[]
          warehouseList.value.xList=e.data.graphData.date
          for(let i =0;i<e.data.graphData.data.length; i++){
            let ojb={}
            let changeOjb={}
            nameArr.push(e.data.graphData.data[i].name)
            ojb.name=e.data.graphData.data[i].name
            ojb.type=e.data.graphData.data[i].type
            ojb.stack=e.data.graphData.data[i].totalTitle+i
            ojb.data=e.data.graphData.data[i].totalData
            yArr.push(ojb)
            changeOjb.add=e.data.graphData.data[i].additionsData
            changeOjb.del=e.data.graphData.data[i].deletionsData
            changeArr.push(changeOjb)
          }
          warehouseList.value.nameList=nameArr
          warehouseList.value.yList=yArr
          warehouseTable.value=e.data.detailData
          warehouseChangeList.value=changeArr
          warehouseShow.value=true
          }else{
            warehouseShow.value=false
            ElMessage.error('查询数据为空')
          }
          
        })
      }
      return {
        name,
        labs,
        topTitle,
        headselect,
        warehouseList,
        warehouseTable,
        warehouseChangeList,
        memberChangeList,
        warehouseShow,
        memberList,
        memberTable,
        memberShow,
        getTitle,
        warehouseSelect,
        memberSelect
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