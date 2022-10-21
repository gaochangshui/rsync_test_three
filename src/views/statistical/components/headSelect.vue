<template>
    <div>
        <div v-show="statisticalType==='project'" class="projectHead" >
            <div style="display:flex">
                <span style="width:48px;margin-top: 8px;">仓库：</span>
                <el-cascader
                        v-model="warehouseValue"
                        :options="warehouseOptions"
                        :props="props1"
                        collapse-tags
                        collapse-tags-tooltip
                        clearable
                        filterable
                        style="width:550px"
                        size="large"
                    />
            </div>    
            <el-button type="primary" @click="contentSelect('p')">查询</el-button>
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
            <el-button type="primary" @click="contentSelect('u')">查询</el-button>  
        </div>
    </div>
</template>
<script>
import { defineComponent, ref ,onMounted  } from "vue";
import axios from '@/http';
export default defineComponent({
    name:'headSelect',
    props:{statisticalType:String},
    setup(props,cxt){
        const groupValue=ref(null);
        const projectValue=ref(null);
        const warehouseValue=ref([]);
        const memberValue=ref(null);
        const props1=ref({
        multiple: true,
        value:'value'
      },);
        const groupOptions=ref([]);  
        const projectOptions=ref([]);
        const warehouseOptions=ref([]);
        const memberOptions=ref([]);
        const copyMemberOputio=ref([]);
        const getMemberOptions = ()=>{
            axios.get('/actionapi/GitlabCodeAnalysis/GetMembers'
            ).then((e)=>{
                memberOptions.value=e.data
                copyMemberOputio.value=e.data
            })
        }
        const getWarehouseOptions = ()=>{
            axios.get('/actionapi/projects/GetLocationGroup',{
                params:{
                    flag:'pj'
                }
            }).then((e)=>{
                warehouseOptions.value=JSON.parse(e.data.group)
                console.log(warehouseOptions.value);
                warehouseValue.value=[]
            })
        };
        const contentSelect = (val)=>{
            if(props.statisticalType==='project'){
                cxt.emit('contentSelect',warehouseValue.value,val,0)
            }else{
                cxt.emit('contentSelect',memberValue.value,val,0)
            }
            
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
    const getInitPicture = ()=>{
        var allCookie = document.cookie;
      var aryCookie = allCookie.split(';');
      for (let i in aryCookie) {
        let getUserid = aryCookie[i].split('=');
        if (getUserid[0].trim() === 'LoginedUser') {
          var usercd = getUserid[1].trim();
        }
      }
      memberValue.value=[usercd]
      setInterval
      setTimeout(()=>{
        contentSelect('u')
            },100);
    }
    onMounted(()=>{
        getInitPicture()
        getWarehouseOptions();
    })
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
            getWarehouseOptions,
            contentSelect,
            memberFilter,
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