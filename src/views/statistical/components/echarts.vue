<template>
  <div style="margin-top: 20px; height: 300px">
    <div
      id="projectEcharts"
      v-show="statisticalType === 'project' && warehouseShow"
    ></div>
    <div
      id="memberEcharts"
      v-show="statisticalType === 'member' && memberShow"
    ></div>
    <div v-show="statisticalType === 'takentime'" style="display:flex">
      <div id="timeEchartsTask"></div>
      <div id="timeEchartsLine"></div>
      <div id="timeEchartsMember"></div>
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
    warehouseChangeList: Array,
    memberChangeList: Array,
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
      projectEcharts.resize({
        width: document.documentElement.clientWidth - 350,
        height: 260,
      });
      memberEcharts.resize({
        width: document.documentElement.clientWidth - 350,
        height: 260,
      });
      timeEchartsTask.resize({
        width: document.documentElement.clientWidth - 1450,
        height: 260,
      });
      timeEchartsLine.resize({
        width: document.documentElement.clientWidth - 1300,
        height: 260,
      });
      timeEchartsMember.resize({
        width: document.documentElement.clientWidth - 1450,
        height: 260,
      });
      // 监听浏览器宽高变化改变图标宽度
      window.onresize = function () {
        projectEcharts.resize({
          width: document.documentElement.clientWidth - 350,
          height: 260,
        });
        memberEcharts.resize({
          width: document.documentElement.clientWidth - 350,
          height: 260,
        });
        // timeEchartsTask.resize({
        //   width: document.documentElement.clientWidth - 1450,
        //   height: 260,
        // });
        // timeEchartsLine.resize({
        //   width: document.documentElement.clientWidth - 1200,
        //   height: 260,
        // });
        // timeEchartsMember.resize({
        //   width: document.documentElement.clientWidth - 1450,
        //   height: 260,
        // });
      };
      // 仓库统计图表数据
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
              "commit次数: " +
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
        toolbox: {
          feature: {
            saveAsImage: {},
          },
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
          data: props.warehouseList.xList,
          axisLabel: {
            //interval设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          type: "value",
        },
        series: props.warehouseList.yList,
      });
      // 成员统计图表
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
            //默认为滚动条型数据区域缩放组件
            show: true,
            start: 60,
            end: 100,
          },
        ],
        series: props.memberList.yList,
      });
      // 工时统计饼状图task别
      timeEchartsTask.setOption({
        title: {
          text: "工时统计tesk别",
          left: "right",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            center: ["60%", "60%"],
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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
      // 工时统计项目折线图
      timeEchartsLine.setOption({
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
            //默认为滚动条型数据区域缩放组件
            show: true,
            start: 60,
            end: 100,
          },
        ],
        series: props.memberList.yList,
      })
      // 工时统计饼状图人别
      timeEchartsMember.setOption({
        title: {
          text: "工时统计人别",
          left: "left",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            center: ["40%", "60%"],
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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
    };
    watch(props.warehouseList, () => {
      echarts.init(document.getElementById("projectEcharts")).dispose();
      drawLine();
    });
    watch(props.memberList, () => {
      echarts.init(document.getElementById("memberEcharts")).dispose();
      drawLine();
    });
    onMounted(() => {
      drawLine();
    });
    return {};
  },
});
</script>
