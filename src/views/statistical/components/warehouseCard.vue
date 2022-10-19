<template>
    <div v-show="warehouseShow">
        <el-card class="box-card" shadow="hover">
            <div>
                <img src="	http://172.17.5.146/uploads/-/system/user/avatar/9/avatar.png" class="box-card-img" />
                <span class="box-card-name" @click="skipMember">我是名字</span>
            </div>
             <div style="margin-top:10px">
                <span>提交次数:<span class="box-card-commit">10</span>增加行:<span class="box-card-add">100</span>删除行:<span class="box-card-del">50</span></span>
             </div>
             <div :id="'warehouseCardEcharts'+echartsId"></div>        
        </el-card>
    </div>
</template>
<script>
import { defineComponent,ref,onMounted} from "vue";
import * as echarts from 'echarts'
export default defineComponent({
    name:'warehouseCard',
    props:{
        echartsId:Number,
        warehouseShow:Boolean
    },
    setup(props){
        const skipMember = ()=>{
           console.log(111) 
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
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
        color: red;
        margin-right: 5px;
    }
    &-del{
        color: green;
    }
}
</style>