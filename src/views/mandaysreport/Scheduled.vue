<template>
  <div class="Scheduled">
    <div class="head">
      <el-form :model="form" label-width="80px"  size="large">
        <div class="row-first">
                <el-form-item label="成员" >
        <el-cascader
          v-model="employeeList"
          :options="options"
          :props="props"
          width="500"
          class="el-marginLR el-select"
          collapse-tags
          clearable            
          filterable
          size="large"
          placeholder="请选择"
          :filter-method="(value,item)=>employeeFilter(value,item)"
          @change="chengeEmployees"
        />
        </el-form-item>
        <el-form-item label-width='auto'>
          <el-date-picker
          v-model="date"
          class="el-marginLR"
          type="monthrange"
          range-separator="To"
          format="YYYYMM"
          value-format="YYYYMM"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="large"
        >
          </el-date-picker>
        </el-form-item>
                 <el-form-item label='合同完成'>
         <el-switch
          v-model="isReceive"
          @change="getInfo"
          class="el-marginLR"
          active-color="#0075FF"
          inactive-color="#DCDFE6"
           size="large"
        />
         </el-form-item>
          <el-form-item label-width='auto'>
             <el-button
          class="search el-marginLR"
          type="primary"
          @click="searchOrdersReceived"
          size="large"
          >查询</el-button
        >
        <el-button
          v-if="tableHeaders.length"
          :loading="downloadLoading"
          class="el-marginLR"
          type="primary"
          size="large"          
          @click="exportTable('Scheduled', '要員負荷予定')"
        >
          <el-icon><Download /></el-icon>
        </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="height: calc(100vh - 250px); margin-left: 16px;">
      <div v-show="!tableHeaders.length" style="
      height: 90%;
    width: 1120px;
    display: flex;
    align-items: center;
    justify-items: center;
    text-align: center;"
    >
        <div style="width: 90%;">
                <el-result>
    <template #icon>
      <el-image
        :src="noData"
          style=" width: 450px;margin-top:55px"
      ></el-image>
    </template>
  </el-result>
      </div>
      </div>
      <el-table
        id="Scheduled"
        class="table"
        v-if="tableHeaders.length"
        :data="tableData"
        border
        height="height:100%"
        style="width: 100%; margin: 0 auto; height: 100%"
        :cell-class-name="tableCellClass"
      >
        <el-table-column
          align="center"
          prop="EmployeeCode"
          label="社員CD"
          width="120"
        />
        <el-table-column
          align="center"
          prop="EmployeeName"
          label="名前"
          width="100"
        >
          <template #default="scope">
            <router-link
              target="_blank"
              :to="{
                path: '/employeeMandays',
                query: {
                  employeeCode: scope.row.EmployeeCode,
                  yearmonthbegin: this.yearmonthbegin,
                  yearmonthend: this.yearmonthend,
                },
              }"
              >{{ scope.row.EmployeeName }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column
          :prop="head"
          :label="head"
          align="center"
          v-for="(head, index) in tableHeaders.sort()"
          :key="index"
          width="85"
        >
          <template #default="scope">
            <div
              class="name-wrapper"
              style="cursor: pointer"
              @click="showSubDialog(scope)"
            >
              {{ scope.row[head] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogSubDataVisible"
      :title="subDataTitle"
      v-if="subData.length > 0"
    >
      <div style="height: 53vh" v-if="subData.length > 0">
        <el-table
          :data="subData"
          style="width: 100%; margin: 0 auto; height: 100%"
          height="height:100%"
        >
          <el-table-column
            prop="ProjectCode"
            label="PJCD"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="ProjectName"
            label="プロジェクト"
          ></el-table-column>
          <el-table-column
            prop="StatusName"
            label="ステータス"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SumManDays"
            label="工数"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script  lang="ts">
import {
  getEmployeelist,
  getSumMandays,
  getEmployeeMandays,
} from "@/api/qcd";
import { ElMessage } from "element-plus";
import { Download } from "@element-plus/icons";
import { exportTable2Excel } from "@/utils/excel";
import storage from "@/utils/storage";
import { defineComponent, ref, onMounted } from "vue";
import noData from "@/assets/images/noData.png"
import { ElLoading } from 'element-plus'

export default defineComponent({
  components: {
    Download,
  },
  setup() {
    const options = ref([]);
    const date = ref([
      new Date().getFullYear() + "01",
      new Date().getFullYear() + "12",
    ]);
    const isReceive = ref(false);
    const employeeList = ref([]);
    const tableData = ref([]);
    const tableHeaders = ref([]);
    const downloadLoading = ref(false);
    const dialogSubDataVisible = ref(false);
    const subDataTitle = ref("");
    const subData = ref([]);
    const  yearmonthbegin = ref("");
    const  yearmonthend = ref("");
    const employeeFilter = (val:any,item:any)=>{
      return val.text.indexOf(item.trim())!==-1
      

    }
    const searchOrdersReceived = () => {
      const loading=ElLoading.service({
              lock: true,
              text: '查询中，请稍候',
              background: 'rgba(0, 0, 0, 0.7)',})
      yearmonthbegin.value = date.value ? date.value[0] : "";
      yearmonthend.value = date.value ? date.value[1] : "";
      const params = {
        OrdersReceivedOnly: isReceive.value,
        idlist: employeeList.value.map((item: any) => item[3]).join(","),
        yearmonthbegin: yearmonthbegin.value,
        yearmonthend: yearmonthend.value,
      };
      
      const data = getSumMandays(params);
      data.then((res) => {
        loading.close()
        if (res.data.length === 0) {
          ElMessage({
            type: "warning",
            showClose: true,
            dangerouslyUseHTMLString: true,
            message: "データがありません",
          });
        }
        tableHeaders.value = [];
        tableData.value = res.data.map((res: any) => {
          let b = res.YearMonthSumMandayList.map((rs: any) => {
            const YearMonth: string = rs["YearMonth"];
            const Headers: any = tableHeaders.value;
            if (Headers.indexOf(YearMonth) === -1) {
              Headers.push(YearMonth);
            }
            // console.log('rs',JSON.parse(`{"${rs["YearMonth"]}":${rs["SumManDays"]}}`))
            return JSON.parse(`{"${rs["YearMonth"]}":${rs["SumManDays"]}}`);
          }).reduce(function (result: any, currentObject: any) {
            for (var key in currentObject) {
              if (Object.prototype.hasOwnProperty.call(currentObject, key)) {
                result[key] = currentObject[key];
              }
            }
            return result;
          }, {});
          // console.log('b',b)
          return {
            EmployeeCode: res.EmployeeCode,
            EmployeeName: res.EmployeeName,
            ...b,
          };
        });
        // console.log('tableData',tableData.value);
        // console.log('tableHeaders',tableHeaders.value);
        storage.set("employeeList", employeeList.value);
      }).catch(()=>{
        loading.close()
      });
    };
    const getInfo = () => {
      if (tableHeaders.value.length !== 0) {
        searchOrdersReceived();
      }
    };
    const tableCellClass = ({ row, column, rowIndex, columnIndex }: any) => {
      if (columnIndex > 1) {
        let index = columnIndex - 2;
        let val =
          row[tableHeaders.value[index]] === undefined
            ? 0
            : Number(row[tableHeaders.value[index]]);
        if (val <= 10) {
          return "bg-red";
        }
        if (val > 10 && val <= 20) {
          return "bg-banana";
        }
        if (val > 20 && val <= 25) {
          return "bg-green";
        }
        if (val > 25) {
          return "bg-blue";
        }
      }
    };
    const exportTable = (id: string, name: string) => {
      downloadLoading.value = true;
      exportTable2Excel(id, name);
      setTimeout(() => {
        downloadLoading.value = false;
      }, 1000);
    };
    const showSubDialog = (row: any) => {
      subData.value = [];
      subDataTitle.value =
        row.row.EmployeeCode +
        row.row.EmployeeName +
        "(" +
        row.column.label +
        ")";
      getEmployeeMandays(row.row.EmployeeCode, row.column.label).then((res) => {
        if (res.data.length === 0) {
          ElMessage({
            type: "warning",
            showClose: true,
            dangerouslyUseHTMLString: true,
            message: "データがありません",
          });
        }
        subData.value = res.data.map((res: any) => {
          return {
            ProjectCode: res.ProjectCode,
            ProjectName: res.ProjectName,
            StatusName: res.StatusName,
            SumManDays: res.SumManDays,
          };
        });
      });
      dialogSubDataVisible.value = true;
    };
    const chengeEmployees = (val: any) => {
      if (val.length === 0) {
        storage.remove("employeeList");
      }
    };
    onMounted(() => {
      getEmployeelist().then((res) => {
        options.value = res.data.map((item: any) => ({
          value: item.LocationID,
          label: item.LocationName,
          children: item.SectionList.map((item: any) => ({
            value: item.SectionID,
            label: item.SectionName,
            children: item.BelongList.map((item: any) => ({
              value: item.BelongID,
              label: item.BelongName,
              children: item.EmployeeList.map((item: any) => ({
                value: item.EmpolyeeCD,
                label: `${item.EmployeeName}(${item.EmpolyeeCD})`,
              })),
            })),
          })),
        }));
      });
      const cuur: any = storage.get("employeeList", true);
      employeeList.value = cuur;
    });
    return {
      options,
      props: { multiple: true },
      date,
      isReceive,
      employeeList,
      tableData,
      tableHeaders,
      dialogSubDataVisible,
      subDataTitle,
      subData,
      searchOrdersReceived,
      tableCellClass,
      exportTable,
      getInfo,
      showSubDialog,
      chengeEmployees,
      yearmonthbegin,
      yearmonthend,
      noData,
      employeeFilter
    };
  },
});
</script>
<style  lang="less">
.Scheduled {
  .head {
    height: 56px;
    width: 100%;
    box-shadow: 0 0 0 rgb(0 0 0 / 12%);
    margin: 3px 0 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    min-width: 1200px;
    border-bottom: 12px solid #f2f3f5;
    .row-first {
    display: flex;
    align-items: center;
    height: 56px;
    padding-top: 20px;
    }
    .el-select {
      width: 535px;
    }
    .el-marginLR {
      margin: 0 5px;
    }
    .search {
      margin-left: 15px;
    }
  }
}
input::-webkit-input-placeholder { /* WebKit browsers */ 
font-size:14px;
} 
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
font-size:14px;
} 
input::-moz-placeholder { /* Mozilla Firefox 19+ */  
font-size:14px;
} 
input:-ms-input-placeholder { /* Internet Explorer 10+ */  
font-size:14px;
} 
</style>