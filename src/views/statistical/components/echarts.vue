<template>
    <div style=" margin-top: 20px;">
        <div id="projectEcharts" v-show="statisticalType==='project' && warehouseShow"></div>
        <div id="memberEcharts" v-show="statisticalType==='member' && memberShow"></div> 
    </div>
</template>
<script>
import { defineComponent, ref , onMounted,watch } from "vue";
import * as echarts from 'echarts'
import { log } from "console";
export default defineComponent({
    name:'echarts',
    props:{
      statisticalType:String,
      warehouseList:Object,
      memberList:Object,
      warehouseShow:Boolean,
      memberShow:Boolean,
      warehouseChangeList:Array,
      memberChangeList:Array},
    setup(props){
      const drawLine=()=>{
        let projectEcharts=echarts.init(document.getElementById('projectEcharts'));
        let memberEcharts=echarts.init(document.getElementById('memberEcharts'));
        projectEcharts.resize({
                width: (document.documentElement.clientWidth-350),
                height: 260
            });
        memberEcharts.resize({
                width: (document.documentElement.clientWidth-350),
                height: 260
            });
        window.onresize = function() {
            projectEcharts.resize({
                width: (document.documentElement.clientWidth-350),
                height: 260
            });
            memberEcharts.resize({
                width: (document.documentElement.clientWidth-350),
                height: 260
            });
        };    
         projectEcharts.setOption({
            title: {},
  tooltip: {
    trigger: 'item',
    showContent:true,
    formatter: function (params) {
		let str=params.seriesName+"<br/>";
		let all='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + "总修改行 : " + (params.data)+'</p><br/>';
		let add='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + "添加行: " + (props.warehouseChangeList[params.seriesIndex].add[params.dataIndex])+'</p><br/>';
		let del='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' +  "删除行: " + (props.warehouseChangeList[params.seriesIndex].del[params.dataIndex])+'</p>';
		str=str+all+add+del;
        return str;
		}
		
	},
  legend: {
    data:props.warehouseList.nameList
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
    data: props.warehouseList.xList
  },
  yAxis: {
    type: 'value'
  },
  series: props.warehouseList.yList
        })  
        
        memberEcharts.setOption({
            title: {},
  tooltip: {
    trigger: 'item',
    showContent:true,
    formatter: function (params) {
      let str=params.seriesName+"<br/>";
		let all='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + "总修改行 : " + (params.data)+'</p><br/>';
		let add='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + "添加行: " + (props.memberChangeList[params.seriesIndex].add[params.dataIndex])+'</p><br/>';
		let del='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' +  "删除行: " + (props.memberChangeList[params.seriesIndex].del[params.dataIndex])+'</p>';
		str=str+all+add+del;
        return str;
		}
		
	},
  legend: {
    data: props.memberList.nameList
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
    data: props.memberList.xList
  },
  yAxis: {
    type: 'value'
  },
  series: props.memberList.yList
        })
      }
      watch(props.warehouseList, () => {
      echarts.init(document.getElementById('projectEcharts')).dispose();
      drawLine()
    });
      watch(props.memberList, () => {
      echarts.init(document.getElementById('memberEcharts')).dispose();
      drawLine()
    });
        onMounted(()=>{
            drawLine()
        })
       return{
       } 
    }
})
</script>