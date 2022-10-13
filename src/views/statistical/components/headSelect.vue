<template>
    <div>
        <div v-show="statisticalType==='project'" class="projectHead">
            <div>
                <span>群组：</span>
                <el-select v-model="groupValue" class="m-2" placeholder="Select">
                    <el-option
                    v-for="item in groupOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>  
            <div>
                <span>项目：</span>
                <el-select v-model="projectValue" class="m-2" placeholder="Select">
                    <el-option
                    v-for="item in projectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>  
            <div>
                <span>仓库：</span>
                <el-select v-model="warehouseValue" multiple collapse-tags collapse-tags-tooltip class="m-2" placeholder="Select">
                    <el-option
                    v-for="item in warehouseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>  
            <div>
                <span>日期：</span>
                <el-date-picker
                    v-model="dateValue1"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :size="size"
                />
            </div>  
            <el-button type="primary">查询</el-button>
            <el-button type="primary" disabled>下载</el-button>
        </div>
        <div v-show="statisticalType==='member'" class="memberHead">
            <div>
                <span>成员：</span>
                <el-select v-model="memberValue" multiple collapse-tags collapse-tags-tooltip class="m-2" placeholder="Select">
                    <el-option
                    v-for="item in memberOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>
            <div>
                <span>日期：</span>
                <el-date-picker
                    v-model="dateValue2"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :size="size"
                />
            </div>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" disabled>下载</el-button>   
        </div>
    </div>
</template>
<script>
import { defineComponent, ref , computed } from "vue";
export default defineComponent({
    name:'headSelect',
    props:{statisticalType:String},
    setup(){
        const groupValue=ref(null);
        const projectValue=ref(null);
        const warehouseValue=ref(null);
        const memberValue=ref(null);
        const dateValue1=ref(null);
        const dateValue2=ref(null);
        const groupOptions=ref([{
            value:1,
            label:1
        },{
            value:2,
            label:2
        },{
            value:3,
            label:3
        }]);  
        const projectOptions=ref([{
            value:1,
            label:1
        },{
            value:2,
            label:2
        },{
            value:3,
            label:3
        }]);
        const warehouseOptions=ref([{
            value:1,
            label:1
        },{
            value:2,
            label:2
        },{
            value:3,
            label:3
        }]);
        const memberOptions=ref([{
            value:1,
            label:1
        },{
            value:2,
            label:2
        },{
            value:3,
            label:3
        }]);
        return{
            groupValue,
            projectValue,
            groupOptions,
            projectOptions,
            warehouseValue,
            warehouseOptions,
            memberValue,
            memberOptions,
            dateValue1,
            dateValue2
        }
    }

})
</script>
<style scoped>
.projectHead{
    display: flex;
}
.projectHead div,.projectHead .el-button{
    margin-left: 10px;
}
.memberHead{
    display: flex;
}
.memberHead div,.memberHead .el-button{
    margin-left: 10px;
}

</style>