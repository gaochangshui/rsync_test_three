<template>
    <div v-show="warehouseShow">
        <el-card class="box-card" shadow="hover">
            <div>
                <img :src="warehouseCardData.url" class="box-card-img" />
                <span class="box-card-name" @click="skipMember">{{warehouseCardData.name}}</span>
                <span style="float:right;color: gray;">#{{echartsId}}</span>
            </div>
             <div style="margin-top:10px">
                <span>提交次数:
                    <span class="box-card-commit">
                        {{warehouseCardData.count}}
                    </span>增加行:
                    <span class="box-card-add">
                        {{warehouseCardData.add}}
                    </span>删除行:
                    <span class="box-card-del">
                        {{warehouseCardData.del}}
                    </span></span>
             </div>
             <div :id="'warehouseCardEcharts'+echartsId"></div>        
        </el-card>
    </div>
</template>
<script>
import { defineComponent,ref,onMounted,watch} from "vue";
import * as echarts from 'echarts'
export default defineComponent({
    name:'warehouseCard',
    props:{
        echartsId:Number,
        warehouseShow:Boolean,
        warehouseCardData:Object
    },
    setup(props,cxt){
        const skipMember = ()=>{
            console.log(props.warehouseCardData.id);
            cxt.emit('contentSelect',[props.warehouseCardData.id],'u',1) 
        }
        const drawLine=()=>{
        let warehouseCardEcharts=echarts.init(document.getElementById('warehouseCardEcharts'+props.echartsId));
        warehouseCardEcharts.resize({
                width: 480,
                height: 250
            });   
            warehouseCardEcharts.setOption({
                color:["orange"],
                xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.warehouseCardData.date
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.warehouseCardData.data,
      type: 'line',
      areaStyle: {
//         color: {
//     type: 'linear',
//     x: 0,
//     y: 0,
//     x2: 0,
//     y2: 1,
//     colorStops: [{
//       offset: 0, color: 'rgba(58,132,255, 0.5)'    // 0% 处的颜色
//     }, {
//       offset: 1, color: 'rgba(58,132,255, 0)' //   100% 处的颜色
//     }],
//     global: false // 缺省为 false
//   }
      }
    }
  ]
        })  
    }
        watch(props.warehouseCardData, () => {
            console.log(111);
      echarts.init(document.getElementById('warehouseCardEcharts'+props.echartsId)).dispose();
      drawLine()
    },
    { deep: true });
    
        onMounted(()=>{
            drawLine()
        })
        return {
            skipMember
        }
    }

})
</script>
<style lang="less" scopeds>
.box-card{
    width: 500px;
    &-img{
        width: 50px;
        border-radius: 50%; 
    }
    &-name{
        font-size: 20px;
        position: relative;
        left: 10px;
        top: -16px;
    }
    &-name:hover{
        color: blue;
        cursor: pointer;
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