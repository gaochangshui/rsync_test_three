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
      <el-table-column prop="EmployeeCode" label="社員CD" width="112" />
      <el-table-column prop="EmployeeName" label="名前" width="70" />
      <el-table-column prop="ProjectCode" label="PJCD" width="100" />
      <el-table-column prop="ProjectName" label="PJ名" width="300">
        <template #default="scope">
          <router-link
            target="_blank"
            :to="{
              path: '/projectMandays',
              query: { projectCode: scope.row.ProjectCode,
                  yearmonthbegin: this.yearmonthbegin,
                  yearmonthend: this.yearmonthend
               },
            }"
            >{{ scope.row.ProjectName }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="StatusName" label="状態" width="100" />
      <el-table-column
        :prop="head"
        align="center"
        :label="head"
        v-for="(head, index) in tableHeaders.sort()"
        :key="index"
        width="85"
      />
    </el-table>
  </div>
</template>

<script>
import { getEmployeeMandaysDate } from "@/api/qcd";
import { ElMessage } from "element-plus";
export default {
  name: "EmployeeMandays",
  data() {
    return {
      tableData: [],
      tableHeaders: [],
      employeeCode: "",
      yearmonthbegin: "",
      yearmonthend: "",
    };
  },
  created() {
    this.employeeCode = this.$route.query.employeeCode;
    this.yearmonthbegin = this.$route.query.yearmonthbegin;
    this.yearmonthend = this.$route.query.yearmonthend;
  },
  mounted() {
    getEmployeeMandaysDate(this.employeeCode,this.yearmonthbegin,this.yearmonthend).then((res) => {
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
          (temp.length !== 0 && temp.indexOf(res.data[i]["ProjectCode"]) === -1)
        ) {
          temp.push(res.data[i]["ProjectCode"]);
          this.tableData = res.data.map((rs) => {
            if (rs["ProjectCode"] === res.data[i]["ProjectCode"]) {
              yearmonth.push({
                YearMonth: rs["YearMonth"],
                SumManDays: rs["SumManDays"],
              });
            }
          });
          result.push({
            EmployeeCode: res.data[i]["EmployeeCode"],
            EmployeeName: res.data[i]["EmployeeName"],
            ProjectCode: res.data[i]["ProjectCode"],
            ProjectName: res.data[i]["ProjectName"],
            StatusName: res.data[i]["StatusName"],
            YearMonthSumMandayList: yearmonth,
          });
        }
      }

      this.tableData = result.map((res) => {
        // console.log(res);
        let b = res.YearMonthSumMandayList.map((rs) => {
          if (this.tableHeaders.indexOf(rs["YearMonth"] + "　") === -1) {
            this.tableHeaders.push(rs["YearMonth"] + "　");
          }
          return JSON.parse(`{"${rs["YearMonth"]}　":${rs["SumManDays"]}}`);
        }).reduce(function (result, currentObject) {
          for (var key in currentObject) {
            if (Object.prototype.hasOwnProperty.call(currentObject, key)) {
              result[key] = currentObject[key];
            }
          }
          return result;
        }, {});
        return {
          EmployeeCode: res.EmployeeCode,
          EmployeeName: res.EmployeeName,
          ProjectName: res.ProjectName,
          ProjectCode: res.ProjectCode,
          StatusName: res.StatusName,
          ...b,
        };
      });
    });
  },
  methods: {
    tableCellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 4) {
        let index = columnIndex - 5;
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
