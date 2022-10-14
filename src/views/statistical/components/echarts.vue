<template>
    <div style="height:30vh; margin-top: 10px;">
        <div id="projectEcharts" v-show="statisticalType==='project'"></div>
        <div id="memberEcharts" v-show="statisticalType==='member'"></div>
    </div>
</template>
<script>
import { defineComponent, ref , onMounted,watch } from "vue";
import * as echarts from 'echarts'
export default defineComponent({
    name:'echarts',
    props:{statisticalType:String},
    setup(){
        onMounted(()=>{
            let a = 2;
        let projectEcharts=echarts.init(document.getElementById('projectEcharts'));
        let memberEcharts=echarts.init(document.getElementById('memberEcharts'));
        let projectEchartsSize=projectEcharts.resize({
                width: (document.documentElement.clientWidth-350),
                height: 260
            });
        let memberEchartsSize=memberEcharts.resize({
                width: (document.documentElement.clientWidth-350),
                height: 260
            });
        window.onresize = function() {
            projectEchartsSize()
            memberEchartsSize()
        };    
        projectEcharts.setOption({
            title: {},
  tooltip: {
    trigger: 'item',
    showContent:true,
    formatter: function (params) {
		let str=params.seriesName+"<br/>";
		let p='<p style="display:inline-block;width:120px;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + params.seriesName + " : " + (params.data-a)+'</p>';
		str+=p;
        return str;
		}
		
	},
  legend: {
    data: ['11', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
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
      name: '11',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
        })  
        
        memberEcharts.setOption({
            title: {},
  tooltip: {
    trigger: 'item',
    showContent:true,
    formatter: function (params) {
		let str=params.seriesName+"<br/>";
		let p='<p style="display:inline-block;width:120px;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + params.seriesName + " : " + (params.data-a)+'</p>';
		str+=p;
        return str;
		}
		
	},
  legend: {
    data: ['22', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
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
      name: '22',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
        })  
        })
       return{
       } 
    }
})
</script>