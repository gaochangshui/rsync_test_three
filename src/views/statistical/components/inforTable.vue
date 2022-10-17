<template>
    <div>
        <div style="margin-left:20px;" v-show="statisticalType==='project' && warehouseShow">
            <el-table :data="warehouseTableData" style="width: 98%" max-height="450px" id="infortabla1">
                <el-table-column prop="project_id" label="仓库ID" />
                <el-table-column prop="project_name" label="仓库名" />
                <el-table-column prop="message" label="commit message" />
                <el-table-column prop="additions" label="增加行" />
                <el-table-column prop="deletions" label="删除行" />
                <el-table-column prop="total" label="总修改行"/>
                <el-table-column prop="committed_date" label="commit time" />
                <el-table-column prop="committer_email" label="提交邮箱"/>
                <el-table-column prop="committer_id" label="社员号" />
                <el-table-column prop="committer_name" label="社员名" />
            </el-table>
        </div>
        <div style="margin-left:20px;margin-top: 10px;" v-show="statisticalType==='member'  && memberShow">
            <el-table :data="memberTableData" style="width: 98%" max-height="450px" id="infortabla2">
                <el-table-column prop="committer_id" label="社员号" />
                <el-table-column prop="committer_name" label="社员名" />
                <el-table-column prop="message" label="commit message" />
                <el-table-column prop="additions" label="增加行" />
                <el-table-column prop="deletions" label="删除行" />
                <el-table-column prop="total" label="总修改行"/>
                <el-table-column prop="committed_date" label="commit time" />
                <el-table-column prop="committer_email" label="提交邮箱"/>
                <el-table-column prop="project_id" label="仓库ID" />
                <el-table-column prop="project_name" label="仓库名" />
            </el-table>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref ,watch , onBeforeUpdate} from "vue";
export default defineComponent({
    name:'inforTable',
    props:{statisticalType:String,
        memberTable:Array,
        warehouseTable:Array,
        warehouseShow:Boolean,
        memberShow:Boolean
    },
    setup(props){
        const warehouseTableData = ref(props.warehouseTable); 
        const memberTableData = ref(props.memberTable); 
        onBeforeUpdate(()=>{
            warehouseTableData.value = props.warehouseTable;
            memberTableData.value = props.memberTable;
        })
        return {
            warehouseTableData,
            memberTableData
        }
    }

})
</script>