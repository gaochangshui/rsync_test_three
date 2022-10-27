<template>
  <div v-show="timeShow">
    <el-card class="timebox-card" shadow="hover">
      <span class="timebox-card-name">{{ timeCardData.name }}</span>
      <div style="cursor: pointer; width: 480px; height: 250px">
        <div :id="'timeCardEcharts' + echartsId" @click="openDialog"></div>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogTableVisible"
      :width="920"
      :title="timeCardData.name + ' : ' + selectType"
    >
      <MassageEcharts
        :timeCardData="timeCardData"
        :echartsId="echartsId"
      ></MassageEcharts>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import MassageEcharts from "./massageEcharts.vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "timeCard",
  components: {
    MassageEcharts,
  },
  props: {
    echartsId: Number,
    timeShow: Boolean,
    timeCardData: Object,
    selectType: String,
  },
  setup(props) {
    const dialogTableVisible = ref(false);
    const openDialog = () => {
      dialogTableVisible.value = true;
    };
    const drawLine = () => {
      let timeCardEcharts = echarts.init(
        document.getElementById("timeCardEcharts" + props.echartsId)
      );
      timeCardEcharts.resize({
        width: 480,
        height: 250,
      });
      timeCardEcharts.setOption({
        tooltip: {
          trigger: "axis",
          showContent: true,
        },
        legend: {
          data: props.timeCardData.nameList,
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
          data: props.timeCardData.date,
        },
        yAxis: {
          type: "value",
        },
        series:props.timeCardData.udata,
      });
    };
    watch(
      () => props.timeCardData,
      () => {
        echarts
          .init(document.getElementById("timeCardEcharts" + props.echartsId))
          .dispose();
        drawLine();
      }
    );
    onMounted(() => {
      drawLine();
    });
    return {
      openDialog,
      dialogTableVisible,
    };
  },
});
</script>
<style lang="less" scopeds>
.timebox-card {
  width: 500px;
  &-img {
    width: 50px;
    border-radius: 50%;
  }
}
.el-popup-parent--hidden {
  padding-right: 0 !important;
}
</style>
