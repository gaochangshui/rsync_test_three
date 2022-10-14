<template>
    <div>
        <div style="margin-left:20px;margin-top: 20px;" v-show="statisticalType==='project'">
            <el-table :data="tableData" style="width: 98%">
                <el-table-column prop="warehouseID" label="仓库ID" />
                <el-table-column prop="warehouseName" label="仓库名" />
                <el-table-column prop="commitMessage" label="commit message" />
                <el-table-column prop="addRow" label="增加行" />
                <el-table-column prop="deleteRows" label="删除行" />
                <el-table-column prop="allChangeRows" label="总修改行"/>
                <el-table-column prop="commitTime" label="commit time" />
                <el-table-column prop="commitEmail" label="提交邮箱"/>
                <el-table-column prop="userID" label="社员号" />
                <el-table-column prop="userName" label="社员名" />
            </el-table>
        </div>
        <div style="margin-left:20px;margin-top: 20px;" v-show="statisticalType==='member'">
            <el-table :data="tableData" style="width: 98%">
                <el-table-column prop="userID" label="社员号" />
                <el-table-column prop="userName" label="社员名" />
                <el-table-column prop="commitMessage" label="commit message" />
                <el-table-column prop="addRow" label="增加行" />
                <el-table-column prop="deleteRows" label="删除行" />
                <el-table-column prop="allChangeRows" label="总修改行"/>
                <el-table-column prop="commitTime" label="commit time" />
                <el-table-column prop="commitEmail" label="提交邮箱"/>
                <el-table-column prop="warehouseID" label="仓库ID" />
                <el-table-column prop="warehouseName" label="仓库名" />
            </el-table>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref  } from "vue";
export default defineComponent({
    name:'inforTable',
    props:{statisticalType:String},
    setup(){
        const tableData = ref([
            {
                warehouseID:'1-1',
                warehouseName:'1-2',
                commitMessage:'1-3',
                addRow:'1-4',
                deleteRows:'1-5',
                allChangeRows:'1-6',
                commitTime:'1-7',
                commitEmail:'1-8',
                userID:'1-9',
                userName:'1-10'
            },{
                warehouseID:'2-1',
                warehouseName:'2-2',
                commitMessage:'2-3',
                addRow:'2-4',
                deleteRows:'2-5',
                allChangeRows:'2-6',
                commitTime:'2-7',
                commitEmail:'2-8',
                userID:'2-9',
                userName:'2-10'
            },{
                warehouseID:'3-1',
                warehouseName:'3-2',
                commitMessage:'3-3',
                addRow:'3-4',
                deleteRows:'3-5',
                allChangeRows:'3-6',
                commitTime:'3-7',
                commitEmail:'3-8',
                userID:'3-9',
                userName:'3-10'
            },{
                warehouseID:'4-1',
                warehouseName:'4-2',
                commitMessage:'4-3',
                addRow:'4-4',
                deleteRows:'4-5',
                allChangeRows:'4-6',
                commitTime:'4-7',
                commitEmail:'4-8',
                userID:'4-9',
                userName:'4-10'
            }
        ]) 
        return {
            tableData
        }
    }

})
</script>