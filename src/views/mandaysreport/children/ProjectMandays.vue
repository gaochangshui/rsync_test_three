<template>
  <div
    style="
      padding: 15px 15px 15px 15px;
      background: #dcdfe6;
      height: calc(100vh - 20px);
    "
  >
    <el-table
      class="table"
      :data="tableData"
      border
      style="width: 100%; margin: 0 auto; height: 100%"
      height="height:100%"
      :cell-class-name="tableCellClass"
    >
      <el-table-column prop="EmployeeCode" label="社員CD" width="95" />
      <el-table-column prop="EmployeeName" label="名前" width="70">
        <template #default="scope">
          <router-link
            target="_blank"
            :to="{
            path: '/employeeMandays',
            query: {
                  employeeCode: scope.row.EmployeeCode,
                  yearmonthbegin: this.yearmonthbegin,
                  yearmonthend: this.yearmonthend,
                }
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
      />
    </el-table>
  </div>
</template>

<script>
import { getProjectMandays } from "@/api/qcd";
import { ElMessage } from "element-plus";
export default {
  name: "EmployeeMandays",
  data() {
    return {
      tableData: [],
      tableHeaders: [],
      projectCode: "",
    };
  },
  created() {
    this.projectCode = this.$route.query.projectCode;
    this.yearmonthbegin = this.$route.query.yearmonthbegin;
    this.yearmonthend = this.$route.query.yearmonthend;
  },
  methods: {
    tableCellClass({ row, _column, _rowIndex, columnIndex }) {
      if (columnIndex > 1) {
        let index = columnIndex - 2;
        let val =
          row[this.tableHeaders[index]] === undefined
            ? 0
            : Number(row[this.tableHeaders[index]]);
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
    },
  },
  mounted() {
    getProjectMandays(this.projectCode).then((res) => {
      if (res.data.length === 0) {
              ElMessage({
                type: "warning",
                showClose: true,
                dangerouslyUseHTMLString: true,
                message: "データがありません",
              });
            }
      let result = [];
      let temp = [];
      for (let i = 0; i < res.data.length; i++) {
        let yearmonth = [];
        if (
          result.length === 0 ||
          (temp.length !== 0 &&
            temp.indexOf(
              res.data[i]["employee_cd"] + "_" + 'res.data[i]["project_cd"]'
            ) === -1)
        ) {
          temp.push(
            res.data[i]["employee_cd"] + "_" + 'res.data[i]["project_cd"]'
          );
          this.tableData = res.data.map((rs) => {
            if (
              rs["employee_cd"] + "_" + rs["project_cd"] ===
              res.data[i]["employee_cd"] + "_" + res.data[i]["project_cd"]
            ) {
              yearmonth.push({
                YearMonth: rs["year_month"],
                SumManDays: rs["sum"],
              });
            }
          });
          result.push({
            EmployeeCode: res.data[i]["employee_cd"],
            EmployeeName: res.data[i]["employee_name"],
            ProjectCode: res.data[i]["project_cd"],
            ProjectName: res.data[i]["project_name"],
            YearMonthSumMandayList: yearmonth,
          });
        }
      }

      this.tableData = result.map((res) => {
        console.log(res);
        let b = res.YearMonthSumMandayList.map((rs) => {
          if (this.tableHeaders.indexOf(rs["YearMonth"] + "　") === -1) {
            this.tableHeaders.push(rs["YearMonth"] + "　");
          }
          return JSON.parse(`{"${rs["YearMonth"]}　":${rs["SumManDays"]}}`);
        }).reduce(function (result, currentObject) {
          for (var key in currentObject) {
            if ( Object.prototype.hasOwnProperty.call(currentObject, key)) {
              result[key] = currentObject[key];
            }
          }
          return result;
        }, {});
        return {
          EmployeeCode: res.EmployeeCode,
          EmployeeName: res.EmployeeName,
          ProjectCode: res.ProjectCode,
          ProjectName: res.ProjectName,
          ...b,
        };
      });
    });
  },
};
</script>
<style lang="less">
.tabs {
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover,
  .el-select .el-input.is-focus .el-input__inner,
  .el-button .el-button.is-focus .el-button__inner {
    border-color: #292fb2;
  }
  .el-tabs__nav-wrap {
    height: 55px;
    line-height: 55px;
    padding-left: 30px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    .is-active {
      color: #292fb2;
    }
    .el-tabs__active-bar {
      background-color: #292fb2;
    }
    .el-tabs__item:hover {
      color: #292fb2;
    }
  }
  .el-tabs__content {
    padding: 0px 28px;
    .table {
      .has-gutter {
        background: #fafafa;
      }
    }
    .panel {
      height: 56px;
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
      margin: 3px 0px 16px;
      padding: 0px 16px;
      display: flex;
      align-items: center;
      .el-switch {
        height: inherit;
        margin: 20px;
        .el-switch__core {
          width: 44px;
          height: 22px;
          .el-switch__action {
            top: 2;
          }
        }
      }
      .el-select {
        width: 395px;
        margin-right: 20px;
      }
      .search {
        background-color: #292fb2;
        color: #fff;
        margin-left: 20px;
      }
      .reset {
        color: #0000;
      }
    }
  }
}
</style>
