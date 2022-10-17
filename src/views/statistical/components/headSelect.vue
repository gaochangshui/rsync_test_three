<template>
    <div>
        <div v-show="statisticalType==='project'" class="projectHead">
            <div>
                <span>群组：</span>
                <el-select v-model="groupValue" class="m-2" placeholder="Select" style="width:260px" @change="getprojectOptions(groupValue)">
                    <el-option
                    v-for="item in groupOptions"
                    :key="item.id"
                    :label="item.nameView+'('+ item.name+')'"
                    :value="item.id"
                    />
                </el-select>
            </div>  
            <div>
                <span>项目：</span>
                <el-cascader :options="projectOptions" 
                :props="props1" 
                clearable
                filterable
                v-model="projectValue"
                @change="getWarehouseOptions()"
                 />
            </div> 
            <div>
                <span>仓库：</span>
                <el-select v-model="warehouseValue"
                 multiple 
                 collapse-tags 
                 collapse-tags-tooltip
                 filterable 
                 class="m-2" 
                 size="default"
                 style="width:300px"
                 placeholder="Select">
                    <el-option
                    v-for="item in warehouseOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    />
                </el-select>
            </div>  
            <div>
                <span>日期：</span>
                <el-date-picker
                    v-model="dateValue1"
                    type="daterange"
                    :disabled-date="disabledDate"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:230px"
                    value-format="YYYY-MM-DD"
                />
            </div>  
            <el-button type="primary" @click="warehouseSelect()">查询</el-button>
            <el-button type="primary" :disabled="!warehouseShow" @click="downLoad()">下载</el-button>
        </div>
        <div v-show="statisticalType==='member'" class="memberHead">
            <div>
                <span>成员：</span>
                <el-select 
                v-model="memberValue" 
                multiple 
                collapse-tags 
                collapse-tags-tooltip
                filterable
                :filter-method="(value)=>memberFilter(value)" 
                style="width:300px;"
                class="m-2" 
                size="default"
                placeholder="Select">
                    <el-option
                    v-for="item in memberOptions"
                    :key="item.username"
                    :label="item.name+'('+item.username+')'"
                    :value="item.username"
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
                    :disabled-date="disabledDate"
                    value-format="YYYY-MM-DD"
                />
            </div>
            <el-button type="primary" @click="memberSelect()">查询</el-button>
            <el-button type="primary" :disabled="!memberShow"  @click="downLoad()">下载</el-button>   
        </div>
    </div>
</template>
<script>
import { defineComponent, ref , computed } from "vue";
import axios from '@/http';
import { exportTable2Excel } from "@/utils/excel";
export default defineComponent({
    name:'headSelect',
    props:{statisticalType:String,
        warehouseShow:Boolean,
        memberShow:Boolean},
    setup(props,cxt){
        const groupValue=ref(null);
        const allprojectValue=ref(null);
        const projectValue=ref(null);
        const warehouseValue=ref(null);
        const memberValue=ref(null);
        const dateValue1=ref(null);
        const dateValue2=ref(null);
        const disabledDate = (time)=> {
        var timeNow = Date.now();
        var before = timeNow - 24 * 60 * 60 * 1000;
        return time.getTime() > before;
      }
        const props1=ref({
        checkStrictly: true,
      },);
        const groupOptions=ref([]);  
        const projectOptions=ref([]);
        const warehouseOptions=ref([]);
        const memberOptions=ref([]);
        const copyMemberOputio=ref([])
        const downLoad = ()=>{
            if(props.statisticalType==='project'){
                exportTable2Excel('infortabla1' + "", '仓库统计');
            }else{
                exportTable2Excel('infortabla2' + "", '成员统计');
            }
            
        }
        const getMemberOptions = ()=>{
            axios.get('/actionapi/GitlabCodeAnalysis/GetMembers'
            ).then((e)=>{
                memberOptions.value=e.data
                copyMemberOputio.value=e.data
            })
        }
        const getGroupOptions = ()=>{
            axios.get('/actionapi/projects/GetLocationGroup'
            ).then((e)=>{
                groupOptions.value=e.data.location;
                allprojectValue.value=JSON.parse(e.data.group)
            })
        }
        const getprojectOptions = (val)=>{
            projectOptions.value=allprojectValue.value.filter((item)=>{
                return Number(item.value)===val
            })[0].children
        };
        const getWarehouseOptions = ()=>{
            axios.get('/actionapi/GitlabCodeAnalysis/GetWareHouse',{
                params:{
                    namespace_id:projectValue.value[projectValue.value.length-1]
                }
            }).then((e)=>{
                warehouseOptions.value=e.data
                warehouseValue.value=[]
            })
        };
        const warehouseSelect = ()=>{
            cxt.emit('warehouseSelect',warehouseValue.value,dateValue1.value)
        };
        const memberSelect = ()=>{
            cxt.emit('memberSelect',memberValue.value,dateValue2.value)
        };
        const  memberFilter =(val)=>{
      if(val){
        let arr=[]
        copyMemberOputio.value.map((item)=>{
          let a =item.email.split('@')[0]
              a = a.split('_')[0]+a.split('_')[1]
              a = a.indexOf(val)
          let b = item.name.indexOf(val)
          if(a!==-1||b!==-1){
            arr.push(item)
          }  
        })
        memberOptions.value=arr
      }else{
        memberOptions.value=copyMemberOputio.value
      }
    };
        getGroupOptions();
        setTimeout(() => {
            getMemberOptions();
        }, 1000);
        
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
            dateValue2,
            getprojectOptions,
            getWarehouseOptions,
            warehouseSelect,
            memberSelect,
            memberFilter,
            downLoad,
            disabledDate,
            props1
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
.el-input__inner{
    height: 32px !important;
}
</style>