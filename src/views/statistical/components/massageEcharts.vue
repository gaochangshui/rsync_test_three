<template>
  <div>
    <div :id="'messageEcharts'+echartsId" ></div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "messageEcharts",
  props:{
    warehouseCardData:Object,
    echartsId: Number,
  },
  setup(props) {
    const drawLine = () => {
      let messageEcharts = echarts.init(
        document.getElementById("messageEcharts"+props.echartsId)
      );
      messageEcharts.resize({
        width: 900,
        height: 260,
      });  
      // 成员、仓库统计card图表
      messageEcharts.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          showContent: true,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "17%",
          containLabel: true
        },
        dataZoom: [
          {
            //默认为滚动条型数据区域缩放组件
            show: true,
            start: 60,
            end: 100,
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: props.warehouseCardData.date,
          axisLabel: {
            //interval设置成 0 强制显示所有标签
          }
        },
        yAxis: {
          type: "value"
        },
        series: [{
            name:props.warehouseCardData.name,
            type: "line",
            data:props.warehouseCardData.data
        }]
            
      });   
    };
    
    watch(()=>props.warehouseCardData, () => {
      echarts.init(document.getElementById("messageEcharts")).dispose();
      setTimeout(() => {
        drawLine();
      }, 1000); 
    },{deep:true});
    onMounted(() => {
      drawLine();
    });
    return {};
  },
});
</script>
