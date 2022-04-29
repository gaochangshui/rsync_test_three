<template>
  <div class="gitlabmanager">
    <div class="gitlabmanager-left">
        <div style="text-align: left">
           <svg-icon width="15" height="15" icon-class="four" />
           <span class="gitlabmanager-left-headlab">{{labs[0].name}}</span>
        </div>
        <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
      >        
        <el-menu-item  v-for="(labchildren, p) in labs[0].children" :key="p" :index="String(p)" class="menu-item">
          <div class="gitlabmanager-left-children-left">{{labchildren.name}}</div>
          <div class="gitlabmanager-left-children-right">{{labchildren.number}}</div>
        </el-menu-item>
        <!-- <div style="text-align: left; margin:10px 0">
           <svg-icon width="15" height="15" icon-class="four" />
           <span class="gitlabmanager-left-headlab">{{labs[1].name}}</span>
        </div>
            <el-menu-item  v-for="(labchildren, p) in labs[1].children" :key="p" :index="String(p+labs[0].children.length)"  class="menu-item">
          <span class="gitlabmanager-left-children-left">{{labchildren.name}}</span>
          <span class="gitlabmanager-left-children-right">{{labchildren.number}}</span>
        </el-menu-item> -->
        </el-menu>
      </div>
    <div class="gitlabmanager-right">
      <div class="gitlabmanager-right-search">
        <div class="gitlabmanager-right-search-left">项目</div>
        <div class="gitlabmanager-right-search-right"><el-input v-model="input" placeholder="搜索GitLab" size="large" style="width:300px;" maxlength="100" >
        <template #suffix>
          <svg v-show="input==''?false:true" @click="emptyInput" t="1649831312816" class="input-icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2782" width="15" height="15"><path d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z" fill="#bfbfbf" p-id="2783"></path></svg>
          <svg @click="selectGitLab" class="input-icon2" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="" width="15" height="15"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
        </template>
      </el-input>
        </div>
      </div>
      <div class="gitlabmanager-right-table">
        <el-table :data="tableData
      " style="width: 100%" max-height="75vh">
          <el-table-column label="仓库名称" sortable :sort-method="sortDevName" width="400px">
            <template #default="scope">
              <div style="color: #0B2646;">{{scope.row.pj_name}}</div>
              <el-tooltip
        class="box-item"
        effect="dark"
        :content="scope.row.description"
        placement="top"
      >
         <div style="color: #8E8E8E;width:50%">{{scope.row.description}}</div>
      </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="last_activity_at" label="最近更新" sortable/>
          <el-table-column label="仓库成员" width="100px">
            <template #default="scope">
              <div v-for="(item,index) in scope.row.project_member" :key="index">
                <span v-show="item.avatar==''" style="margin-left:10px" >-</span>
                <el-tooltip
      class="item"
      effect="dark"
      :content="item.name"
      placement="top-start"
    >
                <img :src="item.avatar" :class="'membericon'+index" v-show="index<=2&&item.avatar!=''">
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100px" >
            <template #default="scope">
              <div v-show="scope.row.project_member[0].avatar==''">0</div>
              <div v-show="scope.row.project_member[0].avatar!=''">{{scope.row.project_member.length}}</div>
            </template>
          </el-table-column>
          <el-table-column label="分组名称" >
            <template #default="scope">
              <el-tag style="font-weight: 500; font-size: 12px; line-height: 18px; ">{{scope.row.group_name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  label="分组成员" width="100px">
          <template #default="scope">
              <div v-for="(item,index) in scope.row.group_member" :key="index">
                <span v-show="item.avatar==''" style="margin-left:10px" >-</span>
                <el-tooltip
      class="item"
      effect="dark"
      :content="item.name"
      placement="top-start"
    >
                <img :src="item.avatar" :class="'membericon'+index" v-show="index<=2&&item.avatar!=''">
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <div v-show="scope.row.group_member[0].avatar==''">0</div>
              <div v-show="scope.row.group_member[0].avatar!=''">{{scope.row.group_member.length}}</div>
            </template>
          </el-table-column>
          <el-table-column label="评审" width="150px">
            <template #default="scope">
              <span v-show="showj(scope.row.project_member,scope.row.project_member.length)" style="margin-left:10px" >-</span>
              <div v-for="(item,index) in scope.row.project_member" :key="index">   
                <img :src="item.avatar" class="membericon0" v-show="item.name=='Code Reviewer'">
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              
              <el-popover 
              width="300" 
              placement="left-start" 
              popper-class="atooltip" 
              ref="popoverRef" 
              trigger="click" 
              effect="light" 
              :enterable="false" 
              class="atooltip" 
              v-model:visible="scope.row.openFlag" >
                <template #reference>
                    <svg-icon style="cursor:pointer;margin-left:5px;padding:5px 5px;border-radius:5px" width="15" height="18" icon-class="point" @click="openPopover(scope.row)" @blur="onBlur" class="pointFrom" /> 
      </template>
              
                <div class="atooltip-div" @click="scanResults(scope.row)" >
                  <img src="../../assets/icons/fromicon/Frame-5.png" style="width:18px; height:18px;position: relative;top:4px;margin-right:5px">
                    查看扫描结果
                  </div>
                  <div class="atooltip-div" @click="copyUrl(scope.row)" >
                    <img src="../../assets/icons/fromicon/Frame-4.png" style="width:18px; height:18px;position: relative;top:4px;margin-right:5px">
                    复制 Url 到剪切板
                  </div>
                  <div class="atooltip-div" @click="applyForRight(scope.row)">
                    <img src="../../assets/icons/fromicon/Frame-3.png" style="width:18px; height:18px;position: relative;top:4px;margin-right:5px">
                    申请权限
                  </div>
                  <div class="atooltip-div" @click="protectedBranch(scope.row)">
                    <img src="../../assets/icons/fromicon/Frame-2.png" style="width:18px; height:18px;position: relative;top:4px;margin-right:5px">
                    保护分支设置
                  </div>
                  <div class="atooltip-div" @click="drawer=true">
                    <img src="../../assets/icons/fromicon/Frame-1.png" style="width:18px; height:18px;position: relative;top:4px;margin-right:5px">
                    请求技术委员会评审
                  </div>
                  <div class="atooltip-div" @click="scope.row.openFlag = false">
                    <img src="../../assets/icons/fromicon/Frame.png" style="width:18px; height:18px;position: relative;top:4px;margin-right:5px">
                    仓库同步设置
                  </div>         
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gitlabmanager-right-page">
        <el-pagination
          page-size="100"
          :page-sizes="[10, 50, 100]"
          layout="total, sizes,->, prev, pager, next, jumper,"
          v-model:current-page="curPage"
          v-model:page-size="pageSize"
          :page-count="pageTotal"
        />
      </div>
    </div>
    <el-drawer
    v-model="drawer"
    direction="rtl"
    size="25%"
    :show-close="false"
    class="reviewDrawer"
  >
  <template #title>
      <h2>技术委员会评审</h2>
    </template>
    <div>
      <span style="line-height:40px;">分支</span>
      <el-select v-model="branchValue" placeholder="请选择" style="width:100%;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      
    >
    </el-option>
  </el-select>
    </div>
    <div style="margin-top:20px">
      <span style="line-height:40px">主要语言</span>
      <el-select v-model="languageValue" multiple placeholder="请选择主要语言（多选）" style="width:100%">
    <el-option
      v-for="item in languageoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
    </div>
    <div style="margin-top:20px">
      <span style="line-height:40px;">数据库操作</span>
      <el-select v-model="databaseValue" placeholder="请选择" style="width:100%">
    <el-option
      v-for="item in databaseoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
    </div>
    <div style="margin-top:20px">
      <span style="line-height:40px;">评审信息</span>
      <el-select v-model="reviewRadio" placeholder="请选择评审信息（多选）" multiple style="width:100%">
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
    <div style="margin-top:20px">
      <span style="line-height:40px">期望完成日期</span>
      <el-date-picker :disabled-date="disabledDate" v-model="completeDate" type="date" placeholder="选择日期" style="width:100%;"  value-format="YYYY-MM-DD" >
    </el-date-picker>
    </div>
    <div style="margin-top:20px">
      <span style="line-height:40px">备注</span>
      <el-input
    v-model="noteText"
    :rows="5"
    type="textarea"
    placeholder="请输入"
    style="width:100%;float: right;"
  />
    </div>
    <template #footer>
      <el-button type="primary" plain size="large" @click="closeDrawer">取消</el-button>
      <el-button type="primary" size="large" @click="reWarehouse">确定</el-button>
    </template>
  </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'GitlabManager',
  data() {
    return {
      name: 'gitlabmanager',
        disabledDate(time) {
          var timeNow = Date.now();
          var before = timeNow - 24 * 60 * 60 * 1000;
          return time.getTime() < before;
        },
      props: { multiple: true },
      username:'',
      usercd:'',
      drawer:false,
      branchValue:"",
      databaseValue:"",
      languageValue:"",
      completeDate:'',
      reviewRadio:'',
      noteText:"",
      pageTotal:50,
      curPage:1,
      pageSize:10,
      pjUrl:'',
      databaseoptions:[
        {
           value: 'true',
            label: '有',
        },
        {
           value: 'false',
            label: '无',
        }
      ],
      languageoptions:[
        {
           value: 'XML',
            label: 'XML',
        },
        {
           value: 'Java',
            label: 'Java',
        },
        {
           value: 'HTML',
            label: 'HTML',
        },
        {
           value: 'JavaScript',
            label: 'JavaScript',
        },
        {
           value: 'SMART Scripts',
            label: 'SMART Scripts',
        },
        {
           value: 'Python',
            label: 'Python',
        },
        {
           value: 'CSS',
            label: 'CSS',
        },
        {
           value: 'TypeScript',
            label: 'TypeScript',
        },
        {
           value: 'Go',
            label: 'Go',
        },
        {
           value: 'Kotlin',
            label: 'Kotlin',
        },
        {
           value: 'JSP',
            label: 'JSP',
        },
        {
           value: 'Ruby',
            label: 'Ruby',
        },
        {
           value: 'PHP',
            label: 'PHP',
        },
      ],
      reviewOptions:[
       {
    label: 'restful设计',
    options: [
      {
        value: '代码是否合理',
        label: '代码是否合理',
      },
      {
        value: '面向对象',
        label: '面向对象',
      },
      {
        value: '简洁架构',
        label: '简洁架构',
      },
      {
        value: '代码原则',
        label: '代码原则',
      },
      {
        value: '设计模式',
        label: '设计模式',
      },
    ],
  },
  {
    label: '代码安全',
    options: [
      {
        value: '代码注入',
        label: '代码注入',
      },
      {
        value: '敏感数据',
        label: '敏感数据',
      },
      {
        value: 'CSRF攻击',
        label: 'CSRF攻击',
      },
      {
        value: '代码性能',
        label: '代码性能',
      },
      {
        value:'异常处理',
        label:'异常处理',
      },
    ],
  },
  {
    label: '代码重复',
    options: [
      {
        value: '可重用性',
        label: '可重用性',
      },
      {
        value: '核心代码的注释量',
        label: '核心代码的注释量',
      },
      {
        value: '复杂表达式',
        label: '复杂表达式',
      },
      {
        value: '资源释放',
        label: '资源释放',
      },
      {
        value:'内存泄漏',
        label:'内存泄漏',
      },
    ],
  },
  {
    label: '代码',
    options: [
      {
        value: '可扩展性',
        label: '可扩展性',
      },
      {
        value: '配置',
        label: '配置',
      },
      {
        value: '日志处理',
        label: '日志处理',
      },
      {
        value:'第三方组件使用合理性',
        label:'第三方组件使用合理性',
      },
    ],
  },
      ],
      labs: [
        {
          name: '代码仓库',
          children: [{
            name: '所有仓库',
            number: 140
          },  {
            name: '我参与的',
            number: 140
          }, {
            name: '模板仓库',
            number: 140
          }
          ]
        }, {
          name: '代码评审',
          children: [{
            name: '开启的',
            number: 140
          }, {
            name: '已合并',
            number: 140
          }, {
            name: '已关闭',
            number: 140
          }]
        }
      ],
      tableData: [],
      input: ''
    };
  },
  computed: {
    // 同时监听多个参数
    toWatch() {
      const { pageSize, curPage ,pageTotal} = this;
      return { pageSize, curPage,pageTotal };
    },
  },
  watch:{
    drawer(){
      this.branchValue='';
      this.databaseValue='';
      this.languageValue='';
      this.completeDate='';
      this.reviewRadio='';
      this.noteText='';
    },
    toWatch(){
      this.$nextTick(function(){
        this.getTableData()
document.getElementsByClassName("el-pagination__total")[0].childNodes[0].nodeValue=(this.curPage-1)*this.pageSize+1+' - '+(this.curPage*this.pageSize>=this.pageTotal?this.pageTotal:this.curPage*this.pageSize)+' 条/共 '+this.pageTotal+' 条'
      })

    }
  },
  methods: {
    showj(val,val2){
      var showFlag=true
      for(let i=0;i<val2;i++){
        if(val[i].name=='Code Reviewer'){
          showFlag=false
        }
      }
  return showFlag
      
    },
    getCookie(){
      var allCookie = document.cookie
     var aryCookie =allCookie.split(';')
     for(let i in aryCookie){
       let getUserid=aryCookie[i].split("=")
        if(getUserid[0].trim()=='LoginedUserName'){
          this.username=getUserid[1]
          console.log(this.username);
        }
        if(getUserid[0]==' LoginedUser'){
          this.usercd=getUserid[1]
          console.log(this.usercd);
        }
     }
    },
    selectGitLab(){
      this.curPage=1
      this.getTableData()
    },
    sortDevName(str1,str2){
      let res = 0
       for (let i = 0; ;i++) {
  if (!str1[i] || !str2[i]) {
   res = str1.length - str2.length
   break
  }
  const char1 = str1[i]
  const char2 = str2[i]
   res = char1.charCodeAt(0) - char2.charCodeAt(0)
   break
       }
   return res
    },
    closeDrawer(){
      this.drawer=false;
    },
    reWarehouse(){
      console.log(this.branchValue);
      console.log(this.databaseValue);
console.log(this.languageValue);
console.log(this.completeDate);
console.log(this.reviewRadio);
console.log(this.noteText);
this.drawer=false;
    },
    copyUrl(val){
      this.axios.get('/actionapi/WarehouseApi/ProjectURL', {params:{
          pj_id:val.id
        }}).then(e=>{
          this.$copyText(e.data.url).then(()=>{
        this.$message.success("Url复制成功！")
      })
        })    
    },
    //TODO
    scanResults(val){
      this.axios.get('/actionapi/WarehouseApi/ProjectURL', {params:{
          pj_id:val.id
        }}).then(e=>{
          window.open(e.data.url+"/activity");
        })
      
    },
    applyForRight(val){
      this.axios.get('/actionapi/WarehouseApi/RequestForAccess', {params:{
          pj_id:val.id,
          user_cd:this.usercd
        }}).then(()=>{
          this.$message.success("申请成功，已经申请develop权限，仅1天！")
        })
    },
    //TODO
    protectedBranch(val){
      this.axios.get('/actionapi/WarehouseApi/ProjectURL', {params:{
          pj_id:val.id
        }}).then(e=>{
          window.open(e.data.url+"/-/settings/repository");
        })
    },
    onBlur(){
      for(let i in this.tableData){
        this.tableData[i].openFlag=false
      }
    },
    openPopover(val2){
      for(let i in this.tableData){
        this.tableData[i].openFlag=false
      }
      for(let j in this.tableData){
        if(this.tableData[j].id===val2.id){
          this.tableData[j].openFlag=true
        }
      }
      
    },
    emptyInput(){
      this.input=""
    },
    getTableData(){
      this.tableData=[]
      this.axios.get('/actionapi/WarehouseApi/Index',{
        params:{
          pj_name:this.input,
          group_name:this.input,
          pageSize:this.pageSize,
          pageNum:this.curPage
        }
      }).then(e=>{
        this.pageTotal=e.data.pageNumAll-1
        for(let i=0;i<e.data.Warehouses.length;i++){ 
        var groupSplit=e.data.Warehouses[i].group_member.split(",")
        var projectSplit=e.data.Warehouses[i].project_member.split(",")
        e.data.Warehouses[i].project_member=[]
        for(let j=0;j<projectSplit.length;j+=4){
          let projectReplace=(projectSplit[j]+","+projectSplit[j+1]+","+projectSplit[j+2]+","+projectSplit[j+3]).replace(/\'/g,'"')
          if(projectReplace.indexOf('"avatar":')==-1){
            projectReplace='{"id":"","name":"","access_level":"","avatar":""}'
          }
           let projectParse=JSON.parse(projectReplace)
          e.data.Warehouses[i].project_member.push(projectParse)
        }
        e.data.Warehouses[i].group_member=[]
        for(let k=0;k<groupSplit.length;k+=4){
          let groupReplace=(groupSplit[k]+","+groupSplit[k+1]+","+groupSplit[k+2]+","+groupSplit[k+3]).replace(/\'/g,'"')
          if(groupReplace.indexOf('"avatar":')==-1){
            groupReplace='{"id":"","name":"","access_level":"","avatar":""}'
          }
           let groupParse=JSON.parse(groupReplace)
          e.data.Warehouses[i].group_member.push(groupParse)
        }
        e.data.Warehouses[i]["openFlag"]=false
          this.tableData.push(e.data.Warehouses[i])
          
          this.tableData[i].last_activity_at=this.tableData[i].last_activity_at.split(" ")[0]
        }
        console.log(this.tableData);
      })
    }
  },
  created(){
    this.getTableData()
    this.getCookie()
    
  }
}
</script>

<style lang="less" scoped>
.membericon0{
  width: 20px;
  height: 20px;
  border-radius: 11px;
  border: 1px solid red;
  z-index: 3;
}
.membericon1{
  width: 20px;
  height: 20px;
  border-radius: 11px;
  border: 1px solid blue;
  left: 25px;
  z-index: 2;
}
.membericon2{
  width: 20px;
  height: 20px;
  border-radius: 11px;
  border: 1px solid gray;
  left: 35px;
  z-index: 1;
}
.membericon0,.membericon1,.membericon2{
  position: absolute;
  top: 30%;
}
.menu-item{
  height:40px ;
}
.gitlabmanager {
  display: flex;
  padding: 0 20px;
  height: calc(100vh - 100px);
  &-left {
    width: 240px;
    box-shadow: inset -1px 0px 0px #ECECEC;
    min-height: calc(100vh - 86px);
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
      &-left{
        margin-left: 20px;
      }
      &-right {
        color: #909AAA;
        position:absolute;
        left: 80%;
      }
    }
  }
  &-right {
    padding: 20px;
    width: calc(100vw - 300px);
    &-search {
      display: flex;
      justify-content: space-between;
      &-left {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: #4B4B4B;
      }
    }
    &-table {
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #4B4B4B;
    }
  }
}
  /deep/ .atooltip {
    background: #FFFFFF !important;
  }
  /deep/ .atooltip.el-tooltip__popper[x-placement^="left"] .atooltip {
    background: #FFFFFF;
  }
  /deep/ .atooltip.el-tooltip__popper[x-placement^="left"] .atooltip:after {
    background: #FFFFFF;
  }
  /deep/.el-pagination .el-input--suffix .el-input__inner{
    box-shadow:none
  }
  /deep/.el-pagination .el-select .el-input.is-focus .el-input__inner{
   box-shadow:none !important
  }
  /deep/.el-pagination .el-select .el-input__inner:focus{
   box-shadow:none !important
  }
  /deep/.el-pagination{
    position: relative;
    top: 80%;
  }
  /deep/.pointFrom:focus{
    outline: none;
  }
  .pointFrom:hover{
    background-color:#f0eeee ;
  }
  .atooltip-div {
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    color: #4B4B4B;
    height: 30px;

  }
  .atooltip-div:hover{
    background: #f3f2f2;
    cursor: pointer;
  }
  .input-icon1,.input-icon2{
    position: relative;
    top: 30%;
    cursor: pointer;
  }
  .input-icon1{
    margin-right: 10px;
  }
  /deep/.el-drawer .el-drawer__header{
    margin: 0;

  }
</style>
