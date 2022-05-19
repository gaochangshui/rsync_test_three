<template>
  <div class="dashboard" @click="onBlur">
    <div class="dashboard-left">
      <div style="text-align: left">
        <svg-icon width="15" height="15" icon-class="four" />
        <span class="dashboard-left-headlab">{{ labs[0].name }}</span>
      </div>
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item
          v-for="(labchildren, p) in labs[0].children"
          :key="p"
          :index="String(p)"
          class="menu-item"
          @click="getTitle(labchildren.name)"
        >
          <div class="dashboard-left-children-left">{{ labchildren.name }}</div>
          <div class="dashboard-left-children-right">
            {{ labchildren.number }}
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="dashboard-right">
      <div class="dashboard-right-search">
        <div class="dashboard-right-search-left">{{ topTitle }}</div>
        <div class="dashboard-right-search-right">
          <el-input
            v-model="input"
            placeholder="搜索项目号"
            size="large"
            style="width: 300px; margin-bottom: 12px"
            maxlength="100"
            @keyup.enter="getTableData"
          >
            <template #suffix>
              <svg
                v-show="input == '' ? false : true"
                @click="emptyInput"
                t="1649831312816"
                class="input-icon1"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2782"
                width="15"
                height="15"
              >
                <path
                  d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z"
                  fill="#bfbfbf"
                  p-id="2783"
                ></path>
              </svg>
              <svg
                @click="selectGitLab"
                class="input-icon2"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-ba633cb8=""
                width="15"
                height="15"
              >
                <path
                  fill="currentColor"
                  d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
                ></path>
              </svg>
            </template>
          </el-input>
        </div>
      </div>
      <div style="overflow: auto; height: calc(100vh - 180px)">
        <div class="dashboard-right-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ background: '#FAFAFA' }"
            @cell-mouse-enter="tableHover"
            @cell-mouse-leave="tablaLeave"
          >
            <el-table-column label="项目" sortable :sort-method="sortDevName">
              <template #default="scope">
                <div style="color: #0b2646">{{ scope.row.name }}</div>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="11111111111111"
                  placement="top-start"
                >
                  <div
                    style="
                      color: #8e8e8e;
                      /* width:100%; */
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      -o-text-overflow: ellipsis;
                    "
                  >
                    11111111111111
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="预订工数" sortable />
            <el-table-column width="300px" align="right">
              <template #default="scope">
                <el-button
                  @click="showSelect()"
                  type="text"
                  size="small"
                  v-show="scope.row.showbnt"
                >
                  仓库设定
                </el-button>
                <el-button
                  @click="showwarehouse(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.showbnt"
                  style="margin-right: 10px"
                >
                  查看仓库
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="dashboard-right-page" v-show="pageTotal / pageSize > 1">
            <el-pagination
              :page-sizes="[20, 50, 100]"
              layout="total, sizes,->, prev, pager, next, jumper,"
              v-model:current-page="curPage"
              v-model:page-size="pageSize"
              :total="pageTotal"
            />
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="仓库设定" v-model="dialogVisible" width="900px">
      <div>
        <el-input
          v-model="input2"
          placeholder="搜索仓库"
          size="large"
          style="width: 418px; margin-bottom: 12px"
          maxlength="100"
          @keyup.enter="getTableData"
        >
          <template #suffix>
            <svg
              v-show="input2 == '' ? false : true"
              @click="emptyInput2"
              t="1649831312816"
              class="input-icon1"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2782"
              width="15"
              height="15"
            >
              <path
                d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z"
                fill="#bfbfbf"
                p-id="2783"
              ></path>
            </svg>
            <svg
              @click="selectGitLab"
              class="input-icon2"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ba633cb8=""
              width="15"
              height="15"
            >
              <path
                fill="currentColor"
                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
              ></path>
            </svg> </template
        ></el-input>
        <div class="allwarehouse">
          <span class="dialogTittle">全部仓库</span>
          <div class="warehousebox1">
            <div v-for="item in allselect" :key="item">
              <el-checkbox
                v-model="checked1"
                :label="item"
                @change="checkSelect"
                style="margin-left: 16px"
              ></el-checkbox>
            </div>
          </div>
        </div>
        <div class="selectedwarehouse">
          <span class="dialogTittle"
            >已选择
            <div class="emptybtn" @click="empty">清空</div>
          </span>
          <div class="warehousebox2">
            <div
              v-for="(item, index) in selected"
              :key="index"
              style="margin-left: 8px; margin-right: 8px"
            >
              <el-tag
                closable
                class="selectTag"
                type="info"
                style="
                  width: 100%;
                  margin-bottom: 8px;
                  height: 36px;
                  font-size: 14px;
                "
                @close.stop="handleClose(item)"
              >
                {{ item }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      name: 'dashboard',
      username: '',
      usercd: '',
      checked1: [],
      dialogVisible: false,
      pageTotal: 50,
      curPage: 1,
      pageSize: 20,
      branchoptions: [],
      allselect: ['select1', 'select2', 'select3', 'select4', 'select5'],
      selected: [],
      labs: [
        {
          name: '项目',
          children: [
            {
              name: '所有项目',
              number: '140'
            },
            {
              name: '进行中的',
              number: '75'
            },
            {
              name: '已完成的',
              number: '15'
            }
          ],
        },
      ],
      tableData: [
        {
          name: 'name1',
          num: 10,
          showbnt: false,
        },
        {
          name: 'name2',
          num: 14,
          showbnt: false,
        }
      ],
      input: '',
      input2: '',
      topTitle: '所有项目',
      warehouseType: 'Index',
      operationFlg: false
    };
  },
  computed: {
    toWatch() {
      const { pageSize, curPage } = this;
      return { pageSize, curPage };
    },
  },
  watch: {
    toWatch:{
      handler(){
        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer= setTimeout(()=>{
          this.$nextTick(function () {
          this.getTableData();
        document.getElementsByClassName(
          'el-pagination__total'
        )[0].childNodes[0].nodeValue =
          (this.curPage - 1) * this.pageSize +
          1 +
          ' - ' +
          (this.curPage * this.pageSize >= this.pageTotal
            ? this.pageTotal
            : this.curPage * this.pageSize) +
          ' 条/共 ' +
          this.pageTotal +
          ' 条';
          })
      },500);
        
      },
      
    },
    dialogVisible() {
      this.selected = [];
      this.checked1 = [];
    },
  },
  methods: {
    empty() {
      this.selected = [];
      this.checked1 = [];
    },
    showwarehouse(val) {
      console.log(val.name);
      this.$router.push({
        name: '查看仓库',
        query: {
          title: val.name,
        },
      });
    },
    tablaLeave(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name === row.name) {
          this.tableData[i].showbnt = false;
        }
      }
    },
    tableHover(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name === row.name) {
          this.tableData[i].showbnt = true;
        }
      }
    },
    showSelect() {
      this.dialogVisible = true;
    },
    handleClose(val) {
      this.selected.splice(this.selected.indexOf(val), 1);
    },
    checkSelect() {
      this.selected = this.checked1;
    },
    getTitle(val) {
      this.topTitle = val;
    },
    getCookie() {
      var allCookie = document.cookie;
      var aryCookie = allCookie.split(';');
      for (let i in aryCookie) {
        let getUserid = aryCookie[i].split('=');
        if (getUserid[0].trim() === 'LoginedUserName') {
          this.username = getUserid[1];
        }
        if (getUserid[0].trim() === 'LoginedUser') {
          this.usercd = getUserid[1].trim();
        }
      }
    },
    selectGitLab() {
      this.curPage = 1;
      this.getTableData();
    },
    sortDevName(str1, str2) {
      let res = 0;
      for (let i = 0; ; i++) {
        if (!str1[i] || !str2[i]) {
          res = str1.length - str2.length;
          break;
        }
        const char1 = str1[i];
        const char2 = str2[i];
        res = char1.charCodeAt(0) - char2.charCodeAt(0);
        break;
      }
      return res;
    },
    emptyInput() {
      this.input = '';
    },
    emptyInput2() {
      this.input2 = '';
    }
  },
  created() {
    this.getCookie();
  }
};
</script>

