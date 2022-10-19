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
            @contentSelect="contentSelect"></HeadSelect>
        </div>
      </div>
      <div>
        <el-select v-model="selectType" style="float:right;margin-right:20px">
          <el-option
          value="commit次数"
          label="commit次数"
          >
          </el-option>
          <el-option
          value="添加行数"
          label="添加行数"
          >
          </el-option>
          <el-option
          value="删除行数"
          label="删除行数"
          >
          </el-option>
        </el-select>
      </div>
        <div class="echartsBox">
            <Echarts 
            :statisticalType="headselect.type" 
            :warehouseList="warehouseList" 
            :memberList="memberList"
            :warehouseChangeList="warehouseChangeList"
            :memberChangeList="memberChangeList"
            :warehouseShow="warehouseShow"
            :memberShow="memberShow"
            ></Echarts>
        </div>
        <div class="cardBox">
          <el-space wrap v-show="headselect.type==='project'">
            <div v-for="(item,index) in warehouseCardList" :key="item.id">
              <WarehouseCard 
              :echartsId="index+1"
              :warehouseShow="warehouseShow"
              :warehouseCardData="item"></WarehouseCard>
            </div>
          </el-space>   
          <el-space wrap v-show="headselect.type==='member'">
            <div v-for="(item,index) in memberCardList" :key="index">
              <MemberCard 
              :echartsId="index+1"
              :memberShow="memberShow"
              :memberCardData="item"></MemberCard>
            </div>
          </el-space>   
        </div>
    </div>
    </div>
</template>
<script>
import axios from '@/http'
import { defineComponent, ref } from "vue";
import Echarts from "./components/echarts.vue";
import HeadSelect from "./components/headSelect.vue";
import WarehouseCard from './components/warehouseCard.vue';
import MemberCard from './components/memberCard.vue';
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    Echarts,
    HeadSelect,
    WarehouseCard,
    MemberCard
},
  name: 'Statistical',
  setup(){
    const selectType=ref('commit次数')
    const warehouseShow=ref(false);
    const memberShow=ref(false);
    const name = ref('statistical');
    const topTitle = ref('仓库统计');
    let warehouseData=[];
    let warehouseCardData=[];
    let memberData=[];
    let memberCardData=[];
    const warehouseCardList=ref([])
    const memberCardList=ref([])
    const headselect=ref({
      type:'project',
    });
    const warehouseList = ref({
      xList:[],
      nameList:[],
      yList:[]
    });
    const warehouseChangeList =ref([]);
    const memberList = ref({
      xList:[],
      nameList:[],
      yList:[]
    });
    const memberChangeList =ref([])
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
      const dataSort = (val)=>{
        if(selectType.value==='commit次数'){
          val.sort(function (a, b) {
          return b.cntTotal - a.cntTotal;
        });
        }else if(selectType.value==='添加行数'){
          val.sort(function (a, b) {
          return b.addTotal - a.addTotal;
        });
        }else{
          val.sort(function (a, b) {
          return b.delTotal - a.delTotal;
        });
        }
        return val
      }
      const dataProcessing = (val,val2,val3,val4)=>{
        let listdata=bigListProcessing(val,val3)
        let cardlistdata=cardListProcessing(val2,val3)
        console.log(listdata,1);
        console.log(cardlistdata,2);
        if(val4==='p'){
          warehouseList.value.xList=listdata.val2;
          warehouseList.value.yList=listdata.yArr;
          warehouseList.value.nameList=listdata.nameArr;
          warehouseCardList.value=cardlistdata
          warehouseShow.value=true
          console.log(memberShow.value);
        }else{
          memberList.value.xList=listdata.val2;
          memberList.value.yList=listdata.yArr;
          memberList.value.nameList=listdata.nameArr;
          memberCardList.value=cardlistdata
          memberShow.value=true
        }
      }
      const bigListProcessing = (val,val2)=>{
        let nameArr=[]
        let yArr=[]
        for(let i=0;i<val.length;i++){
          let ojb = {}
          ojb.name=val[i].name
          ojb.type=val[i].type
          ojb.stack='Total'+i
          if(selectType.value==='commit次数'){
          ojb.data=val[i].countData
        }else if(selectType.value==='添加行数'){
          ojb.data=val[i].additionsData
        }else{
          ojb.data=val[i].deletionsData
        }
        yArr.push(ojb)
        nameArr.push(val[i].name)
        }
        return {yArr,nameArr,val2}
      }
      const cardListProcessing = (val,val2)=>{
        let cardArr=[]
        let allcardlist = dataSort(val)
        for(let k = 0;k<allcardlist.length;k++){
          let cardOjb = {}
          cardOjb.date=val2
          cardOjb.name=allcardlist[k].name
          cardOjb.id=allcardlist[k].id
          cardOjb.url=allcardlist[k].url
          cardOjb.count=allcardlist[k].cntTotal
          cardOjb.add=allcardlist[k].addTotal
          cardOjb.del=allcardlist[k].delTotal
          if(selectType.value==='commit次数'){
            cardOjb.data=allcardlist[k].countData
        }else if(selectType.value==='添加行数'){
          cardOjb.data=allcardlist[k].additionsData
        }else{
          cardOjb.data=allcardlist[k].deletionsData
        }
        cardArr.push(cardOjb)
        }
        return cardArr
      }
      const contentSelect =(val,val2)=>{
        axios.get('/actionapi/GitlabCodeAnalysis/GetGraphData',{
          params:{
            idList:val.join(),
            flag:val2
          }
        }).then((e)=>{
          if(e.data.dataUser.length!==0){
            if(val2==='p'){
              warehouseData=e.data.dataProject
              warehouseCardData=e.data.dataUser
              dataProcessing(warehouseData,warehouseCardData,e.data.date,val2)
            }else{
              memberCardData=e.data.dataProject
              memberData=e.data.dataUser
              dataProcessing(memberData,memberCardData,e.data.date,val2)
            }
        }else{
          if (val2==='p') {
            
          }else{
            memberShow.value=false
          }
          
          ElMessage.error('查询数据为空')
        }
        })
      };
      return {
        name,
        labs,
        topTitle,
        headselect,
        selectType,
        warehouseList,
        warehouseChangeList,
        memberChangeList,
        warehouseShow,
        memberList,
        memberShow,
        warehouseCardList,
        memberCardList,
        getTitle,
        contentSelect,
      }
  }
});
</script>
<style lang="less" scoped>
.echartsBox{
  margin-top:30px ;
}
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
    overflow: auto;
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
.cardBox{
  margin-left: 42px;
}
</style>