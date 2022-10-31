<template>
    <div>
      <div :id="'timemessageEcharts'+echartsId" ></div>
    </div>
  </template>
  <script>
  import { defineComponent, ref, onMounted, watch } from "vue";
  import * as echarts from "echarts";
  export default defineComponent({
    name: "timemessageEcharts",
    props:{
      echartsId: Number,
      timeCardData:Object,
      timeCardFlag:Boolean
    },
    setup(props) {
      const drawLine = () => {
        let timemessageEcharts = echarts.init(
          document.getElementById("timemessageEcharts"+props.echartsId)
        );
        timemessageEcharts.resize({
          width: 900,
          height: 400,
        }); 
        //工时统计card图表
          timemessageEcharts.setOption({
          title: {},
          tooltip: {
            trigger: "axis",
            showContent: true,
          },
          legend: {
            data: props.timeCardData.nameList,
            type: "scroll", //分页类型
          orient: "horizontal",
          padding: [0, 50, 0, 0],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "17%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: props.timeCardData.date,
          },
          yAxis: {
            type: "value",
          },
          dataZoom: [
            {
              //默认为滚动条型数据区域缩放组件
              show: true,
              start: 60,
              end: 100,
            },
          ],
          series: props.timeCardData.udata,
      })  
      };
      watch(()=>props.timeCardData, () => {
        echarts.init(document.getElementById("timemessageEcharts"+props.echartsId)).dispose();
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
  