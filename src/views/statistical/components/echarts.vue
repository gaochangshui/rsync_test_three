<template>
  <div :style="statisticalType === 'takentime' && timeShow?echartsStyle1:echartsStyle2">
    <div
      id="projectEcharts"
      v-show="statisticalType === 'project' && warehouseShow"
    ></div>
    <div
      id="memberEcharts"
      v-show="statisticalType === 'member' && memberShow"
    ></div>
    <div id="echartsBox" >
      <div class="timeEchartsBox">
        <div id="timeEchartsTask" v-show="statisticalType === 'takentime' && timeShow" style="border-right: 1px solid #e4e7ed;"></div>
        <div id="allTimeEcharts" v-show="statisticalType === 'takentime' && timeShow" style="border-right: 1px solid #e4e7ed;"></div>
      <div id="timeEchartsMember" v-show="statisticalType === 'takentime' && timeShow" style="border-left: 1px solid #e4e7ed;"></div>
      </div>
      <div id="timeEchartsLine" v-show="statisticalType === 'takentime' && timeShow" style="padding-left:10px;padding-right:30px"></div>
      </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "echarts",
  props: {
    statisticalType: String,
    selectType: String,
    warehouseList: Object,
    memberList: Object,
    warehouseShow: Boolean,
    memberShow: Boolean,
    timeShow:Boolean,
    warehouseChangeList: Array,
    memberChangeList: Array,
    timeList:Object,
    warehouseTooltip: Array,
    memberTooltip: Array,
  },
  setup(props) {
    const drawLine = () => {
      let projectEcharts = echarts.init(
        document.getElementById("projectEcharts")
      );
      let memberEcharts = echarts.init(
        document.getElementById("memberEcharts")
      );
      let timeEchartsTask = echarts.init(
        document.getElementById("timeEchartsTask")
      );
      let timeEchartsLine = echarts.init(
        document.getElementById("timeEchartsLine")
      );
      let timeEchartsMember = echarts.init(
        document.getElementById("timeEchartsMember")
      );
      let allTimeEcharts = echarts.init(
        document.getElementById("allTimeEcharts")
      );
      projectEcharts.resize({
        width: document.documentElement.clientWidth - 350,
        height: 260,
      });
      memberEcharts.resize({
        width: document.documentElement.clientWidth - 350,
        height: 260,
      });
      timeEchartsTask.resize({
        width: document.getElementById('echartsBox').clientWidth/3.7,
        height: 260,
      });
      timeEchartsLine.resize({
        width: document.documentElement.clientWidth - 350,
        height: 260,
      });
      timeEchartsMember.resize({
        width: document.getElementById('echartsBox').clientWidth/3.7,
        height: 260,
      });
      allTimeEcharts.resize({
        width: document.getElementById('echartsBox').clientWidth/2.5,
        height: 260,
      });
      // ?????????????????????????????????????????????
      window.onresize = function () {
        projectEcharts.resize({
          width: document.documentElement.clientWidth - 350,
          height: 260,
        });
        memberEcharts.resize({
          width: document.documentElement.clientWidth - 350,
          height: 260,
        });
        timeEchartsTask.resize({
          width: document.getElementById('echartsBox').clientWidth/3.7,
        height: 260,
      });
      timeEchartsLine.resize({
        width: document.documentElement.clientWidth - 350,
        height: 260,
      });
      timeEchartsMember.resize({
        width: document.getElementById('echartsBox').clientWidth/3.7,
        height: 260,
      });
      allTimeEcharts.resize({
        width: document.getElementById('echartsBox').clientWidth/2.5,
        height: 260,
      });
      };
      // ????????????????????????
      projectEcharts.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          showContent: true,
          formatter: function (params) {
            let str = params.seriesName + "<br/>";
            let time = params.name + "<br/>";
            let all =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              "commit??????: " +
              props.warehouseTooltip[params.seriesIndex].cntTooltip[
                params.dataIndex
              ] +
              "</p><br/>";
            let add =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              "Additions: " +
              props.warehouseTooltip[params.seriesIndex].addTooltip[
                params.dataIndex
              ] +
              "</p><br/>";
            let del =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              "Deletions: " +
              props.warehouseTooltip[params.seriesIndex].delTooltip[
                params.dataIndex
              ] +
              "</p>";
            if (props.selectType === "Commits") {
              str = str + time + add + del;
            } else if (props.selectType === "Additions") {
              str = str + time + all + del;
            } else {
              str = str + time + all + add;
            }
            return str;
          },
        },
        legend: {
          data: props.warehouseList.nameList,
          type: "scroll", //????????????
          orient: "horizontal",
          padding: [0, 50, 0, 0],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "17%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            //?????????????????????????????????????????????
            show: true,
            start: 60,
            end: 100,
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: props.warehouseList.xList,
          axisLabel: {
            //interval????????? 0 ????????????????????????
          },
        },
        yAxis: {
          type: "value",
        },
        series: props.warehouseList.yList,
      });
      // ??????????????????
      memberEcharts.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          showContent: true,
          formatter: function (params) {
            let str = params.seriesName + "<br/>";
            let time = params.name + "<br/>";
            let all =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              "Commits : " +
              props.memberTooltip[params.seriesIndex].cntTooltip[
                params.dataIndex
              ] +
              "</p><br/>";
            let add =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              "Additions: " +
              props.memberTooltip[params.seriesIndex].addTooltip[
                params.dataIndex
              ] +
              "</p><br/>";
            let del =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              "Deletions: " +
              props.memberTooltip[params.seriesIndex].delTooltip[
                params.dataIndex
              ] +
              "</p>";
            if (props.selectType === "Commits") {
              str = str + time + add + del;
            } else if (props.selectType === "Additions") {
              str = str + time + all + del;
            } else {
              str = str + time + all + add;
            }
            return str;
          },
        },
        legend: {
          data: props.memberList.nameList,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "17%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: props.memberList.xList,
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            //?????????????????????????????????????????????
            show: true,
            start: 60,
            end: 100,
          },
        ],
        series: props.memberList.yList,
      });
      // ?????????????????????task???			
      let option={
        title: {
          text: "?????????",
          right: "32%",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params){
            let str = "????????????<br/>";
            let add =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              params.name +
              params.value +
              "</p>";
              console.log(params);
              let all=0
              for(let i = 0;i<option.series[0].data.length;i++){
                all=all+Number(option.series[0].data[i].value)
              }
              return str+add+'('+((Number(params.value)/all)*100).toFixed(2)+'%)'
             },
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "left",
          top:"10%"
        },
        series: [
          {
            name: "????????????",
            type: "pie",
            radius: "50%",
            center: ["60%", "60%"],
            data: props.timeList.taskPie,
            label: {
             //echarts?????????????????????????????????
             show: true,
             position: "inside", //outside ????????????  inside ????????????
             formatter: function (params){
              return params.value
             },
             color: "#ffffff", //??????
             fontSize: 11//????????????
           },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      }
      timeEchartsTask.setOption(option);
      // ???????????????????????????
      timeEchartsLine.clear()
      timeEchartsLine.setOption({
         title: {},
        tooltip: {
          trigger: "axis",
          showContent: true,
        },
        legend: {
          data: props.timeList.taskList,
          type: "scroll",
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
          data: props.timeList.date,
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            //?????????????????????????????????????????????
            show: true,
            start: 60,
            end: 100,
          },
        ],
        series: props.timeList.yList,
      })
      // ???????????????????????????
      timeEchartsMember.setOption({
        title: {
          text: "??????",
          left: "34%",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params){
            let str = "????????????<br/>";
            let add =
              '<p style="display:inline-block;">' +
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              params.color +
              '">' +
              "</span>" +
              params.name +
              params.value +
              "</p>";
              console.log(params);
              let all=0
              for(let i = 0;i<option.series[0].data.length;i++){
                all=all+Number(option.series[0].data[i].value)
              }
              return str+add+'('+((Number(params.value)/all)*100).toFixed(2)+'%)'
             },
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "right",
          top:'10%',
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            center: ["40%", "60%"],
            data: props.timeList.userPie,
            label: {
             //echarts?????????????????????????????????
             show: true,
             position: "inside", //outside ????????????  inside ????????????
             formatter: function (params){
              return params.value
             },
             color: "#ffffff", //??????
             fontSize: 11//????????????
           },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      console.log(props.timeList);
      allTimeEcharts.setOption({
        title: {
    text: '????????????',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['55%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#13ce66',
        color: '#13ce66',
        borderWidth: 2
      },
      label: {
        show: true,
        fontSize: '40',
        position: 'center'
      },
      data: [
        { value: props.timeList.allTotal, name: props.timeList.allTotal }
      ]
    }
  ]
      })
    };
    watch(props.warehouseList, () => {
      echarts.init(document.getElementById("projectEcharts")).dispose();
      drawLine();
    });
    watch(props.memberList, () => {
      echarts.init(document.getElementById("memberEcharts")).dispose();
      drawLine();
    });
    watch(props.timeList,()=>{
      console.log(11);
      echarts.init(
        document.getElementById("timeEchartsTask")
      ).dispose;
      echarts.init(
        document.getElementById("timeEchartsLine")
      ).dispose;
      echarts.init(
        document.getElementById("timeEchartsMember")
      ).dispose;
      drawLine();
    })
    onMounted(() => {
      drawLine();
    });
    return {};
  },
});
</script>
<style>
.timeEchartsBox{
  display:flex;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 10px;
}
.echartsStyle1{
  margin-top: 20px;
  height: 500px
}
.echartsStyle2{
  margin-top: 20px;
  height: 300px
}
</style>