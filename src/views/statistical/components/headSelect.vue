<template>
    <div>
        <!-- 仓库统计 -->
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
                        style="width:550px;margin-top: 1px;"
                        size="large"
                    />
            </div>    
            <el-button type="primary" @click="contentSelect('p')" size="large">查询</el-button>
        </div>
        <!-- 成员统计 -->
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
                style="width:300px;margin-top: 1px;"
                class="m-2" 
                size="large"
                placeholder="Select">
                    <el-option
                    v-for="item in memberOptions"
                    :key="item.username"
                    :label="item.name+'('+item.username+')'"
                    :value="item.username"
                    />
                </el-select>
            </div>
            <el-button type="primary" @click="contentSelect('u')" size="large">查询</el-button>  
        </div>
        <!-- 工时统计 -->
        <div v-show="statisticalType==='takentime'" class="memberHead">
            <div>
                <span>项目：</span>
                <el-select 
                v-model="timeValue"
                multiple 
                collapse-tags 
                collapse-tags-tooltip
                filterable
                remote
                reserve-keyword
                clearable
                placeholder="请选择"
                style="width:450px;margin-top: 1px;"
                :remote-method="remoteMethod"
                size="large"
                >
                <el-option
                style="height:60px"
                v-for="item in timeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value+': '+item.link"
                >
                <div class="value" style="line-height: normal">
                {{ item.value }}
              </div>
              <span class="link">{{ item.link }}</span>
                </el-option>
                </el-select>
            </div>
        <el-button type="primary" @click="timeSelect()" size="large">查询</el-button> 
        </div>
    </div>
</template>
<script>
import { defineComponent, ref ,onMounted,onBeforeUpdate,watch } from "vue";
import axios from '@/http';
import { getProjectlist } from "@/api/qcd";
export default defineComponent({
    name:'headSelect',
    props:{statisticalType:String,
        changeName:String},
    setup(props,cxt){
        const timeValue=ref(null)
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
        const timeOption=ref([])
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
                warehouseValue.value=[]
            })
        };
        const contentSelect = (val)=>{
            let selectValue=warehouseValue.value.map((item)=>{
                return item[item.length-1]
            })
            if(props.statisticalType==='project'){
                
                cxt.emit('contentSelect',selectValue,val,0)
            }else{
                cxt.emit('contentSelect',memberValue.value,val,0)
            }
            
        };
        const timeSelect =()=>{
          let timeData=[]
          timeValue.value.map((item)=>{
            timeData.push(item.split(':')[0])
          })
          cxt.emit('timeSelect',timeData)
        }
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
    const remoteMethod = (query) => {
        console.log(query);
      if (query !== "") {
        getProjectlist(query).then((res) => {
            timeOption.value = res.data.map((item) => ({
            value: item.ProjectCode,
            link: item.ProjectName,
          }));
        });
      } else {
        timeOption.value = [];
      }
    }
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
        getProjectlist("").then((res) => {
        timeOption.value = res.data.map((item) => ({
          value: item.ProjectCode,
          link: item.ProjectName,
        }));
      });
    })
    watch(()=>props.changeName,()=>{
        memberValue.value=[props.changeName]
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
            timeOption,
            timeValue,
            getWarehouseOptions,
            contentSelect,
            memberFilter,
            remoteMethod,
            timeSelect,
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