<style lang="less">
.menu-item {
  height: 40px;
}
.dashboard {
  display: flex;
  padding: 0 0 0 20px;
  height: calc(100vh - 100px);
  &-left {
    width: 240px;
    box-shadow: inset -1px 0px 0px #ececec;
    min-height: calc(100vh - 100px);
    & > div {
      padding-top: 20px;
    }
    &-headlab {
      line-height: 25px;
      padding-left: 20px;
      align-items: center;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
    }
    &-children {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px 0px 30px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      &-left {
        margin-left: 20px;
      }
      &-right {
        color: #909aaa;
        position: absolute;
        right: 13%;
      }
    }
  }
  &-right {
    padding: 20px 0;
    width: calc(100vw - 300px);
    &-search {
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      &-left {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: #4b4b4b;
        margin-bottom: 24px;
        padding-left: 15px;
      }
    }
    &-table {
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #4b4b4b;
      padding-left: 15px;
    }
  }
}
.el-table__header {
  height: 48px;
}
.el-table {
  tbody tr:hover > td {
    background: #fafafa !important;
  }
}
.el-pagination .el-input--suffix .el-input__inner {
  box-shadow: none;
}
.el-pagination .el-select .el-input.is-focus .el-input__inner {
  box-shadow: none !important;
}
.el-pagination .el-select .el-input__inner:focus {
  box-shadow: none !important;
}
.el-pagination .el-select .el-input__inner:hover {
  box-shadow: none !important;
}
.el-pagination {
  position: relative;
  top: 80%;
}
.pointFrom:focus {
  outline: none;
}
.pointFrom:hover {
  background-color: #f0eeee;
}
.input-icon1,
.input-icon2 {
  position: relative;
  top: 30%;
  cursor: pointer;
}
.input-icon1 {
  margin-right: 10px;
}
.allwarehouse,
.selectedwarehouse {
  width: 416px;
  height: 450px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.selectedwarehouse {
  position: absolute;
  top: 136px;
  left: 460px;
}
.dialogTittle {
  font-size: 16px;
  color: black;
  line-height: 40px;
  height: 40px;
  margin-left: 20px;
  width: 100%;
}
.warehousebox1 {
  width: 100%;
  border-top: 1px solid #eeeeee;
  padding-top: 6px;
}
.warehousebox2 {
  width: 100%;
  border-top: 1px solid #eeeeee;
  padding-top: 16px;
}
.selectTag {
  justify-content: left !important;
}
.selectTag .el-tag__close {
  margin-left: 320px;
}
.emptybtn {
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 370px;
  color: #8e8e8e;
  cursor: pointer;
}
.emptybtn:hover {
  color: #3e79f6;
}
</style>
