<template>
    <div style=" margin-top: 20px;height: 300px;">
        <div id="projectEcharts" v-show="statisticalType==='project' && warehouseShow"></div>
        <div id="memberEcharts" v-show="statisticalType==='member' && memberShow"></div> 
    </div>
</template>
<script>
import { defineComponent, ref , onMounted,watch } from "vue";
import * as echarts from 'echarts'
export default defineComponent({
    name:'echarts',
    props:{
      statisticalType:String,
      selectType:String,
      warehouseList:Object,
      memberList:Object,
      warehouseShow:Boolean,
      memberShow:Boolean,
      warehouseChangeList:Array,
      memberChangeList:Array,
      warehouseTooltip:Array,
      memberTooltip:Array},
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
        '</span>' +  "commit次数: " + (props.warehouseTooltip[params.seriesIndex].cntTooltip[params.dataIndex])+'</p><br/>';
		let add='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + "添加行: " + (props.warehouseTooltip[params.seriesIndex].addTooltip[params.dataIndex])+'</p><br/>';
		let del='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' +  "删除行: " + (props.warehouseTooltip[params.seriesIndex].delTooltip[params.dataIndex])+'</p>';
        if(props.selectType==='commit次数'){
          str=str+add+del;
        }else if(props.selectType==='添加行数'){
          str=str+all+del;
        }else{
          str=str+all+add;
        }
        return str;
		}
		
	},
  legend: {
    data:props.warehouseList.nameList
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '17%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  dataZoom: [
  {
            //默认为滚动条型数据区域缩放组件
            show: true,
            start: 0,
            end: 60
        },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.warehouseList.xList,
    axisLabel: {//interval设置成 0 强制显示所有标签     

 },
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
        '</span>' + "commit次数 : " + (props.memberTooltip[params.seriesIndex].cntTooltip[params.dataIndex])+'</p><br/>';
		let add='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' + "添加行: " + (props.memberTooltip[params.seriesIndex].addTooltip[params.dataIndex])+'</p><br/>';
		let del='<p style="display:inline-block;">'+
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+params.color+'">'+
        '</span>' +  "删除行: " + (props.memberTooltip[params.seriesIndex].delTooltip[params.dataIndex])+'</p>';
        if(props.selectType==='commit次数'){
          str=str+add+del;
        }else if(props.selectType==='添加行数'){
          str=str+all+del;
        }else{
          str=str+all+add;
        }
        return str;
		}
		
	},
  legend: {
    data: props.memberList.nameList
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '17%',
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
  dataZoom: [
  {
            //默认为滚动条型数据区域缩放组件
            show: true,
            start: 0,
            end: 60
        },
  ],
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