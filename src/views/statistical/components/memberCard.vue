<template>
    <div v-show="memberShow">
        <el-card class="memberbox-card" shadow="hover">
                <span class="memberbox-card-name" @click="skipMember">我是名字</span>
                <span style="float:right;color: gray;">#{{echartsId}}</span>
             <div style="margin-top:10px">
                <span>提交次数:<span class="memberbox-card-commit">10</span>增加行:<span class="memberbox-card-add">100</span>删除行:<span class="memberbox-card-del">50</span></span>
             </div>
             <div :id="'memberCardEcharts'+echartsId"></div>        
        </el-card>
    </div>
</template>
<script>
import { defineComponent,ref,onMounted} from "vue";
import * as echarts from 'echarts'
export default defineComponent({
    name:'memberCard',
    props:{
        echartsId:Number,
        memberShow:Boolean
    },
    setup(props){
        const skipMember = ()=>{
           console.log(111) 
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
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
.memberbox-card{
    width: 500px;
    &-img{
        width: 50px;
        border-radius: 50%; 
    }
    &-name{
        font-size: 20px;
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