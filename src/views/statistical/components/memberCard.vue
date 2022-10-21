<template>
    <div v-show="memberShow">
        <el-card class="memberbox-card" shadow="hover">
                <span class="memberbox-card-name" >{{memberCardData.name}}</span>
                <span style="float:right;color: gray;">#{{echartsId}}</span>
             <div style="margin-top:10px">
                <span>提交次数:
                    <span class="box-card-commit">
                        {{memberCardData.count}}
                    </span>增加行:
                    <span class="box-card-add">
                        {{memberCardData.add}}
                    </span>删除行:
                    <span class="box-card-del">
                        {{memberCardData.del}}
                    </span></span>
             </div>
             <div style="cursor: pointer;width:480px;height: 250px;">
                <div :id="'memberCardEcharts'+echartsId" @click="openDialog" ></div>
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
    name:'memberCard',
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
        let memberCardEcharts=echarts.init(document.getElementById('memberCardEcharts'+props.echartsId));
        memberCardEcharts.resize({
                width: 480,
                height: 250
            });   
            memberCardEcharts.setOption({
                color:["orange"],
                xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.memberCardData.date
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.memberCardData.data,
      type: 'line',
      areaStyle: {}
    }
  ]
        })  
    }
    watch(props.memberCardData, () => {
      echarts.init(document.getElementById('memberCardEcharts'+props.echartsId)).dispose();
      drawLine()
    },
    { deep: true });
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
.memberbox-card{
    width: 500px;
    &-img{
        width: 50px;
        border-radius: 50%; 
    }
    &-name{
        font-size: 20px;
    }
    &-commit{
        color: orange;
        margin-right: 5px;
    }
    &-add{
        color: green;
        margin-right: 5px;
    }
    &-del{
        color: red;
    }
}
</style>