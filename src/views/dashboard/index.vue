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
          <!-- <div class="dashboard-left-children-right">
            {{ labchildren.number }}
          </div> -->
          <el-skeleton :loading="numloading" animated  >
      <template #template>
      <div :class="image_class">
        <el-skeleton-item
          variant="image"
          class="dashboard-left-children-right"
          style="width:60px"
        />
      </div>
    </template>
    <template #default>
      <div class="dashboard-left-children-right">
            {{ labchildren.number }}
          </div>
    </template>
    </el-skeleton>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="dashboard-right">
      <div class="dashboard-right-search">
        <div class="dashboard-right-search-left">{{ topTitle }}</div>
        <div class="dashboard-right-search-right">
          <el-input
            v-model="input"
            placeholder="搜索项目号、项目名"
            size="large"
            style="width: 300px; margin-bottom: 12px"
            maxlength="100"
            @keyup.enter="getTableData()"
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
            v-loading="loadingtable"
            element-loading-text="加载中..."
            @cell-mouse-enter="tableHover"
            @cell-mouse-leave="tablaLeave"
          >
            <el-table-column label="项目" sortable :sort-method="sortDevName">
              <template #default="scope">
                <div style="color: #0b2646">{{ scope.row.agreement_cd }}</div>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="scope.row.agreement_name"
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
                    {{scope.row.agreement_name}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="plan_mandays" label="预订工数" sortable />
            <el-table-column width="300px" align="right">
              <template #default="scope">
                <el-button
                class="tableBtn"
                style="width:56px;height:22px"
                  @click="showSelect(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.showbnt"
                >
                  仓库设定
                </el-button>
                <el-button
                class="tableBtn"
                style="width:56px;height:22px"
                  @click="showReview(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.showbnt"
                >
                  项目评审
                </el-button>
                <el-button
                class="tableBtn"
                style="width:56px;height:22px;margin-right: 10px"
                  @click="showwarehouse(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.showbnt"
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
    <el-dialog
    v-model="dialogReview"
    :title="reTitle"
    width="1000px"
    class="rebox"
  >
    <el-table
    ref="multipleTableRef"
    :data="retableData"
    max-height="300px"
    :header-cell-style="{ background: '#FAFAFA' }"
    :header-cell-class-name="cellClass"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column   width="80" type="selection">
    </el-table-column>
    <el-table-column label="仓库名称" >
      <template #default="scope">{{ scope.row.pj_name }}
      <div
        style="
        color: #8e8e8e;
        width:100%;
        overflow: hidden;
        white-space: nowrap;
       text-overflow: ellipsis;
       -o-text-overflow: ellipsis;
        "
         >
         {{ scope.row.description }}
        </div>
      </template>
    </el-table-column>
    <el-table-column  label-class-name="star" property="name" label="主要语言"  width="300px" >
      <template #default="scope">
        <el-select
          v-model="scope.row.languageoptions"
          multiple
          placeholder="请选择主要语言（多选）"
          style="width: 100%"
        >
          <el-option-group
            v-for="group in languageoptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label-class-name="star" property="address" label="分支"  >
      <template #default="scope">
        <el-select v-model="scope.row.bvalue" class="m-2" placeholder="请选择" @click="getbranch(scope.row) " @change="changeBranch(scope.row)">
    <el-option
      v-for="item in scope.row.branchoptions"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
      </template>   
    </el-table-column>
    <el-table-column label-class-name="star" property="address" label="数据库操作" >
      <template #default="scope">
        <el-select v-model="scope.row.value" class="m-2" placeholder="请选择" style="width:100%">
    <el-option
      v-for="item in databaseoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
      </template>
    
    </el-table-column>
  </el-table>
  <div style="margin-top:21px;display: flex;justify-content:space-between;">
    <div >
      <span style="color:red">*</span>
      <span style="line-height: 40px;margin-right: 16px;">完成时间</span>
      <el-date-picker
          :disabled-date="disabledDate"
          v-model="completeDate"
          type="date"
          placeholder="选择日期"
          style="width: 70%;"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
    </div>
    <div style="padding-right:12px">
    <span style="color:red">*</span>
        <span style="line-height: 40px;margin-right: 16px;"
          >评审信息</span
        >
        <el-select
          v-model="reviewRadio"
          placeholder="请选择评审信息（多选）"
          multiple
          collapse-tags
          collapse-tags-tooltip
          class="reSelect"
          style="width: 350px;"
        >
          <el-option-group
            v-for="group in reviewOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
    </div>
        
  </div>
  <div style="margin-top:21px">
    <span style="line-height: 40px;margin-right: 44px;">备注</span>
        <el-input
          v-model="noteText"
          placeholder="请输入内容"
          style="width: 91%"
        />
  </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closere">取消</el-button>
        <el-button type="primary" @click="reWarehouse"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
    <el-dialog title="仓库设定" v-model="dialogVisible" width="900px">
      <div>
        <el-input
          v-model="input2"
          placeholder="搜索仓库"
          size="large"
          style="width: 418px; margin-bottom: 12px"
          maxlength="100"
          @keyup.enter="getsubject"
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
              @click="getsubject"
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
            <div style="overflow-y: auto;overflow-x: hidden;height: 400px;">
              <el-checkbox-group v-model="checked1" @change="checkSelect" style="display: flex ;flex-direction: column;">
              <el-checkbox
              v-for="item in allselect" :key="item"
                :label="item.name"
                @change="check(item)"
                style="margin-left: 16px; margin-top: 5px;"
              ></el-checkbox>
            </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="selectedwarehouse">
          <span class="dialogTittle"
            >已选择
            <div class="emptybtn" @click="empty">清空</div>
          </span>
          <div class="warehousebox2">
            <div style="overflow-y: auto;overflow-x: hidden;height: 400px;">
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
                  line-height: 36px;
                "
                @close.stop="handleClose(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setWarehouse"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
import { ElLoading } from 'element-plus'
export default {
  name: 'Dashboard',
  data() {
    return {
      name: 'dashboard',
      disabledDate(time) {
        var timeNow = Date.now();
        var before = timeNow - 24 * 60 * 60 * 1000;
        return time.getTime() < before;
      },
      reTitle:'',
      username: '',
      usercd: '',
      numloading:true,
      loadingtable:true,
      checked1: [],
      completeDate:null,
      dialogVisible: false,
      dialogReview:false,
      pageTotal: 50,
      curPage: 1,
      pageSize: 20,
      branchoptions: [],
      allselect: [],
      selected: [],
      languageValue:[],
      reviewRadio:[],
      noteText:'',
      retableData:[],
      databaseoptions: [
        {
          value: '有',
          label: '有'
        },
        {
          value: '无',
          label: '无'
        }
      ],
      languageoptions: [
        {
          label: '前端语言',
          options: [
            {
              value: 'HTML',
              label: 'HTML'
            },
            {
              value: 'JavaScript',
              label: 'JavaScript'
            },
            {
              value: 'CSS',
              label: 'CSS'
            },
            {
              value: 'TypeScript',
              label: 'TypeScript'
            }
          ]
        },
        {
          label: '后端语言',
          options: [
            {
              value: 'XML',
              label: 'XML'
            },
            {
              value: 'Java',
              label: 'Java'
            },
            {
              value: 'SMART Scripts',
              label: 'SMART Scripts'
            },
            {
              value: 'Python',
              label: 'Python'
            },
            {
              value: 'Go',
              label: 'Go'
            },
            {
              value: 'Kotlin',
              label: 'Kotlin'
            },
            {
              value: 'JSP',
              label: 'JSP'
            },
            {
              value: 'Ruby',
              label: 'Ruby'
            },
            {
              value: 'PHP',
              label: 'PHP'
            }
          ]
        }
      ],
      reviewOptions: [
        {
          label: 'RESTful设计',
          options: [
            {
              value: '代码是否合理',
              label: '代码是否合理'
            },
            {
              value: '面向对象',
              label: '面向对象'
            },
            {
              value: '简洁架构',
              label: '简洁架构'
            },
            {
              value: '代码原则',
              label: '代码原则'
            },
            {
              value: '设计模式',
              label: '设计模式'
            }
          ]
        },
        {
          label: '代码安全',
          options: [
            {
              value: '代码注入',
              label: '代码注入'
            },
            {
              value: '敏感数据',
              label: '敏感数据'
            },
            {
              value: 'CSRF攻击',
              label: 'CSRF攻击'
            },
            {
              value: '代码性能',
              label: '代码性能'
            },
            {
              value: '异常处理',
              label: '异常处理'
            }
          ]
        },
        {
          label: '代码重复',
          options: [
            {
              value: '可重用性',
              label: '可重用性'
            },
            {
              value: '核心代码的注释量',
              label: '核心代码的注释量'
            },
            {
              value: '复杂表达式',
              label: '复杂表达式'
            },
            {
              value: '资源释放',
              label: '资源释放'
            },
            {
              value: '内存泄漏',
              label: '内存泄漏'
            }
          ]
        },
        {
          label: '代码',
          options: [
            {
              value: '可扩展性',
              label: '可扩展性'
            },
            {
              value: '配置',
              label: '配置'
            },
            {
              value: '日志处理',
              label: '日志处理'
            },
            {
              value: '第三方组件使用合理性',
              label: '第三方组件使用合理性'
            },
            {
              value: '前端自研开发前端utils(frontend-utils)',
              label: '前端自研开发前端utils(frontend-utils)'
            }
          ]
        }
      ],
      labs: [
        {
          name: '项目',
          children: [
            {
              name: '所有项目',
              number: ''
            },
            {
              name: '进行中的',
              number: ''
            },
            {
              name: '已完成的',
              number: ''
            }
          ]
        }
      ],
      tableData: [],
      input: '',
      input2: '',
      leftType:0,
      topTitle: '所有项目',
      warehouseType: 'Index',
      checkedData:[],
      selectData:[],
      operationFlg: false,
      pjId:'',
      pjName:''
    };
  },
  computed: {
    toWatch() {
      const { pageSize, curPage } = this;
      return { pageSize, curPage };
    }
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
        
      }
    },
    dialogVisible() {
      this.selected = [];
      this.checked1 = [];
      this.checkedData=[];
      this.input2=''
    },
    dialogReview(){
      this.completeDate=null
      this.noteText='';
      this.reviewRadio=[];
      for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].languageoptions=[]
      }
    }
  },
  methods: {
    changeBranch(val){
      for(let i=0;i<val.branchchangeurl.length;i++){
        if(val.branchchangeurl[i].name===val.bvalue){
          val.branchUrl=val.branchchangeurl[i].url
          return
        }
      }
    },
    closere(){
      this.completeDate=null
      this.noteText='';
      this.reviewRadio=[];
      for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].languageoptions=[]
      }
      this.dialogReview = false
    },
    cellClass(row){
       if (row.columnIndex === 0) {
        return 'addAllChecked'
      }
    },
    getbranch(val){
      if(!val.branchoptions){
        val.branchoptions=[]
        val.branchchangeurl=[]
        this.axios
        .get('/actionapi/WarehouseApi/ProjectBranches',{
          params:{
            pj_id:val.id
          }
        }).then((e)=>{
          for(let i=0;i<e.data.branchs.length;i++){
            val.branchoptions.push(e.data.branchs[i].name)
            let obj={}
            obj.name=e.data.branchs[i].name
            obj.url=e.data.branchs[i].web_url
            val.branchchangeurl.push(obj)
          }
        })
      }
    },
    check(val){
      if(this.checkedData.length){
        for(let i=0;i<this.checkedData.length;i++){
          if(this.checkedData[i].name===val.name){
            this.checkedData.splice(i, 1);
            return
          }
        }
        this.checkedData.push(val)
      }else{
        this.checkedData.push(val)
      }
    },
    setWarehouse(){
      this.axios
        .post('/actionapi/QcdApi/QCDProjectSetting',{
            id:this.selectid,
            userId:this.usercd,
            gitlabProject:this.checkedData
        }).then((e)=>{
          if(e.data.Success){
            this.$message.success('设定仓库成功');
          }
        })
      this.dialogVisible = false
    },
    reWarehouse(){
      let reinfor=this.$refs.multipleTableRef.getSelectionRows()
      var reviewItem=[]
      for(let i=0;i<reinfor.length;i++){
        var obj={}
        if(reinfor[i].bvalue===undefined||reinfor[i].languageoptions.length===0||reinfor[i].value===undefined){
          this.$message.error(reinfor[i].pj_name+'仓库有未填写的信息');
          return
        }else{
        obj.projectId=reinfor[i].id
        obj.branchName=reinfor[i].bvalue
        obj.language=reinfor[i].languageoptions.join(',')
        obj.dataBase=reinfor[i].value
        obj.branchUrl=reinfor[i].branchUrl
        }
        reviewItem.push(obj)
      }
      if(reinfor.length===0){
        this.$message.error('您还未选择仓库');
        return
      }
      if(this.completeDate===null||this.reviewRadio.length===0){
        this.$message.error('您还有未填写完成时间或评审信息');
        return
      }
       const loading=ElLoading.service({
              lock: true,
              text: '发送邮件中，请稍候',
              background: 'rgba(0, 0, 0, 0.7)',})
      this.axios
      .post('/actionapi/QcdApi/QCDCodeReview',{
          id:this.pjId,
          userId:this.usercd,
          name:this.pjName,
          reviewInfo:this.reviewRadio.join(','),
          expecteDate:this.completeDate,
          comment:this.noteText,
          reviewItem:reviewItem
      }).then(()=>{
        loading.close()
        this.dialogReview = false
        this.$message.success('申请评审邮件已发出');       
      })
      this.completeDate=null
      this.noteText='';
      this.reviewRadio=[];
      for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].languageoptions=[]
      }
    },
    empty() {
      this.selected = [];
      this.checked1 = [];
      this.checkedData=[];
    },
    showwarehouse(val) {
      this.$router.push({
        name: '查看仓库',
        query: {
          title: val.agreement_name,
          id:val.agreement_cd
        }
      });
    },
    tablaLeave(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].agreement_name === row.agreement_name) {
          this.tableData[i].showbnt = false;
        }
      }
    },
    tableHover(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].agreement_name === row.agreement_name) {
          this.tableData[i].showbnt = true;
        }
      }
    },
    async showSelect(val) {
     await this.getsubject()
     this.$nextTick(function(){
      this.getsubjected(val.agreement_cd)
     })
      this.selectid=val.agreement_cd
      this.dialogVisible = true;
    },
    showReview(val){
      this.reTitle=val.agreement_cd+': '+val.agreement_name
      this.getReviewinfor(val.agreement_cd)
      this.pjId=val.agreement_cd
      this.pjName=val.agreement_name
        this.dialogReview = true;
    },
    getReviewinfor(val){
      this.axios
        .get('/actionapi/QcdApi/QCDProjectDetail',{
          params:{
            userId:this.usercd,
            id:val
          }
        }).then((e)=>{
          this.retableData=e.data.Warehouses
        })
    },
    handleClose(val) {
      this.selected.splice(this.selected.indexOf(val), 1);
      if(this.checkedData.length){
        for(let i=0;i<this.checkedData.length;i++){
          if(this.checkedData[i].name===val){
            this.checkedData.splice(i, 1);
            return
          }
        }
        this.checkedData.push(val)
      }else{
        this.checkedData.push(val)
      }
    },
    checkSelect() {
      this.selected = this.checked1;
    },
    async getsubjected(val){
     await this.axios
        .get('/actionapi/QcdApi/QCDProjectDetail',{
          params:{
            id:val,
            userId:this.usercd
          }
        }).then((e)=>{
          if(e.data.Warehouses){
            for(let i=0;i<e.data.Warehouses.length;i++){
            let subjectarr={}
            subjectarr.id=Number(e.data.Warehouses[i].id)
            subjectarr.name=e.data.Warehouses[i].pj_name
            this.checkedData.push(subjectarr)
            this.selected.push(e.data.Warehouses[i].pj_name)
          }
          }else{
            this.selected=[]
          }
          this.checked1=this.selected
        })
    },
    async getsubject(){
      await this.axios
        .get('/actionapi/QcdApi/GitlabProjectInfo',{
          params:{
            userid:this.usercd,
            name:this.input2.trim()
          }
        }).then((e)=>{
          this.allselect=e.data
        })
    },
    getTitle(val) {
      this.topTitle = val;
      
      if(this.topTitle==='所有项目'){
        this.leftType=0
      }else if(this.topTitle==='进行中的'){
        this.leftType=1
      }else{
        this.leftType=2
      }
      this.getTableData()
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
    },
   async getIndexNum(){
    this.numloading=true;
     await this.axios
        .get('/actionapi/QcdApi/QCDProjectCount',{
          params:{
            userId:this.usercd
          }
        }).then((e)=>{
          this.labs[0].children[0].number=e.data.allCount
          this.labs[0].children[1].number=e.data.doingCount
          this.labs[0].children[2].number=e.data.endCount
          this.numloading=false
        })
    },
    async getTableData(){
      this.loadingtable=true;
      await this.axios
        .get('/actionapi/QcdApi/QCDProjectShow', {
          params: {
            type: this.leftType,
            pageSize: this.pageSize,
            pageNum: this.curPage,
            userId: this.usercd,
            projectInfo:this.input.trim()
          }
        })
        .then((e) => {
          this.pageTotal=e.data.pageNumAll
          this.tableData=e.data.qcdProject
          for(let i=0; i<this.tableData.length;i++){
            this.tableData[i]['showbnt']=false
          }
          this.loadingtable=false
        });
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
        
     }
  },
 async created() {
   await this.getCookie();
   await this.getTableData()
   await this.getIndexNum()
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
.el-pagination .el-select .el-input__inner:focus {
  box-shadow: none !important;
}
.el-pagination .el-select .el-input__inner:hover {
  box-shadow: none !important;
}
.el-pagination .el-select .el-input.is-focus .el-input__inner {
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
.warehousebox1,.warehousebox2 {
  width: 100%;
  border-top: 1px solid #eeeeee;
  padding-top: 6px;
}
.selectTag {
  justify-content: space-between !important;
}
.selectTag .el-tag__content {
width: 360px;
overflow: hidden;
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
.reSelect .el-input__inner{
height: 32px !important;
}
.tableBtn:hover{
  color: #3E79F6;
background-color: #ECF4FF;
}
.el-table .addAllChecked .cell .el-checkbox__inner{
    display: none !important;  
}
.el-table .addAllChecked .cell::before{
    content: '本次评审';
    text-align: center;
}
table th.star div::before {
content: '*';
color: red;
}
</style>
