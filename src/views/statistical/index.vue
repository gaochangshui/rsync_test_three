<template>
    <div class="statistical">
        <div class="statistical-left">
      <div style="text-align: left">
        <svg-icon width="15" height="15" icon-class="four" />
        <span class="statistical-left-headlab">
            {{ labs[0].name }}
        </span>
      </div>
      
      <el-menu :default-active="leftListIndex" class="el-menu-vertical-demo">
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
    <div class="statistical-right" >
      <div class="statistical-right-headBox" style="border-bottom:1px solid #ececec ;padding-bottom: 15px;">
        <div class="statistical-right-headBox-title">{{topTitle}}</div>
        <div class="statistical-right-headBox-headSelect">
          <div>
        <el-select 
        v-model="selectType" 
        style="float:right;margin-right:20px;width:150px"
        size="large"
        v-show="(warehouseShow && headselect.type==='project')||
        (headselect.type==='member' && memberShow)">
          <el-option
          value="Commits"
          label="Commits"
          >
          </el-option>
          <el-option
          value="Additions"
          label="Additions"
          >
          </el-option>
          <el-option
          value="Deletions"
          label="Deletions"
          >
          </el-option>
        </el-select>
      </div>
            <HeadSelect 
            :statisticalType="headselect.type" 
            :warehouseShow="warehouseShow"
            :memberShow="memberShow"
            :changeName="changeName"
            @contentSelect="contentSelect"
            @timeSelect="timeSelect"></HeadSelect>
        </div>
      </div>
        <div class="echartsBox">
          <img 
          src="../../assets/images/statistical.png" 
          style="margin-left: 30%;margin-top: 100px; width: 570px;" 
          v-show="headselect.type==='project'&&!warehouseShow"/>
          <img 
          src="../../assets/images/statistical.png" 
          style="margin-left: 30%;margin-top: 100px; width: 570px;" 
          v-show="headselect.type==='takentime'&&!timeShow"/>
            <Echarts 
            :statisticalType="headselect.type" 
            :selectType="selectType"
            :warehouseList="warehouseList" 
            :memberList="memberList"
            :memberTooltip="memberTooltip"
            :warehouseTooltip="warehouseTooltip"
            :warehouseChangeList="warehouseChangeList"
            :memberChangeList="memberChangeList"
            :warehouseShow="warehouseShow"
            :memberShow="memberShow"
            :timeShow="timeShow"
            :timeList="timeList"
            ></Echarts>
        </div>
        <div class="cardBox">
          <el-space wrap v-show="headselect.type==='project'">
            <div v-for="(item,index) in warehouseCardList" :key="item.id">
              <WarehouseCard 
              @contentSelect="contentSelect"
              :echartsId="index+1"
              :selectType="selectType"
              :warehouseShow="warehouseShow"
              :warehouseCardData="item"></WarehouseCard>
            </div>
          </el-space>   
          <el-space wrap v-show="headselect.type==='member'">
            <div v-for="(item,index) in memberCardList" :key="index">
              <MemberCard 
              :echartsId="index+1"
              :selectType="selectType"
              :memberShow="memberShow"
              :memberCardData="item"></MemberCard>
            </div>
          </el-space>   
          <el-space wrap v-show="headselect.type==='takentime'">
            <div v-for="(item,index) in timeCardList" :key="index">
              <TimeCard 
              :echartsId="index+1"
              :timeShow="timeShow"
              :timeCardData="item"></TimeCard>
            </div>
          </el-space>   
        </div>
    </div>
    </div>
