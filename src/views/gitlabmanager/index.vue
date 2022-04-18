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
        <div style="text-align: left; margin:10px 0">
           <svg-icon width="15" height="15" icon-class="four" />
           <span class="gitlabmanager-left-headlab">{{labs[1].name}}</span>
        </div>
            <el-menu-item  v-for="(labchildren, p) in labs[1].children" :key="p" :index="String(p+labs[0].children.length)"  class="menu-item">
          <span class="gitlabmanager-left-children-left">{{labchildren.name}}</span>
          <span class="gitlabmanager-left-children-right">{{labchildren.number}}</span>
        </el-menu-item>
        </el-menu>
      </div>
    <div class="gitlabmanager-right">
      <div class="gitlabmanager-right-search">
        <div class="gitlabmanager-right-search-left">Executable Program</div>
        <div class="gitlabmanager-right-search-right"><el-input v-model="input" placeholder="搜索GitLab" size="large" style="width:300px" >
        <template #suffix>
          <svg v-show="input==''?false:true" @click="emptyInput" t="1649831312816" class="input-icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2782" width="15" height="15"><path d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z" fill="#bfbfbf" p-id="2783"></path></svg>
          <svg class="input-icon2" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="" width="15" height="15"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
        </template>
      </el-input>
        </div>
      </div>
      <div class="gitlabmanager-right-table">
        <el-table :data="nowDate=tableData
          .filter(
            (data) =>
              !input || data.pj_name.toLowerCase().includes(input.toLowerCase() )||data.last_activity_at.toLowerCase().includes(input.toLowerCase())
          )
          .slice((curPage - 1) * pageSize, curPage * pageSize)
      " style="width: 100%" max-height="75vh">
          <el-table-column label="仓库名称" sortable :sort-method="sortDevName">
            <template #default="scope">
              <div style="color: #0B2646;">{{scope.row.pj_name}}</div>
              <el-tooltip
        class="box-item"
        effect="dark"
        :content="scope.row.description"
        placement="top"
      >
         <div style="color: #8E8E8E;">{{scope.row.description}}</div>
      </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="last_activity_at" label="最近更新" sortable/>
          <el-table-column label="仓库成员" width="100px">
            <template #default="scope">
              <div v-for="(item,index) in scope.row.project_member" :key="index">
                <span v-show="item.avatar==''" >-</span>
                <img :src="item.avatar" :class="'membericon'+index" v-show="index<=2&&item.avatar!=''">
              </div>
            </template>
          </el-table-column>
          <el-table-column >
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
                <span v-show="item.avatar==''" >-</span>
                <img :src="item.avatar" :class="'membericon'+index" v-show="index<=2&&item.avatar!=''">
              </div>
            </template>
          </el-table-column>
          <el-table-column >
            <template #default="scope">
              <div v-show="scope.row.group_member[0].avatar==''">0</div>
              <div v-show="scope.row.group_member[0].avatar!=''">{{scope.row.group_member.length}}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              
              <el-popover placement="left-start" popper-class="atooltip" ref="popoverRef" trigger="click" effect="light" :enterable="false" class="atooltip" v-model:visible="scope.row.archived" >
                <template #reference>
        <svg-icon style="cursor:pointer;" width="5" height="15" icon-class="point" @click="openPopover(scope.$index,scope.row.archived)"  @blur="onBlur" />
      </template>
              
                <div class="atooltip-div" @click="scanResults(scope.$index)" >
                  <svg style="position: relative;top:2px;" t="1649825398762" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13820" width="14" height="14"><path d="M551.6 276V141.4c12.1-56.3 58.2-22 58.2-22L930 395.9c70.4 48.9 4.8 85.7 4.8 85.7L619.5 755.7c-63.1 46.5-67.9-24.5-67.9-24.5V606.4C231.4 506.1 100.4 907.5 100.4 907.5c-12.1 22-19.4 0-19.4 0C-42.8 305.4 551.6 276 551.6 276z" p-id="13821" fill="#8a8a8a"></path></svg>
                    查看扫描结果
                  </div>
                  <div class="atooltip-div" @click="copyUrl(scope.$index)" >
                    <svg style="position: relative;top:2px;" t="1649898986677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33423" width="14" height="14"><path d="M682.666667 256c46.933333 0 85.333333 38.741333 85.333333 85.930667v596.138666C768 985.258667 729.685333 1024 682.666667 1024H85.333333c-46.933333 0-85.333333-38.570667-85.333333-85.930667V341.930667C0 294.741333 38.314667 256 85.333333 256z m256-256c47.018667 0 85.504 38.570667 85.333333 85.589333v682.154667C1024 814.762667 985.685333 853.333333 938.666667 853.333333h-85.333334V767.744h85.333334V85.589333H341.333333v85.504H256V85.589333C256 38.570667 294.314667 0 341.333333 0z" p-id="33424" fill="#8a8a8a"></path></svg>
                    复制 Url 到剪切板
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                    <svg style="position: relative;top:5px;left:-2px" t="1649825488695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14345" width="14" height="18"><path d="M824.018851 478.68115c54.894238-54.782697 66.862827-136.315642 39.917128-201.324238l-96.733135 96.55201c-26.318412 26.27748-71.417563 24.243147-97.735975-2.033309-26.305109-26.27748-28.338419-71.250764-2.034333-97.527221l96.747461-96.553033c-65.12116-26.91807-147.057287-15.186887-201.938222 39.59581-54.349839 54.224995-67.210751 134.225027-39.122019 201.045899l-67.237357 67.098187L284.108175 314.082348l11.716856-25.524327-91.480504-60.82839-58.112536 57.986669 60.940954 91.341335 27.655873-13.793144 171.773202 171.480536L207.144292 733.811852c-12.720719 12.707416-12.720719 33.271778 0 45.949518l61.373813 61.275575c12.706393 12.678764 33.326013 12.678764 46.032406 0l199.456704-199.096501 28.200272 28.14399-7.817036 7.829316c-11.632945 11.592013-14.280238 26.305109-3.162016 37.422308l135.214565 134.978181c11.104919 11.090593 31.375591 13.904685 43.00956 2.312672l62.863746-62.751183c11.618619-11.592013 10.839883-33.912367-0.278339-44.974307L636.809075 609.924263c-11.118222-11.090593-27.92091-6.381337-39.554878 5.210675l-5.754051 5.768377-28.212552-28.14399 71.181179-71.056336C698.892039 543.522947 773.012154 529.590634 824.018851 478.68115L824.018851 478.68115 824.018851 478.68115zM308.79646 774.021645c-13.779841 13.765515-36.099173 13.765515-49.877991 0-13.765515-13.737886-13.765515-36.029588 0-49.795103 13.778818-13.736862 36.098149-13.736862 49.877991 0C322.575278 737.992057 322.575278 760.28376 308.79646 774.021645L308.79646 774.021645 308.79646 774.021645zM308.79646 774.021645" p-id="14346" fill="#8a8a8a"></path></svg>
                    申请权限
                  </div>
                  <div class="atooltip-div" @click="protectedBranch(scope.$index)">
                    <svg style="position: relative;top:2px;" t="1649898713350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9042" width="14" height="14"><path d="M798.72 690.176c-6.144-122.88-126.976-219.136-274.432-219.136h-4.096c-104.448 0-190.464-59.392-210.944-137.216 67.584-16.384 118.784-75.776 118.784-149.504 0-83.968-69.632-153.6-153.6-153.6-86.016 0-153.6 67.584-153.6 153.6 0 73.728 53.248 137.216 122.88 151.552v354.304c-69.632 14.336-122.88 75.776-122.88 151.552 0 83.968 69.632 153.6 153.6 153.6s153.6-69.632 153.6-153.6c0-73.728-53.248-137.216-122.88-151.552v-245.76c51.2 53.248 129.024 86.016 215.04 86.016h4.096c116.736 0 208.896 71.68 212.992 159.744-69.632 14.336-122.88 75.776-122.88 151.552 0 83.968 69.632 153.6 153.6 153.6S921.6 925.696 921.6 839.68c0-73.728-53.248-137.216-122.88-149.504z" p-id="9043" fill="#8a8a8a"></path></svg>
                    保护分支设置
                  </div>
                  <div class="atooltip-div" @click="drawer=true">
                    <svg style="position: relative;top:2px;" t="1649829264730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21539" width="14" height="14"><path d="M836.266667 0H170.666667C114.210133 0 68.266667 45.943467 68.266667 102.4v819.2c0 56.456533 45.943467 102.4 102.4 102.4h665.6c56.456533 0 119.466667-45.943467 119.466666-102.4V102.4c0-56.456533-63.010133-102.4-119.466666-102.4zM324.266667 68.266667h375.466666v119.466666H324.266667V68.266667z m563.2 853.333333a34.133333 34.133333 0 0 1-34.133334 34.133333H170.666667c-18.807467 0-34.133333-15.291733-34.133334-34.133333V102.4c0-18.807467 15.325867-34.133333 34.133334-34.133333h85.333333v119.466666c0 37.649067 30.6176 68.266667 68.266667 68.266667h375.466666c37.649067 0 68.266667-30.6176 68.266667-68.266667V68.266667h85.333333c18.8416 0 34.133333 15.325867 34.133334 34.133333v819.2zM460.032 617.335467l-128.5632-128.3072a34.269867 34.269867 0 0 0-48.384 0 34.065067 34.065067 0 0 0 0 48.264533l152.763733 152.439467c13.3632 13.329067 35.0208 13.329067 48.384 0l290.816-290.133334a34.065067 34.065067 0 0 0 0-48.264533 34.269867 34.269867 0 0 0-48.384 0L460.032 617.335467z" fill="#8a8a8a" p-id="21540"></path></svg>
                    请求技术委员会评审
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                   <svg style="position: relative;top:5px;" t="1649899838722" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="115451" width="18" height="18"><path d="M512 938.688A426.624 426.624 0 1 1 512 85.376a426.624 426.624 0 0 1 0 853.312z m205.632-210.112a298.688 298.688 0 0 0-332.224-487.168l41.6 74.88A213.312 213.312 0 0 1 725.376 512h-128l120.32 216.576z m-78.976 54.016l-41.6-74.88A213.312 213.312 0 0 1 298.688 512h128l-120.32-216.576a298.688 298.688 0 0 0 332.288 487.168z" p-id="115452" fill="#8a8a8a"></path></svg>
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
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes,->, prev, pager, next, jumper,"
          :total="pageTotal=tableData.filter(
          (data) =>
            !input || data.pj_name.toLowerCase().includes(input.toLowerCase())||data.last_activity_at.toLowerCase().includes(input.toLowerCase())
        ).length"
          v-model:current-page="curPage"
          v-model:page-size="pageSize"
        />
      </div>
    </div>
    <el-drawer
    v-model="drawer"
    direction="rtl"
    size="30%"
    :show-close="false"
  >
  <template #title>
      <h2 style="text-align: left;">技术委员会评审</h2>
    </template>
    <div>
      <span style="line-height:52px;float: left;">技术栈:</span>
      <el-input
    v-model="textarea1"
    :rows="2"
    type="textarea"
    placeholder="Please input"
    style="width:80%;float: right;"
  />
    </div>
    <div style="margin-top:100px">
      <span style="line-height:52px;float: left;">审核信息:</span>
      <el-input
    v-model="textarea2"
    :rows="2"
    type="textarea"
    placeholder="Please input"
    style="width:80%;float: right;"
  />
    </div>
    <template #footer>
      <el-button type="primary" plain size="large" @click="closeDrawer">取消</el-button>
      <el-button type="primary" size="large">确定</el-button>
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
      userid:"",
      drawer:false,
      textarea1:"",
      textarea2:"",
      nowDate:[],
      pageTotal:50,
      curPage:1,
      pageSize:10,
      labs: [
        {
          name: '代码仓库',
          children: [{
            name: '所有',
            number: 140
          }, {
            name: '我负责的',
            number: 140
          }, {
            name: '我参与的',
            number: 140
          }, {
            name: '模板仓库',
            number: 140
          },{
            name: '暂停和关闭的仓库',
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
    toWatch(){
      this.$nextTick(function(){
document.getElementsByClassName("el-pagination__total")[0].childNodes[0].nodeValue=(this.curPage-1)*this.pageSize+1+' - '+(this.curPage*this.pageSize>=this.pageTotal?this.pageTotal:this.curPage*this.pageSize)+' of '+this.pageTotal+' items'
      })

    }
  },
  methods: {
    getCookie(){
      var allCookie = document.cookie
     var aryCookie =allCookie.split(';')
     for(let i in aryCookie){
       let getUserid=aryCookie[i].split("=")
        if(getUserid[0]==' userid'){
          this.userid=getUserid[1]
        }
     }
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
      this.textarea1='';
      this.textarea2=''
    },
    copyUrl(val){
      this.$copyText(this.nowDate[val].id).then(()=>{
        this.$message.success("Url复制成功！")
      })
    },
    //TODO
    scanResults(){
      window.open("https://code.trechina.cn/gitlab/project-internal/code-management-tools/gitlab-manager-frontend/activity");
    },
    //TODO
    protectedBranch(val){
      window.open("https://code.trechina.cn/gitlab/project-internal/code-management-tools/gitlab-manager-frontend");
    },
    onBlur(){
      for(let i in this.nowDate){
        this.nowDate[i].archived=false
      }
    },
    openPopover(val,val2){
      console.log(val);
      for(let i in this.nowDate){
        this.nowDate[i].archived=false
      }
      this.nowDate[val].archived=!val2
    },
    emptyInput(){
      console.log(this.pageSize);
      this.input=""
    },
    getTableData(){
      this.axios.get('/actionapi/WarehouseApi/Index').then(e=>{
        
        for(let i=0;i<e.data.Warehouses.length;i++){
          
        var groupSplit=e.data.Warehouses[i].group_member.split(",")
        var projectSplit=e.data.Warehouses[i].project_member.split(",")
        e.data.Warehouses[i].project_member=[]
        for(let j=0;j<projectSplit.length;j+=3){
          let projectReplace=(projectSplit[j]+","+projectSplit[j+1]+","+projectSplit[j+2]).replace(/\'/g,'"')
          if(projectReplace.indexOf(":")==-1){
            projectReplace='{"name":"","access_level":"","avatar":""}'
          }
           let projectParse=JSON.parse(projectReplace)
          e.data.Warehouses[i].project_member.push(projectParse)
        }
        e.data.Warehouses[i].group_member=[]
        for(let k=0;k<groupSplit.length;k+=3){
          let groupReplace=(groupSplit[k]+","+groupSplit[k+1]+","+groupSplit[k+2]).replace(/\'/g,'"')
          if(groupReplace.indexOf('"avatar":')==-1){
            groupReplace='{"name":"","access_level":"","avatar":""}'
          }
          console.log(1);
           let groupParse=JSON.parse(groupReplace)
          e.data.Warehouses[i].group_member.push(groupParse)
        }
          this.tableData.push(e.data.Warehouses[i])
        }
        console.log(this.tableData);
      })
    }
  },
  mounted(){
    document.getElementsByClassName("el-pagination__total")[0].childNodes[0].nodeValue=(this.curPage-1)*this.pageSize+1+' - '+(this.curPage*this.pageSize>=this.pageTotal?this.pageTotal:this.curPage*this.pageSize)+' of '+this.pageTotal+' items'
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
  border-radius: 10px;
  border: 1px solid red;
  z-index: 3;
}
.membericon1{
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid blue;
  left: 25px;
  z-index: 2;
}
.membericon2{
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid gray;
  left: 35px;
  z-index: 1;
}
.membericon0,.membericon1,.membericon2{
  position: absolute;
  top: 30%;
}
.menu-item{
  height: 40px ;
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
</style>
