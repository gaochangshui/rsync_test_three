<template>
  <div class="TakenTime">
    <div class="head">
     <el-form :model="form" label-width="80px"  size="large">
      <div class="row-first">
         <el-form-item label="项目">
          <el-select
            v-model="projects"
            multiple
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="Select"
            :remote-method="remoteMethod"
            style="width: 925px"
            multiple-limit="6"
            :loading="loading"
            class="el-marginLR"
            size="large"
          >
            <el-option
              v-for="item in projectResult"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <div class="value" style="line-height: normal">
                {{ item.value }}
              </div>
              <span class="link">{{ item.link }}</span>
            </el-option>
          </el-select>
         </el-form-item>
      </div>
      <div class="row-second">
        <el-form-item label="人员检索">
          <el-cascader
            v-model="takenEmployeeList"
            :options="options"
            :props="props"
            class="el-select el-marginLR"
            collapse-tags
            clearable
            filterable
            placeholder="Select"
            size="large"
          />
        </el-form-item> 
         <el-form-item label-width='auto'>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="To"
            value-format="YYYY-MM-DD"
            start-placeholder="Stare Date"
            end-placeholder="End Date"
            class="el-marginLR"
            style="width: 380px"
            size="large"
          ></el-date-picker>
         </el-form-item>
<el-form-item label-width='auto'	>   
<el-button
            class="search el-marginLR"
            type="primary"
            @click="searchTakenHours"
            size="large"
            >検索</el-button
          >
          <el-tooltip
            class="item"
            effect="light"
            content="只下载页面上显示的数据"
            placement="top"
            v-if="showDownload"
          >
            <el-button
              type="primary"
              :loading="downloadLoading"
              @click="exportTable()"
            >
              <el-icon><Download /></el-icon>
            </el-button>
          </el-tooltip>
