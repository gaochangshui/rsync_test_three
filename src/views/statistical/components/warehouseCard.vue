<template>
    <div v-show="warehouseShow">
        <el-card class="box-card" shadow="hover">
            <div>
                <img :src="warehouseCardData.url" class="box-card-img" />
                <span class="box-card-name" @click="skipMember">{{warehouseCardData.name}}</span>
                <span style="float:right;color: gray;">#{{echartsId}}</span>
            </div>
             <div style="margin-top:10px">
                <span>提交次数:
                    <span class="box-card-commit">
                        {{warehouseCardData.count}}
                    </span>增加行:
                    <span class="box-card-add">
                        {{warehouseCardData.add}}
                    </span>删除行:
                    <span class="box-card-del">
                        {{warehouseCardData.del}}
                    </span></span>
             </div>
             <div :id="'warehouseCardEcharts'+echartsId" @click="openDialog" style="cursor: pointer;"></div>        
        </el-card>
        <el-dialog v-model="dialogTableVisible" :width="920" :title="warehouseCardData.name+' : '+selectType">
            <MassageEcharts :warehouseCardData="warehouseCardData"
            :echartsId="echartsId"></MassageEcharts>
        </el-dialog>

    </div>
</template>
<script>
import { defineComponent,ref,onMounted,watch} from "vue";
import * as echarts from 'echarts'
import MassageEcharts from "./massageEcharts.vue";
export default defineComponent({
    name: "warehouseCard",
    computed:{
        MassageEcharts
    },
    props: {
        echartsId: Number,
        warehouseShow: Boolean,
        warehouseCardData: Object,
        selectType:String
    },
    setup(props, cxt) {
        const dialogTableVisible=ref(false)
        const skipMember = () => {
            if(props.warehouseCardData.id){
                cxt.emit("contentSelect", [props.warehouseCardData.id], "u", 1);
            }else{
                cxt.emit("contentSelect", [], "u", 0);
            }
            
        };
        const drawLine = () => {
            let warehouseCardEcharts = echarts.init(document.getElementById("warehouseCardEcharts" + props.echartsId));
            warehouseCardEcharts.resize({
                width: 480,
                height: 250
            });
            warehouseCardEcharts.setOption({
                color: ["orange"],
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: props.warehouseCardData.date
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: props.warehouseCardData.data,
                        type: "line",
                        areaStyle: {}
                    }
                ]
            });
        };
        const openDialog = () => {
            dialogTableVisible.value=true
        };
        watch(()=>props.warehouseCardData, () => {
            echarts.init(document.getElementById("warehouseCardEcharts" + props.echartsId)).dispose();
            drawLine();
        }, { deep: true });
        onMounted(() => {
            drawLine();
        });
        return {
            skipMember,
            openDialog,
            dialogTableVisible
        };
    },
    components: { MassageEcharts }
})
</script>
<style lang="less" scopeds>
.box-card{
    width: 500px;
    &-img{
        width: 50px;
        border-radius: 50%; 
    }
    &-name{
        font-size: 20px;
        position: relative;
        left: 10px;
        top: -16px;
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