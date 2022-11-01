<template>
  <div v-show="timeShow">
    <el-card class="timebox-card" shadow="hover">
      <div>
        <span class="timebox-card-name">{{ timeCardData.name }}</span>
        <span style="float:right;color: gray;">#{{echartsId}}</span>
      </div>
      <div style="margin-top:10px">
                <span>消耗总数:
                    <span >
                        {{ timeCardData.total }}
                    </span></span>
             </div>
      <div style="cursor: pointer; width: 480px; height: 250px">
        <div :id="'timeCardEcharts' + echartsId" @click="openDialog"></div>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogTableVisible"
      :width="920"
      :title="timeCardData.name"
    >
      <TimeMassageEcharts
        :echartsId="echartsId"
        :timeCardData="timeCardData"
        :timeCardFlag="timeCardFlag"
      ></TimeMassageEcharts>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import TimeMassageEcharts from "./timeMassageEcharts.vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "timeCard",
  components: {
    TimeMassageEcharts,
  },
  props: {
    echartsId: Number,
    timeShow: Boolean,
    timeCardData: Object,
  },
  setup(props) {
    console.log(props.timeCardData);
    const dialogTableVisible = ref(false);
    const timeCardFlag = ref(true)
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
      timeCardFlag,
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
