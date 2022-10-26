<template>
    <div v-show="memberShow">
        <el-card class="timebox-card" shadow="hover">
                <span class="timebox-card-name" >{{memberCardData.name}}</span>
             <div style="cursor: pointer;width:480px;height: 250px;">
                <div :id="'timeCardEcharts'+echartsId" @click="openDialog" ></div>
             </div>
                     
        </el-card>
        <el-dialog v-model="dialogTableVisible" :width="920" :title="memberCardData.name+' : '+selectType">
            <MassageEcharts :warehouseCardData="memberCardData"
            :echartsId="echartsId"></MassageEcharts>
        </el-dialog>
    </div>
</template>
<script>
import { defineComponent,ref,onMounted,watch} from "vue";
import MassageEcharts from './massageEcharts.vue'
import * as echarts from 'echarts'
export default defineComponent({
    name:'timeCard',
    components:{
        MassageEcharts
    },
    props:{
        echartsId:Number,
        memberShow:Boolean,
        memberCardData:Object,
        selectType:String
    },
    setup(props){
        const dialogTableVisible=ref(false)
        const openDialog=()=>{
            dialogTableVisible.value=true
        }
        const drawLine=()=>{
        let timeCardEcharts=echarts.init(document.getElementById('timeCardEcharts'+props.echartsId));
        timeCardEcharts.resize({
                width: 480,
                height: 250
            });   
            timeCardEcharts.setOption({
                color:["orange"],
                xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [1,2,3,4,5,6,7,8]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [2,5,8,6,9,7,4,5,9],
      type: 'line',
      areaStyle: {}
    }
  ]
        })  
    }
    watch(()=>props.memberCardData, () => {
      echarts.init(document.getElementById('memberCardEcharts'+props.echartsId)).dispose();
      drawLine()
    });
        onMounted(()=>{
            drawLine()
        })
        return {
            openDialog,
            dialogTableVisible
        }
    }

})
</script>
<style lang="less" scopeds>
.timebox-card{
    width: 500px;
    &-img{
        width: 50px;
        border-radius: 50%; 
    }
}
.el-popup-parent--hidden {
      padding-right: 0 !important;
    }
</style>