</el-form-item>
      </div>
     </el-form>
    </div>
    <div class="body">
     <div v-show="!HoursTotal" style="
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
          style=" width: 450px"
      ></el-image>
    </template>
  </el-result>
      </div>
      </div>

      <el-tabs
        v-model="tableId"
        tab-position="left"
        style="height: 100%"
        v-show="HoursTotal"
        @tab-click="changeTab"
      >
        <el-tab-pane label="概览" name="" class="HoursTotal">
          <div>
            <el-result
              icon="success"
              :title="`${HoursTotal}人日`"
              :sub-title="`条件を満たしている明細:${total}件(${executedTime}秒)`"
            >
            </el-result>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个别工数" name="Employee">
          <div
            style="height: calc(100vh - 250px); padding: 0px 0px 0px 0px"
            v-if="dataEmployee.length"
          >
            <el-table
              class="table"
              id="Employee"
              v-if="dataEmployee.length"
              :data="dataEmployee"
              style="width: 100%; margin: 0 auto; height: 100%"
              height="height:100%"
              :cell-style="tableCellClass"
            >
              <el-table-column
                align="center"
                prop="EmployeeCode"
                sortable
                label="社員CD"
                width="300"
              />
              <el-table-column
                align="center"
                prop="EmployeeName"
                label="名前"
                width="300"
              />
              <el-table-column
                align="right"
                sortable
                prop="sum"
                label="時間（人日）"
                width="300"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.sum % 1 === 0
                      ? `${scope.row.sum}.0`
                      : scope.row.sum
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目" name="Projects">
          <div
            style="height: calc(100vh - 250px); padding: 00px 0px 0px 0px"
            v-if="dataProjects.length"
          >
            <el-table
              class="table"
              id="Projects"
              v-if="dataProjects.length"
              :data="dataProjects"
              style="width: 100%; margin: 0 auto; height: 100%"
              height="height:100%"
              :cell-style="tableCellClass"
            >
              <el-table-column
                align="center"
                prop="ProjectCd"
                label="PJCD"
                sortable
                width="200"
              />
              <el-table-column
                align="left"
                prop="ProjectName"
                label="PJ名"
                width="400"
              />
            <el-table-column
                align="left"
                prop="ProjectStatus"
                label="ステータス"
                width="200"
              />
              <el-table-column
                align="right"
                sortable
                prop="sum"
                label="工数（人日）"
                width="150"
              >
                <template #default="scope">
                  <span style="margin-left: 10px"
                    >{{
                      scope.row.sum % 1 === 0
                        ? `${scope.row.sum}.0`
                        : scope.row.sum
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                sortable
                prop="QuotationHours"
                label="見積（人日）"
                width="150"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.QuotationHours % 1 === 0
                      ? `${scope.row.QuotationHours}.0`
                      : scope.row.QuotationHours
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                sortable
                prop="TakenPercentage"
                label="消化率(%)"
                width="150"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.TakenPercentage % 1 === 0
                      ? `${scope.row.TakenPercentage}.0`
                      : scope.row.TakenPercentage
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目人别" name="ProjectEmployee">
          <div
            style="height: calc(100vh - 250px); 00px 0px 0px 0px"
            v-if="dataProjectEmployee.length"
          >
            <el-table
              class="table"
              id="ProjectEmployee"
              v-if="dataProjectEmployee.length"
              :data="dataProjectEmployee"
              style="width: 100%; margin: 0 auto; height: 100%"
              height="height:100%"
              :cell-style="tableCellClass"
            >
              <el-table-column
                align="center"
                prop="EmployeeCode"
                label="社員CD"
                sortable
                width="150"
              />
              <el-table-column
                align="center"
                prop="EmployeeName"
                label="名前"
                width="150"
              />
              <el-table-column
                align="center"
                prop="ProjectCd"
                sortable
                label="PJCD"
                width="150"
              />
              <el-table-column
                align="left"
                prop="ProjectName"
                label="PJ名"
                width="300"
              />
              <el-table-column
                align="right"
                prop="sum"
                sortable
                label="時間（人日）"
                width="150"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.sum % 1 === 0
                      ? `${scope.row.sum}.0`
                      : scope.row.sum
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实际明细" name="takenHoursDetails">
          <div style="height: calc(100vh - 300px)" v-if="takenHoursData.length">
            <el-table
              class="table"
              id="takenHoursDetails"
              v-if="takenHoursData.length"
              :data="takenHoursData"
              style="width: 100%; margin: 0 auto; height: 100%"
              height="height:100%"
              :cell-style="tableCellClass"
            >
              <el-table-column
                align="center"
                prop="EmployeeCode"
                label="社員CD"
                width="100"
              />
              <el-table-column
                align="center"
                prop="EmployeeName"
                label="名前"
                width="90"
              />
              <el-table-column
                align="center"
                prop="WorkDate"
                label="日付"
                width="110"
              />
              <el-table-column
                align="center"
                prop="ProjectCode"
                label="PJCD"
                width="110"
              />
              <el-table-column
                align="left"
                prop="ProjectName"
                label="PJ名"
                width="300"
              />
              <el-table-column
                align="left"
                prop="WorkName"
                label="作業"
                width="165"
              />
              <el-table-column
                align="right"
                prop="ManHours"
                label="時間（H）"
                width="130"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.ManHours % 1 === 0
                      ? `${scope.row.ManHours}.0`
                      : scope.row.ManHours
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="left"
                prop="Remarks"
                label="メモ"
                width="250"
              />
            </el-table>
          </div>
          <el-pagination
            v-model:currentPage="pageNum"
            :page-sizes="[100, 200, 300, 400, 10000]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            style="padding: 16px 0"
            v-show="total"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script  lang="ts">
import { getEmployeelist, getProjectlist, getTakenHours } from "@/api/qcd";
import { ElMessage } from "element-plus";
import { exportTable2Excel } from "@/utils/excel";
import toDecimal from "@/utils/index";
import { defineComponent, ref, onMounted } from "vue";
import { Download } from "@element-plus/icons";
import noData from "@/assets/images/noData.png"
export default defineComponent({
  components: {
    Download
  },
  setup() {
    const projectResult = ref([]);
    const takenEmployeeList = ref([]);
    const links = ref([]);
    const projects = ref([]);
    const date = ref("");
    const options = ref([]);
    const takenHoursData = ref([]);
    const pageSize = ref(100);
    const pageNum = ref(1);
    const total = ref(0);
    const dataEmployee = ref([]);
    const dataProjects = ref([]);
    const dataProjectEmployee = ref([]);
    const HoursTotal = ref(0);
    const executedTime = ref("");
    const downloadLoading = ref(false);
    const showDownload = ref(false);
    const tableId = ref(0);
    const tableName = ref("");
    const loading = ref(false);
    const tableCellClass = ({ row, column, rowIndex, columnIndex }: any) => {
      if (tableId.value.toString() === "Employee" && columnIndex === 2) {
        return "padding-right: 35px;";
      }
      if (
        tableId.value.toString() === "Projects" &&
        (columnIndex === 2 || columnIndex === 3)
      ) {
        return "padding-right: 35px;";
      }
      if (tableId.value.toString() === "ProjectEmployee" && columnIndex === 4) {
        return "padding-right: 35px;";
      }
      if (
        tableId.value.toString() === "takenHoursDetails" &&
        columnIndex === 6
      ) {
        return "padding-right: 20px;";
      }
    };
    const remoteMethod = (query: string) => {
      if (query !== "") {
        loading.value = true;
        getProjectlist(query).then((res) => {
          loading.value = false;
          projectResult.value = res.data.map((item: any) => ({
            value: item.ProjectCode,
            link: item.ProjectName,
          }));
        });
      } else {
        projectResult.value = [];
      }
    };
    const exportTable = () => {
      if (tableId.value !== 0) {
        downloadLoading.value = true;
        exportTable2Excel(tableId.value + "", tableName.value);
        setTimeout(() => {
          downloadLoading.value = false;
        }, 1000);
      }
    };
    const takenHours = () => {
      const params = {
        id: takenEmployeeList.value.map((item: any) => item[3]).join(","),
        projects: projects.value.join(","),
        beginat:
          date.value === null || date.value.length === 0 ? "" : date.value[0],
        endat:
          date.value === null || date.value.length === 0 ? "" : date.value[1],
        pageSize: pageSize.value,
        pageNum: pageNum.value,
      };
      getTakenHours(params).then((res) => {
        //showDownload.value = false;
        if (res.data.HoursTotal === 0) {
          ElMessage({
            type: "warning",
            showClose: true,
            dangerouslyUseHTMLString: true,
            message: "データがありません",
          });
          HoursTotal.value = 0;
          return;
        }
        total.value = res.data.ResultCount;
        HoursTotal.value = toDecimal(Number(res.data.HoursTotal / 8), 1);
        executedTime.value = res.data.executedTime;
        dataEmployee.value = res.data.dataEmployee.map((res: any) => {
          return {
            EmployeeCode: res.employee_cd,
            EmployeeName: res.employee_name,
            sum: toDecimal(Number(res.sum / 8), 1),
          };
        });
        dataProjects.value = res.data.dataProjects.map((res: any) => {
          return {
            ProjectCd: res.project_cd,
            ProjectName: res.project_name,
            sum: toDecimal(Number(res.man_hours / 8), 1),
            QuotationHours:
              res.quotation_hours === -1
                ? "未計算"
                : toDecimal(Number(res.quotation_hours / 8), 1),
            TakenPercentage:
              res.taken_percentage === -1
                ? "未計算"
                : toDecimal(Number(res.taken_percentage * 100), 1),
            ProjectStatus: res.project_status  
          };
        });
        dataProjectEmployee.value = res.data.dataProjectEmployee.map(
          (res: any) => {
            return {
              EmployeeCode: res.employee_cd,
              EmployeeName: res.employee_name,
              ProjectCd: res.project_cd,
              ProjectName: res.project_name,
              sum: toDecimal(Number(res.sum / 8), 1),
            };
          }
        );
        takenHoursData.value = res.data.data.map((res: any) => {
          return {
            EmployeeCode: res.employee_cd,
            EmployeeName: res.employee_name,
            WorkDate: res.work_date.substring(0, 10),
            ProjectCode: res.project_cd,
            ProjectName: res.project_name,
            WorkName: res.work_name,
            Remarks: res.remarks,
            ManHours: res.man_hours,
          };
        });
      });
    };
    const changeTab = (val: any) => {
      showDownload.value = tableId.value == 0 ? false : true;
      tableName.value = val.props.label;
    };
    const searchTakenHours = () => {
      projects.value || date.value || takenEmployeeList.value.length
        ? takenHours()
        : ElMessage({
            type: "warning",
            showClose: true,
            dangerouslyUseHTMLString: true,
            message: "条件を指定してください",
          });
    };
    const handleCurrentChange = (val: any) => {
      pageNum.value = val;
      searchTakenHours();
    };
    const handleSizeChange = (val: any) => {
      pageSize.value = val;
      pageNum.value = 1;
      searchTakenHours();
    };
    onMounted(() => {
      getProjectlist("").then((res) => {
        projectResult.value = res.data.map((item: any) => ({
          value: item.ProjectCode,
          link: item.ProjectName,
        }));
        // links.value = projectResult.value;
      });
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
    });
    return {
      remoteMethod,
      searchTakenHours,
      handleCurrentChange,
      handleSizeChange,
      exportTable,
      changeTab,
      tableCellClass,
      props: { multiple: true },
      links,
      projectResult,
      projects,
      date,
      options,
      takenEmployeeList,
      takenHoursData,
      pageSize,
      pageNum,
      total,
      dataEmployee,
      dataProjects,
      dataProjectEmployee,
      HoursTotal,
      executedTime,
      showDownload,
      tableId,
      loading,
      noData
          };
  },
});
</script>
<style  lang="less">
.TakenTime {
  .head {
    width: 100%;
    margin-top: 3px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    min-width: 1200px;
    border-bottom: 12px solid #f2f3f5;
    .row-first {
      display: flex;
      align-items: center;
      height: 40px;
      padding-top: 7px;
    }
    .row-second {
      display: flex;
      align-items: center;
      height: 56px;
      margin-top: 4px;
    }
    .el-select {
      width: 535px;
    }
    .el-marginLR {
      margin: 0 5px;
    }
  }
  .body {
    height: calc(100vh - 250px);
    padding: 10px 0px 0px 0px;
    .el-pagination .el-select .el-input {
      width: 128px;
      margin: 0 5px;
    }
    .HoursTotal {
      width: 578px;
    }
  }
}
.el-select-dropdown__item {
  height: 60px;
}
</style>