</template>
<script>
import axios from '@/http'
import { defineComponent, ref , watch , reactive} from "vue";
import Echarts from "./components/echarts.vue";
import HeadSelect from "./components/headSelect.vue";
import WarehouseCard from './components/warehouseCard.vue';
import MemberCard from './components/memberCard.vue';
import TimeCard from './components/timeCard.vue'
import { ElMessage , ElLoading } from 'element-plus'
export default defineComponent({
  components: {
    Echarts,
    HeadSelect,
    WarehouseCard,
    MemberCard,
    TimeCard
},
  name: 'Statistical',
  setup(){
    const selectType=ref('Commits')
    const warehouseShow=ref(false);
    const memberShow=ref(false);
    const timeShow=ref(false);
    const leftListIndex=ref('0')
    const name = ref('statistical');
    const topTitle = ref('????????????');
    let warehouseData=[];
    let warehouseCardData=[];
    let memberData=[];
    let memberCardData=[];
    const warehouseTooltip=ref([])
    const memberTooltip=ref([])
    const warehouseCardList=ref([])
    const memberCardList=ref([])
    const headselect=ref({
      type:'member',
    });
    const warehouseList = ref({
      xList:[],
      nameList:[],
      yList:[]
    });
    const timeList =ref({
      date:[],
      yList:[],
      taskList:[],
      taskPie:[],
      userPie:[]
    });
    const timeCardList =ref([]);
    const warehouseChangeList =ref([]);
    const memberList = ref({
      xList:[],
      nameList:[],
      yList:[]
    });
    const memberChangeList =ref([])
    const changeName=ref(null)
    const labs = ref( [
        {
          name: '??????',
          children: [
          {
              name: '????????????',
            },
            {
              name: '????????????',
            },
            {
              name: '????????????'
            }
          ]
        }
      ],);
      const getTitle = (val)=>{
        if (val === '????????????') {
          topTitle.value = '????????????'
          headselect.value.type='project'
      } else if (val === '????????????') {
        topTitle.value = '????????????'
        headselect.value.type='member'
      }else if(val === '????????????'){
        topTitle.value = '????????????'
        headselect.value.type='takentime'
      }
      };
      const dataSort = (val)=>{
        if(selectType.value==='Commits'){
          val.sort(function (a, b) {
          return b.cntTotal - a.cntTotal;
        });
        }else if(selectType.value==='Additions'){
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
        if(val4==='p'){
          warehouseList.value.xList=listdata.val2;
          warehouseList.value.yList=listdata.yArr;
          warehouseList.value.nameList=listdata.nameArr;
          warehouseCardList.value=cardlistdata;
          warehouseTooltip.value=listdata.tooltipArr
          warehouseShow.value=true
        }else{
          memberList.value.xList=listdata.val2;
          memberList.value.yList=listdata.yArr;
          memberList.value.nameList=listdata.nameArr;
          memberTooltip.value=listdata.tooltipArr;
          memberCardList.value=cardlistdata;
          memberShow.value=true
        }
      }
      const bigListProcessing = (val,val2)=>{
        let nameArr=[]
        let yArr=[]
        let tooltipArr=[]
        for(let i=0;i<val.length;i++){
          let ojb = {}
          let tooltipOjb={}
          tooltipOjb.cntTooltip=val[i].countData
          tooltipOjb.addTooltip=val[i].additionsData
          tooltipOjb.delTooltip=val[i].deletionsData
          ojb.name=val[i].name
          ojb.type=val[i].type
          ojb.stack='Total'+i
          if(selectType.value==='Commits'){
          ojb.data=val[i].countData
        }else if(selectType.value==='Additions'){
          ojb.data=val[i].additionsData
        }else{
          ojb.data=val[i].deletionsData
        }
        yArr.push(ojb)
        tooltipArr.push(tooltipOjb)
        nameArr.push(val[i].name)
        }
        return {yArr,nameArr,val2,tooltipArr}
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
          if(selectType.value==='Commits'){
            cardOjb.data=allcardlist[k].countData
        }else if(selectType.value==='Additions'){
          cardOjb.data=allcardlist[k].additionsData
        }else{
          cardOjb.data=allcardlist[k].deletionsData
        }
        cardArr.push(cardOjb)
        }
        return cardArr
      }
      const contentSelect =(val,val2,val3)=>{
        const loading=ElLoading.service({
              lock: true,
              text: '???????????????????????????',
              background: 'rgba(0, 0, 0, 0.7)',})
        axios.post('/actionapi/GitlabCodeAnalysis/GetGraphData',{
            idList:val,
            flag:val2
        }).then((e)=>{
          if(val3===1){
            leftListIndex.value=0
            topTitle.value='????????????'
            headselect.value.type='member'
            changeName.value=val[0]
          }
          if(e.data.dataUser.length!==0){
            selectType.value='Commits'
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
          
          ElMessage.error('??????????????????')
        }
        loading.close()
        }).catch(()=>{
          loading.close()
        })
      };
      const timeSelect = (val,val2,val3)=>{
        let start=null
        let end = null
        if(val3){
          start=val3[0]
          end=val3[1]
        }
        const loading=ElLoading.service({
              lock: true,
              text: '???????????????????????????',
              background: 'rgba(0, 0, 0, 0.7)',})
        axios.get('/api/GraphAnalysis',{
          params:{
            projects:val,
            id:val2,
            beginat:start,
            endat:end
          }
        }).then((e)=>{
          loading.close()
          if(e.data.User.length !== 0){
            let lineList=timeListProcessing(e.data.Project)
            timeList.value.date=e.data.Date;
            timeList.value.yList=lineList.yArr;
            timeList.value.taskList=lineList.nameArr;
            timeList.value.taskPie=e.data.TaskPie;
            timeList.value.userPie=e.data.UserPie;
            timeList.value.allTotal=e.data.Project[0].total
            let lineCardList=timeCardListProcessing(e.data)
            timeCardList.value=lineCardList
            timeShow.value=true
          }else{
            timeShow.value=false
            ElMessage.error('??????????????????')
          }
        }).catch(()=>{
          loading.close()
        })
        
      };
      const timeListProcessing = (val) =>{
        let yArr = []
        let nameArr = []
        for(let i = 0 ; i < val.length;i++){
          let obj = {}
          obj.name=val[i].name;
          obj.data=val[i].hours;
          obj.type='line';
          obj.stack='Total'+i;
          yArr.push(obj)
          nameArr.push(val[i].name)
        }
        return {yArr,nameArr}
      }
        const timeCardListProcessing = (val)=>{
          let timeArr=[]
          for(let i = 0;i<val.User.length;i++){
            let obj = {}
            obj.date=val.Date
            obj.name=val.User[i].name
            obj.total=val.User[i].total
            obj.nameList=val.User[i].user.map((item)=>(item.name))
            obj.udata=val.User[i].user.map((item,index)=>({
              data:item.hours,
              name:item.name,
              type:'line',
              stack: "totle" + index,
            }))
            timeArr.push(obj)
          }
          console.log(timeArr,1);
          return timeArr
        }
      watch(selectType,()=>{
          if(headselect.value.type==='project'){
            let changBigList=bigListProcessing(warehouseData,warehouseList.value.xList)
            warehouseList.value.xList=changBigList.val2;
          warehouseList.value.yList=changBigList.yArr;
          warehouseList.value.nameList=changBigList.nameArr;
          warehouseCardList.value=[]
          setTimeout(()=>{
            let changCardList=cardListProcessing(warehouseCardData,warehouseList.value.xList)
          warehouseCardList.value=changCardList
            },100);
          }else{
            let changBigList=bigListProcessing(memberData,memberList.value.xList)
            memberList.value.xList=changBigList.val2;
            memberList.value.yList=changBigList.yArr;
            memberList.value.nameList=changBigList.nameArr;
            memberCardList.value=[]
          setTimeout(()=>{
            let changCardList=cardListProcessing(memberCardData,memberList.value.xList)
            memberCardList.value=changCardList
            },100);
          }
        })
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
        warehouseTooltip,
        memberTooltip,
        leftListIndex,
        changeName,
        timeShow,
        timeList,
        timeCardList,
        getTitle,
        contentSelect,
        timeSelect
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
      &-headSelect div{
        float: right;
        margin-left: 5px;
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
  margin-top: 20px;
  margin-left: 42px;
}
</style>