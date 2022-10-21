<template>
    <div v-show="memberShow">
        <el-card class="memberbox-card" shadow="hover">
                <span class="memberbox-card-name" @click="skipMember">{{memberCardData.name}}</span>
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
             <div :id="'memberCardEcharts'+echartsId"></div>        
        </el-card>
    </div>
</template>
<script>
import { defineComponent,ref,onMounted,watch} from "vue";
import * as echarts from 'echarts'
export default defineComponent({
    name:'memberCard',
    props:{
        echartsId:Number,
        memberShow:Boolean,
        memberCardData:Object
    },
    setup(props){
        const skipMember = ()=>{
            window.open(props.memberCardData.url); 
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
            console.log(111);
      echarts.init(document.getElementById('memberCardEcharts'+props.echartsId)).dispose();
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
        color: green;
        margin-right: 5px;
    }
    &-del{
        color: red;
    }
}
</style>