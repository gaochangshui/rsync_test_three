<template>
  <div class="gitlabmanager" @click="onBlur">
    <div class="gitlabmanager-right">
      <div class="gitlabmanager-right-search">
        <div class="gitlabmanager-right-search-left">
          <el-page-header :content="headtitle" title=" " @back="goBack" />
        </div>
        <div
          class="gitlabmanager-right-search-right"
        >
          <el-input
            v-model="input"
            placeholder="搜索仓库名称、分组名称"
            size="large"
            style="width: 300px; margin-bottom: 12px"
            maxlength="100"
            @keyup.enter="selectGitLab"
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
        <div class="gitlabmanager-right-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ background: '#FAFAFA' }"
            v-loading="loadingtable"
            element-loading-text="加载中..."
          >
            <el-table-column
              label="仓库名称"
              sortable
              :sort-method="sortDevName"
            >
              <template #default="scope">
                <div style="color: #0b2646">{{ scope.row.pj_name }}</div>
                <el-tooltip
                  class="box-item"
                  effect="light"
                  :content="scope.row.description"
                  placement="top-start"
                  show-after="1000"
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
                    {{ scope.row.description }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="last_activity_at"
              label="最近更新"
              sortable
              width="150px"
            />
            <el-table-column label="仓库成员" width="80px">
              <template #default="scope">
                <div
                  v-for="(item, index) in scope.row.project_member"
                  :key="index"
                >
                  <span v-show="item.avatar == ''" style="margin-left: 10px"
                    >-</span
                  >
                  <el-tooltip
                    class="item"
                    effect="light"
                    :content="item.name"
                    placement="top-start"
                    show-after="1000"
                  >
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #ff4d4f"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'Owner'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #ffc53d"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'M'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #73d13d"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'R'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #40a9ff"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'D'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #d9d9d9"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'G'
                      "
                    />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="70px">
              <template #default="scope">
                <div v-show="scope.row.project_member[0].avatar != ''">
                  {{ scope.row.project_member.length }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="分组名称" width="210px">
              <template #default="scope">
                <el-tag
                  style="font-weight: 500; font-size: 12px; line-height: 18px"
                  >{{ scope.row.group_name }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="分组成员" width="80px">
              <template #default="scope">
                <div
                  v-for="(item, index) in scope.row.group_member"
                  :key="index"
                >
                  <span
                    v-show="item.avatar == '' && item.name != 'jenkins-zgzn'"
                    style="margin-left: 10px"
                    >-</span
                  >
                  <el-tooltip
                    class="item"
                    effect="light"
                    :content="item.name"
                    placement="top-start"
                    show-after="1000"
                  >
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #ff4d4f"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'Owner'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #ffc53d"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'M'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #73d13d"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'R'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #40a9ff"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'D'
                      "
                    />
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      style="border: 1px solid #d9d9d9"
                      v-if="
                        index <= 2 &&
                        item.avatar != '' &&
                        item.access_level === 'G'
                      "
                    />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="70px">
              <template #default="scope">
                <div v-show="scope.row.group_member[0].avatar != ''">
                  {{ scope.row.group_member.length }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="评审" width="60px">
              <template #default="scope">
                <span
                  v-show="
                    showj(
                      scope.row.project_member,
                      scope.row.project_member.length
                    )
                  "
                  style="margin-left: 10px"
                  >-</span
                >
                <div
                  v-for="(item, index) in scope.row.project_member"
                  :key="index"
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    :content="item.name"
                    placement="top-start"
                    show-after="1000"
                  >
                    <img
                      :src="item.avatar"
                      class="membericon0"
                      style="border: 1px solid #ffc53d"
                      v-show="item.name == 'Code Reviewer'"
                    />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="right"
              width="60px"
            >
              <template #default="scope">
                <el-popover
                  width="300"
                  placement="left-start"
                  popper-class="atooltip"
                  ref="popoverRef"
                  trigger="click"
                  effect="light"
                  :enterable="false"
                  v-model:visible="scope.row.openFlag"
                >
                  <template #reference>
                    <svg-icon
                      style="
                        cursor: pointer;
                        margin-left: 5px;
                        padding: 5px 5px;
                        border-radius: 5px;
                      "
                      width="15"
                      height="18"
                      icon-class="point"
                      @click.stop="openPopover(scope.row)"
                      class="pointFrom"
                    />
                  </template>
                  <div class="atooltip-div" @click.stop="copyUrl(scope.row)">
                    <img
                      src="../../assets/icons/fromicon/Frame-4.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    复制 Url 到剪切板
                  </div>
                  <el-popconfirm
                    title="是否确定申请developer权限（有效期1天）？"
                    @confirm="applyForRight(scope.row)"
                  >
                    <template #reference>
                      <div
                        class="atooltip-div"
                        v-show="topTitle !== '我参与的'"
                      >
                        <img
                          src="../../assets/icons/fromicon/Frame-3.png"
                          style="
                            width: 18px;
                            height: 18px;
                            position: relative;
                            top: 4px;
                            margin-right: 5px;
                          "
                        />
                        申请权限
                      </div>
                    </template>
                  </el-popconfirm>
                  <div
                    :class="[operationFlg ? 'atooltip-div' : 'atooltip-div2']"
                    @click.stop="scanResults(scope.row)"
                  >
                    <img
                      src="../../assets/icons/fromicon/Frame-5.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    查看扫描结果
                  </div>
                  <div
                    :class="[operationFlg ? 'atooltip-div' : 'atooltip-div2']"
                    @click.stop="protectedBranch(scope.row)"
                  >
                    <img
                      src="../../assets/icons/fromicon/Frame-2.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    保护分支设置
                  </div>
                  <div
                    :class="[operationFlg ? 'atooltip-div' : 'atooltip-div2']"
                    @click.stop="review(scope.row)"
                  >
                    <img
                      src="../../assets/icons/fromicon/Frame-1.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    请求技术委员会评审
                  </div>
                  <div
                    :class="[Syncflg ? 'atooltip-div' : 'atooltip-div2']"
                    @click.stop="SyncWarehouse(scope.row)"
                  >
                    <img
                      src="../../assets/icons/fromicon/Frame.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    仓库同步设置
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="gitlabmanager-right-page"
            v-show="pageTotal / pageSize > 1"
          >
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
    <el-drawer
      v-model="synchronousDrawer"
      direction="rtl"
      size="30%"
      :show-close="false"
      class="synchronousDrawer"
    >
      <template #title>
        <h2>仓库同步设置</h2>
      </template>
      <div>
        <span style="line-height: 40px"
          >分支（会同步至远程仓库同名分支）<span
            style="color: red; line-height: 40px"
            >*</span
          ></span
        >
        <el-select
          v-model="branchValue"
          placeholder="请选择"
          multiple
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in branchoptions"
            :key="index"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span style="line-height: 40px"
          >远程地址（请提前创建远程仓库保证其存在）<span
            style="color: red; line-height: 40px"
            >*</span
          ></span
        >
        <el-input
          v-model="addressinput"
          placeholder="请输入详细地址"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="addressValue"
              placeholder="请选择地址"
              style="width: 230px"
              @change="changeFlag"
            >
              <el-option
                v-for="item in addressoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-input>
      </div>
      <div v-show="userFlag">
        <span style="line-height: 40px"
          >用户名<span style="color: red; line-height: 40px">*</span></span
        >
        <el-input
          v-model="userinput"
          placeholder="请输入GitHub用户名"
          style="width: 100%"
        ></el-input>
      </div>
      <div v-show="userFlag">
        <span style="line-height: 40px"
          >Token（未更改默认使用已保存的Token）<span style="color: red; line-height: 40px">*</span></span
        >
        <el-input
          v-model="tokeninput"
          type="password"
          placeholder="请输入Token"
          style="width: 100%"
          show-password
        ></el-input>
      </div>
      <template #footer>
        <el-button size="large" @click="saveWarehouse">保存</el-button>
        <el-button type="primary" size="large" @click="addWarehouse"
          >保存并立即同期</el-button
        >
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { log } from 'console';
import { ElLoading , ElMessageBox } from 'element-plus'
import axios from '@/http'
export default {
  name: 'GitlabManager',
  data() {
    return {
      name: 'gitlabmanager',
      headtitle: '',
      loading:true,
      loadingtable:true,
      props: { multiple: true },
      username: '',
      userinput: '',
      tokeninput:'',
      usercd: '',
      synchronousDrawer: false,
      branchValue: [],
      addressValue: '',
      addressinput: '',
      userFlag: false,
      pageTotal: 50,
      curPage: 1,
      pageSize: 20,
      pjUrl: '',
      pjId: '',
      branchoptions: [],
      addressoptions: [
        {
          value: 'http://10.2.1.117/',
          label: 'http://10.2.1.117/'
        },
        {
          value: 'https://github.com/retail-ai-inc/',
          label: 'https://github.com/retail-ai-inc/'
        }
      ],
      tableData: [],
      input: '',
      topTitle: '所有仓库',
      warehouseType: 'Index',
      operationFlg: false,
      timer:null,
      Syncflg:false,
      tokenFlg:false,
      tokencontrast:''
    };
  },
  computed: {
    toWatch() {
      const { pageSize, curPage } = this;
      return { pageSize, curPage };
    }
  },
  watch: {
    addressValue() {
      if (this.addressValue === 'https://github.com/retail-ai-inc/') {
        this.userFlag = true;
      } else {
        this.userFlag = false;
        this.userinput = '';
      }
    },
    synchronousDrawer() {
      this.branchValue = '';
      this.addressValue = '';
      this.userinput = '';
      this.tokeninput = '';
      //this.addressinput = '';
      this.userFlag = false;
    },
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
  },
  methods: {
    goBack() {
      let flag=1
      this.$router.push({
        name: '项目',
        query: {
          inputValue:this.$route.query.selectVale,
          flag:flag
        }
      });
    },
    async getBreach(val) {
     await axios
        .get('/actionapi/WarehouseApi/ProjectBranches', {
          params: {
            pj_id: val
          },
        })
        .then((e) => {
          this.branchoptions = e.data.branchs;
        });
    },
    review(val) {
      if (this.operationFlg) {
      ElMessageBox.confirm(
    '请到项目的菜单中申请评审，是否跳转到项目页面?',
    '提示',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(() => {
      this.$router.push({
        name: '项目',
        query:{
          indexType:3,
          indexNum:'1'
        }
      });
    }).catch(() => {
    })
  }
    },
   async SyncWarehouse(val) {
      this.addressinput = '';
      if (this.Syncflg) {
        this.synchronousDrawer = true;
      await  this.getBreach(val.id);
        this.pjId=val.id;
      await  this.getSyncWarehouse();
        val.openFlag = false;
      }
    },
    async getSyncWarehouse(){
     await axios
        .get('/actionapi/WarehouseApi/WarehouseSetting', {
          params: {
            pj_id: this.pjId
          },
        })
        .then((e) => {
          if(e.data.setting){
            this.branchValue=e.data.setting.sync_branches.split(',')
          if(e.data.setting.remote_url.indexOf('github.com')!==-1){
            this.addressValue=e.data.setting.remote_url.slice(0,33);
            this.addressinput=e.data.setting.remote_url.slice(33);
            this.userinput=e.data.setting.remote_user;
            this.tokeninput=e.data.setting.remote_token;
            this.tokencontrast=e.data.setting.remote_token;
          }else{
            this.addressValue=e.data.setting.remote_url.slice(0,18);
            this.addressinput=e.data.setting.remote_url.slice(18);
            this.userinput=e.data.setting.remote_user;
            this.tokeninput=e.data.setting.remote_token;
            this.tokencontrast=e.data.setting.remote_token;
          }
          }else{
            this.tokencontrast='unchanged'
          }
          
        });
    },
    showj(val, val2) {
      var showFlag = true;
      for (let i = 0; i < val2; i++) {
        if (val[i].name === 'Code Reviewer') {
          showFlag = false;
        }
      }
      return showFlag;
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
    branchString(){
      var branchstring='';
      for(let i=0;i<this.branchValue.length;i++){
        if(i===0){
          branchstring=branchstring+this.branchValue[i]
        }else{
          branchstring=branchstring+','+this.branchValue[i]
        }      
      }
      return branchstring
    },
    saveWarehouse(){
      var branchstring=this.branchString()
      if (this.addressValue === '') {
        this.$message.error('您还有必填信息未填写！！！');
      } else {
        if (this.addressValue === 'http://10.2.1.117/') {
          if (this.addressinput === '' || this.branchValue.length === 0) {
            this.$message.error('您还有必填信息未填写！！！');
          } else {
            if(this.tokeninput===this.tokencontrast){
              this.tokenFlg=false
            }else{
              this.tokenFlg=true
            }
             axios
          .post('/actionapi/WarehouseApi/SaveWarehouseSetting', {
              pj_id: this.pjId,
              user_cd: this.usercd,
              branch: branchstring,
              remote_url:this.addressValue+this.addressinput.trim()
          }).then(() => {
            this.$message.success('保存成功');
          });
            this.synchronousDrawer = false;
          }
        } else {
          if (
            this.addressinput === '' ||
            this.branchValue.length === 0 ||
            this.userinput === '' ||
            this.tokeninput === ''
          ) {
            this.$message.error('您还有必填信息未填写！！！');
          } else {
            if(this.tokeninput===this.tokencontrast){
              this.tokenFlg=false
            }else{
              this.tokenFlg=true
            }
             axios
          .post('/actionapi/WarehouseApi/SaveWarehouseSetting', {   
              pj_id: this.pjId,
              user_cd: this.usercd,
              branch: branchstring,
              remote_url:this.addressValue+this.addressinput.trim(),
              remote_token:this.tokeninput.trim(),
              remote_user:this.userinput.trim(),
              is_modified:this.tokenFlg
          }).then(() => {
            this.$message.success('保存成功');
          });
            this.synchronousDrawer = false;
          }
        }
      }
    },   
    addWarehouse() {
      var branchstring=this.branchString()
      if (this.addressValue === '') {
        this.$message.error('您还有必填信息未填写！！！');
      } else {
        if (this.addressValue === 'http://10.2.1.117/') {
          if (this.addressinput === '' || this.branchValue.length === 0) {
            this.$message.error('您还有必填信息未填写！！！');
          } else {
            if(this.tokeninput===this.tokencontrast){
              this.tokenFlg=false
            }else{
              this.tokenFlg=true
            }
            const loading=ElLoading.service({
              lock: true,
              text: '正在同期，请稍后',
              background: 'rgba(0, 0, 0, 0.7)',})
             axios
          .post('/actionapi/WarehouseApi/SaveWarehouseSetting', {
              pj_id: this.pjId,
              user_cd: this.usercd,
              branch: branchstring,
              remote_url:this.addressValue+this.addressinput.trim()
          }).then(() => {
            
            this.saveSyncWarehouse(loading);
          });
          
            this.synchronousDrawer = false;
          }
        } else {
          if (
            this.addressinput === '' ||
            this.branchValue.length === 0 ||
            this.userinput === '' ||
            this.tokeninput === ''
          ) {
            this.$message.error('您还有必填信息未填写！！！');
          } else {
            if(this.tokeninput===this.tokencontrast){
              this.tokenFlg=false
            }else{
              this.tokenFlg=true
            }
             const loading=ElLoading.service({
              lock: true,
              text: '正在同期，请稍候',
              background: 'rgba(0, 0, 0, 0.7)',})
             axios
          .post('/actionapi/WarehouseApi/SaveWarehouseSetting', {
              pj_id: this.pjId,
              user_cd: this.usercd,
              branch: branchstring,
              remote_url:this.addressValue+this.addressinput.trim(),
              remote_token:this.tokeninput.trim(),
              remote_user:this.userinput.trim(),
              is_modified:this.tokenFlg
          }).then(() => {
           
              this.saveSyncWarehouse(loading);
            
          });
            
          }
        }
      }
    },
    saveSyncWarehouse(loading){
      var addressArr=this.addressinput.split('.')
      var addressSuffix=addressArr[addressArr.length-1]
      if(addressSuffix==='git'){
        axios({
          method:'get',
          url:'/actionapi/WarehouseApi/SyncWarehouse',
          timeout:600000,
          params:{
            pj_id:this.pjId,
            user_cd:this.usercd,         
          }
        }).then((e)=>{
        loading.close();
          if(e.data.Success){
            this.$message.success('保存并同期成功');
            this.synchronousDrawer = false;
          }else{
             this.$message.error('同期失败：'+e.data.Message);
          }  
        }).catch(()=>{
          loading.close();
        })
      }else{
        loading.close();
        this.$message.error('远程地址请以.git结尾');
      }
        
        
    },
    copyUrl(val) {
      axios
        .get('/actionapi/WarehouseApi/ProjectURL', {
          params: {
            pj_id: val.id
          },
        })
        .then((e) => {
          this.$copyText(e.data.url).then(() => {
            this.$message.success('Url复制成功！');
          });
        });
      val.openFlag = false;
    },
    scanResults(val) {
      if (this.operationFlg) {
        axios
          .get('/actionapi/WarehouseApi/ProjectURL', {
            params: {
              pj_id: val.id
            },
          })
          .then((e) => {
            window.open(e.data.url + '/activity');
          });
        val.openFlag = false;
      }
    },
    applyForRight(val) {
      axios
        .get('/actionapi/WarehouseApi/RequestForAccess', {
          params: {
            pj_id: val.id,
            user_cd: this.usercd
          }
        })
        .then(() => {
          this.$message.success('申请成功，已追加developer权限，有效期1天。');
        });
      val.openFlag = false;
    },
    protectedBranch(val) {
      if (this.operationFlg) {
        axios
          .get('/actionapi/WarehouseApi/ProjectURL', {
            params: {
              pj_id: val.id
            }
          })
          .then((e) => {
            window.open(e.data.url + '/-/settings/repository');
          });
        val.openFlag = false;
      }
    },
    onBlur() {
      for (let i in this.tableData) {
        this.tableData[i].openFlag = false;
      }
    },
    openPopover(val2) {
      for (let k = 0; k < val2.project_member.length; k++) {
        if (val2.project_member[k].name === this.username) {
          if(val2.project_member[k].access_level==='Owner'||val2.project_member[k].access_level==='M'){
            this.Syncflg=true
          }
          this.operationFlg = true;
          break;
        } else {
          this.Syncflg=false;
          this.operationFlg = false;
        }
      }
      if (!this.operationFlg) {
        for (let g = 0; g < val2.group_member.length; g++) {
          if (val2.group_member[g].name === this.username) {
            if(val2.group_member[g].access_level==='Owner'||val2.group_member[g].access_level==='M'){
            this.Syncflg=true
          }
            this.operationFlg = true;
            break;
          } else {
            this.Syncflg=false;
            this.operationFlg = false;
          }
        }
      }

      for (let i in this.tableData) {
        this.tableData[i].openFlag = false;
      }
      for (let j in this.tableData) {
        if (this.tableData[j].id === val2.id) {
          this.tableData[j].openFlag = true;
        }
      }
    },
    emptyInput() {
      this.input = '';
    },
    dataTreating(val){
    var arr=[]
      for (let j = 0; j < val.length; j += 4) {
              let Replace = (
                val[j] +
                ',' +
                val[j + 1] +
                ',' +
                val[j + 2] +
                ',' +
                val[j + 3]
              ).replace(/\'/g, '"');
              if (
                Replace.indexOf('"name":') === -1 
              ) {
                Replace =
                  '{"id":"","name":"","access_level":"","avatar":""}';
              }
              let Parse = JSON.parse(Replace);
              
              arr.push(Parse)              
            }
            return arr
    },
    async getTableData() {
      this.loadingtable=true
      this.tableData = [];
      await axios
        .get('/actionapi/QcdApi/QCDProjectDetail', {
          params: {
            id:this.$route.query.id,
            pj_name: this.input.trim(),
            group_name: this.input.trim(),
            pageSize: this.pageSize,
            pageNum: this.curPage,
            userId: this.usercd
          }
        })
        .then((e) => {
          if(!e.data.Warehouses){
            this.loadingtable=false
            return
          }
          this.pageTotal = e.data.rowCount;
          for (let i = 0; i < e.data.Warehouses.length; i++) {
            var groupSplit = e.data.Warehouses[i].group_member.split(',');
            var projectSplit = e.data.Warehouses[i].project_member.split(',');
            e.data.Warehouses[i].project_member = [];            
            e.data.Warehouses[i].project_member=this.dataTreating(projectSplit)
            e.data.Warehouses[i].group_member = [];
            e.data.Warehouses[i].group_member=this.dataTreating(groupSplit);
            e.data.Warehouses[i]['openFlag'] = false;
            this.tableData.push(e.data.Warehouses[i]);
            this.tableData[i].last_activity_at =
              this.tableData[i].last_activity_at.split(' ')[0];
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
    },
  },
  async created() {
    await this.getCookie();
    await this.getTableData();
  },
  mounted() {
    this.headtitle = this.$route.query.id+':   '+ this.$route.query.title;
  }
};
</script>

<style lang="less">
.membericon0 {
  width: 20px;
  height: 20px;
  border-radius: 11px;
  z-index: 3;
}
.membericon1 {
  width: 20px;
  height: 20px;
  border-radius: 11px;
  left: 25px;
  z-index: 2;
}
.membericon2 {
  width: 20px;
  height: 20px;
  border-radius: 11px;
  left: 35px;
  z-index: 1;
}
.membericon0,
.membericon1,
.membericon2 {
  position: absolute;
  top: 30%;
}
.menu-item {
  height: 40px;
}
.gitlabmanager {
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
    width: calc(100vw - 80px);
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
.atooltip {
  background: #ffffff !important;
}
.atooltip.el-tooltip__popper[x-placement^="left"] .atooltip {
  background: #ffffff;
}
.atooltip.el-tooltip__popper[x-placement^="left"] .atooltip:after {
  background: #ffffff;
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
.atooltip-div {
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #4b4b4b;
  height: 30px;
  border-radius: 5px;
}
.atooltip-div2 {
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #a3a2a2;
  height: 30px;
  border-radius: 5px;
}
.atooltip-div:hover {
  background: #f3f2f2;
  cursor: pointer;
}
.atooltip-div2:hover {
  cursor: pointer;
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
.el-drawer .el-drawer__header {
  margin: 0;
}

.atooltip {
  padding: 2px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.projectStyle{
height: 60px;
}
// .el-loading-spinner .circular{
//   display: none;
// }
// .el-loading-spinner{
//   text-align: start;
//   background: url(../../assets/logo.png) no-repeat;
//   background-size: 48px 48px;
//   width: 100%;
//   height: 100%;
//   position: relative;
//   top: 45%;
//   left: 50%;
//   animation: show 5s;
// }
// @keyframes show{
//   0%{
//     width: 0%;
//   }
//   100%{
//     width: 100%;
//   }
// }
// .el-loading-text{
//   position: relative;
//   left: -2%;
//   top: 6%;
// }
</style>
