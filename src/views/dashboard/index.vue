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
            cell-class-name="mainTable"
          >
            <el-table-column label="项目" sortable :sort-method="sortDevName" >
              <template #default="scope">
                <div style="color: #0b2646">{{ scope.row.agreement_cd }}</div>
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
              </template>
            </el-table-column>
            <el-table-column  label="负责人" width="100px"   >
               <template #default="scope">
                <el-tooltip
                  class="box-item"
                  effect="light"
                  :content="scope.row.manager_id+':'+scope.row.manager_name"
                  placement="top-start"
                  show-after="1000"
                >
                  <span
                    style="
                      color: #8e8e8e;
                      /* width:100%; */
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      -o-text-overflow: ellipsis;
                    "
                  >
                    {{scope.row.manager_name}}
                  </span>
                </el-tooltip>
              </template>
              </el-table-column>
            
             <el-table-column label="成员" width="60px">
              <template #default="scope">
                <div>
                  <span v-show="scope.row.member_ids.length===0" style="margin-left: 10px"
                    >-</span
                  >
                </div>
                <div
                  v-for="(item, index) in scope.row.member_ids"
                  :key="index"
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    :content="item.MemberName"
                    placement="top-start"
                    show-after="1000"
                    
                  >
                    <img
                      :src="item.avatar"
                      :class="'membericon' + index"
                      v-if="index<=2 &&
                       scope.row.member_ids.length !== 0 "  
                    />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column  width="50px">
              <template #default="scope">
                <div v-show="scope.row.member_ids.length != 0 ">
                  {{ scope.row.member_ids.length }}
                </div>
              </template>
            </el-table-column>
            <el-table-column  label="状态" width="110px">
              <template #default="scope">
                <el-tag :color="tagColor(scope.row.statusName)" :class="'tableTag'+scope.row.status" >{{scope.row.statusName}}</el-tag>
              </template>
            </el-table-column>
            
            <el-table-column prop="project_count"  width="110px" label="仓库数" sortable >
              <template #default="scope">
                  <div style="display:flex">
                    <img src="../../assets/icons/fromicon/code.png" style="width:16px;height:16px;margin-right: 5px;margin-top: 4px;" >
                    <span>{{scope.row.project_count}}</span>         
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="plan_mandays" width="110px" label="预订工数"  sortable >
                <template #default="scope">
                  <el-popover
                    placement="top"
                    :width="200"
                    trigger="click"
                    style="height:70px !important;"
                    popper-class="reserveTimePovover"
                    >
                    <p class="expendTime">
                      <img src="../../assets/icons/fromicon/time.png" >
                      已消耗
                      <el-skeleton :loading="exoendloading" animated  >
                    <template #template>
                      <div :class="image_class">
                        <el-skeleton-item
                          variant="image"
                          class="dashboard-left-children-right"
                          style="width:50px;position: absolute;top: 32px;right:15px ;"
                        />
                      </div>
                    </template>
                    <template #default>
                      <span @click="expendTime">{{(Math.round(Number(reserveTimes) * 10) / 10).toFixed(1) }}</span>
                    </template>
                      </el-skeleton>
                    </p>
                    <p class="expendTime">
                      <img src="../../assets/icons/fromicon/reserveTime.png" >
                      预定工数
                      <el-skeleton :loading="exoendloading" animated  >
                    <template #template>
                      <div :class="image_class">
                        <el-skeleton-item
                          variant="image"
                          class="dashboard-left-children-right"
                          style="width:50px;position: absolute;top: 77px;right:15px ;"
                        />
                      </div>
                    </template>
                    <template #default>
                      <span @click="openReserveTable(scope.row)">{{scope.row.plan_mandays.toFixed(1)}}</span>
                    </template>
                      </el-skeleton>
                    </p>  
                    <template #reference>
                      <div class="reserveTime" @click="openReserveTime(scope.row)">
                        <span v-show="scope.row.plan_mandays">
                          <img v-show="scope.row.plan_mandays" src="../../assets/icons/fromicon/time.png" style="" >
                        {{scope.row.plan_mandays.toFixed(1)}}
                        </span>  
                      </div>
                    </template>
                  </el-popover>
                  
                </template>
              </el-table-column>
              <el-table-column prop="plan_mandays" width="110px" label="星标" >
                <template #default="scope">
                  <div>
                    <img src='../../assets/icons/fromicon/star1.png' 
                    style="width:18px;height:18px; margin:10px" 
                    @click="changeStar(scope.row)" 
                    v-show="!scope.row.Star" 
                    class="starClass" />
                    <img src='../../assets/icons/fromicon/star2.png' 
                    style="width:18px;height:18px; margin:10px" 
                    @click="changeStar(scope.row)" 
                    v-show="scope.row.Star"
                    class="starClass" />
                  </div>
                </template>
              </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="75px"
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
                      @click="changeDisabled(scope.row)"
                      class="pointFrom"
                    />
                  </template>
                  <el-tooltip class="item"
                    effect="light"
                    content="未参与的成员无权操作"
                    placement="top"
                    show-after="1000" :disabled="!disabledShow">
                    <div :class="[disabledShow ? 'atooltip-div2' : 'atooltip-div']" 
                    @click.stop="showSelect(scope.row.agreement_cd)">
                    <img
                      src="../../assets/icons/fromicon/Frame-6.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    仓库设定
                  </div>
                  </el-tooltip>
                  <el-tooltip class="item"
                    effect="light"
                    content="未参与的成员无权操作"
                    placement="top"
                    show-after="1000" :disabled="!disabledShow">
                      <div
                      :class="[disabledShow ? 'atooltip-div2' : 'atooltip-div']"
                        @click="showReview(scope.row)" 
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
                        项目评审
                      </div>
                    </el-tooltip>
                  <div
                    class="atooltip-div"
                    @click.stop="showwarehouse(scope.row)"
                  >
                    <img
                      src="../../assets/icons/fromicon/Frame-7.png"
                      style="
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 4px;
                        margin-right: 5px;
                      "
                    />
                    查看仓库
                  </div>
                </el-popover>
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
      <template #default="scope">{{ scope.row.name }}
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
  <el-dialog v-model="dialogTableVisible" :title="projectCd+': '+projectName" width="900px" >
    <div
    style="
      background: #dcdfe6;
      height: 570px;
    "
  >
    <el-table
      class="table"
      :data="dtableData"
      border
      style="width: 100%; margin: 0 auto; height: 100%"
      height="height:100%"
      max-height="570px"
    >
      <el-table-column fixed prop="EmployeeCode" label="社員CD" width="95" />
      <el-table-column fixed prop="EmployeeName" label="名前" width="70">
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
  </el-dialog>
    <el-dialog title="仓库设定"  v-model="dialogVisible" width="1290px">
      <div>
        <el-input
          v-model="input2"
          placeholder="搜索仓库"
          size="large"
          style="width: 616px; margin-bottom: 12px"
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
        <div class="allwarehouse" v-loading="wloding">
          <span class="dialogTittle">全部仓库</span>
          <div class="warehousebox1">
            <div style="overflow-y: auto;overflow-x: hidden;height: 350px;">
              <el-checkbox-group v-model="checked1" @change="checkSelect" style="display: flex ;flex-direction: column;">
              <el-checkbox
              v-for="item in allselect" :key="item"
                :label="item.name"
                @change="check(item)"
                style="margin-left: 16px; margin-top: 10px;"
              >{{item.name}}<br>
              <div style="color:#8e8e8e;
              line-height: 20px;
              font-size: 12px;">
                {{item.description}}
              </div>
            </el-checkbox>
            </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="selectedwarehouse" v-loading="wloding">
          <span class="dialogTittle"
            >已选择
            <div class="emptybtn" @click="empty">清空</div>
          </span>
          <div class="warehousebox2">
            <div style="overflow-y: auto;overflow-x: hidden;height: 350px;">
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
          <el-button @click="dialogVisible = false" >取 消</el-button>
          <el-button :loading="wloding" type="primary"  @click="setWarehouse"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
import { getProjectMandays } from "@/api/qcd";
import { ElLoading , ElMessageBox , ElMessage } from 'element-plus'
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
      disabledShow:false,
      wloding:false,
      exoendloading:false,
      tableHeaders: [],
      dialogTableVisible:false,
      value1:"../../assets/icons/fromicon/star1.png",
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
              value: 'CSS',
              label: 'CSS'
            },
            {
              value: 'JavaScript',
              label: 'JavaScript'
            },
            {
              value: 'TypeScript',
              label: 'TypeScript'
            },
            {
              value: 'Vue',
              label: 'Vue'
            }
          ]
        },
        {
          label: '后端语言',
          options: [
            {
              value: 'Java',
              label: 'Java'
            },
            {
              value: 'C#',
              label: 'C#'
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
              value: 'Ruby',
              label: 'Ruby'
            },
            {
              value: 'PHP',
              label: 'PHP'
            },
            {
              value: 'SMART',
              label: 'SMART'
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
              name: '我参与的',
              number: ''
            },
            {
              name: '星标项目',
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
      dtableData: [],
      input: '',
      input2: '',
      leftType:0,
      topTitle: '所有项目',
      warehouseType: 'Index',
      checkedData:[],
      selectData:[],
      operationFlg: false,
      pjId:'',
      pjName:'',
      reserveTimes:'',
      projectCd:'',
      projectName:''
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
  mounted(){
    
  },
  methods: {
    changeDisabled(val){
      let flag=true
      for(let i=0;i<val.member_ids.length;i++){
        if(val.member_ids[i].MemberID===this.usercd || val.manager_name===this.username){
          flag =false
          return
        }else{
          flag =true
        }
      }
      this.disabledShow=flag
    },
    getProject(){
      getProjectMandays(this.projectCd).then((res) => {
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
          this.dtableData = res.data.map((rs) => {
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
      this.tableHeaders=[]
      this.dtableData = result.map((res) => {
        // console.log(res);
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
    expendTime(){
      this.$router.push('/TakenTime')
    },
    openReserveTable(val){
    this.projectCd=val.agreement_cd
    this.projectName=val.agreement_name
    this.dialogTableVisible=true
    this.getProject()
    },
    openReserveTime(val){
      this.exoendloading=true;
      this.axios.get('/api/taken_hours/ProjectMandays',{
        params:{
          project_cd:val.agreement_cd
        }
      }).then((e)=>{
        this.reserveTimes=e.data.man_day;
        this.exoendloading=false;
      })
    },
    async changeStar(val){
      if(val.Star){
        val.Star=false
        this.labs[0].children[2].number--
      }else{
        val.Star=true
        this.labs[0].children[2].number++
      } 
     await this.axios.post('/actionapi/QcdApi/QCDProjectStarSetting',{ 
          userId:this.usercd,
          agreement_cd:val.agreement_cd,
          flag:val.Star
      })
        if(this.topTitle==='星标项目'){
          await this.getTableData()
      }    
    },
    tagColor(val){
      switch(val){
        case '待报价':
          return '#FFF7E1'
        case '已报价':
          return '#DFF7F7'
        case '进行中':
          return '#E4F2FF'
        case '已完成':
          return '#E5F5EC'
        case '已中止':
          return '#FFEBEE'

      }
    },
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
      if(!this.wloding){
        this.axios
        .post('/actionapi/QcdApi/QCDProjectSetting',{
            id:this.selectid,
            userId:this.usercd,
            count:this.checkedData.length,
            gitlabProject:this.checkedData
        }).then((e)=>{
          if(e.data.Success){
            this.$message.success('设定仓库成功');
          }
          this.getTableData()
        })
      this.dialogVisible = false
      }
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
          id:val.agreement_cd,
          selectVale:this.input
        }
      });
    },
    async showSelect(val) {
      if(!this.disabledShow){
      this.dialogVisible = true; 
        this.wloding=true
     await this.getsubject()
     this.$nextTick(function(){
      this.getsubjected(val)
     })
      this.selectid=val
    }
    },
    async showReview(val){
      if(!this.disabledShow){
        this.reTitle=val.agreement_cd+': '+val.agreement_name
      await this.getReviewinfor(val.agreement_cd)
      this.pjId=val.agreement_cd
      this.pjName=val.agreement_name
      await this.$nextTick(function(){
        if(this.retableData.name!==null){
          this.$refs.multipleTableRef.toggleAllSelection()
        }
     })
      }
      
    },
    async getReviewinfor(val){
      await this.axios
        .get('/actionapi/QcdApi/QCDProjectInfoDetail',{
          params:{
            userId:this.usercd,
            id:val
          }
        }).then((e)=>{
          this.retableData=e.data
          let dataFlg=e.data.name
      if(dataFlg===null){
         ElMessageBox.confirm(
    '请先进行仓库设定',
    '提示',
    {
      confirmButtonText: '设定仓库',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      this.showSelect(val)
    })
    .catch(() => {
    })
      }else{
        this.dialogReview = true;
      }
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
        .get('/actionapi/QcdApi/QCDProjectInfoDetail',{
          params:{
            id:val,
            userId:this.usercd
          }
        }).then((e)=>{
          if(e.data){
            for(let i=0;i<e.data.length;i++){
            let subjectarr={}
            subjectarr.id=Number(e.data[i].id)
            subjectarr.name=e.data[i].name
            subjectarr.description=e.data[i].description
            subjectarr.spacename=e.data[i].spacename
            this.checkedData.push(subjectarr)
            this.selected.push(e.data[i].name)
          }
          }else{
            this.selected=[]
          }
          this.checked1=this.selected
          this.wloding=false
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
      }else if(this.topTitle==='已完成的'){
        this.leftType=2
      }else if(this.topTitle==='我参与的'){
        this.leftType=3
      }else{
        this.leftType=4
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
        res = Number(str1.agreement_cd) - Number(str2.agreement_cd);
        break;
      }
      console.log(res);
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
          this.labs[0].children[3].number=e.data.doingCount
          this.labs[0].children[4].number=e.data.endCount
          this.labs[0].children[1].number=e.data.myCount
          this.labs[0].children[2].number=e.data.starCount
          this.numloading=false
        })
    },
    async getTableData(){
      if(this.$route.query.inputValue&&this.$route.query.flag==='1'){
    this.input=this.$route.query.inputValue
    this.$route.query.flag++
  }
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
          this.tableData=[]
          this.pageTotal=e.data.pageNumAll
          for(let i=0; i<e.data.qcdProject.length;i++){
            this.tableData.push(e.data.qcdProject[i].agreement)         
            this.tableData[i]['member_ids']=JSON.parse(e.data.qcdProject[i].agreement.member_ids);
            this.tableData[i]['Star']=e.data.qcdProject[i].IsStar;
            this.tableData[i]['plan_mandays']=Number(this.tableData[i]['plan_mandays'])
            this.tableData[i]['project_count']=Number(this.tableData[i]['project_count'])
            switch(this.tableData[i]['status']){
              case 1:
                this.tableData[i]['statusName']='待报价'
                break;
              case 2:
                this.tableData[i]['statusName']='已报价'
                break;
              case 3:
                this.tableData[i]['statusName']='进行中'
                break;
              case 4:
                this.tableData[i]['statusName']='已完成'
                break;
              case 5:
                this.tableData[i]['statusName']='已中止'
                break;
            }
            
          }
          this.loadingtable=false
          // console.log(this.tableData);
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
.el-menu-item:hover{
  background-color: #E1E2E5 !important;
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
      line-height: 40px;
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
.mainTable {
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
  width: 616px;
  height: 400px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.selectedwarehouse {
  position: absolute;
  top: 136px;
  left: 650px;
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
width: 480px;
overflow: hidden;
} 
.emptybtn {
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 570px;
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
  top: 38%;
}
.pointFrom:focus {
  outline: none;
}
.pointFrom:hover {
  background-color: #f0eeee;
}
.el-pagination {
  position: relative;
  top: 80%;
}
.atooltip-div2 {
  padding-left: 5px !important;
  padding-right: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #a3a2a2;
  height: 30px;
  cursor: pointer;
}
.atooltip-div:hover {
  background: #f3f2f2;
  cursor: pointer;
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
.atooltip {
  padding: 2px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.tableTag1{
  color:#FFAD0D;
  border: none;
  height: 20px;
}
.tableTag2{
  color:#15C5CE;
  border: none;
  height: 20px;
}
.tableTag3{
  color:#3B82F6;
  border: none;
  height: 20px;
}
.tableTag4{
  color:#47B881;
  border: none;
  height: 20px;
}
.tableTag5{
  color:#F64C4C;
  border: none;
  height: 20px;
}
.el-tag__content{
  font-size: 12px;
}
.starClass:hover{
  width: 20px !important;
  height: 20px !important;
  transition-property:all;
  transition-duration:0.5s;
}
.expendTime{
  background:#FAFAFA;
  font-size:12px;
  padding: 7px 9px;
}
.expendTime img{
  width:14px;
  position: relative;
  top: 3px;
  margin-right: 11px;
}
.expendTime span{
  float: right;
  color: #3E79F6;
  cursor: pointer;
}
.expendTime span:hover{
  color:#039BE5;
}
.reserveTime{
  display:flex;
  cursor: pointer;
}
.reserveTime span{
padding: 3px 8px;
border-radius: 5px;
}
.reserveTime img{
  width:16px;
  height:16px;
  margin-right: 5px;  
  position: relative;
  top: 2px;
}
.reserveTime span:hover{
  background-color: #f0eeee ;
}
.reserveTimePovover .el-popper{
  padding:0 !important;
}

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
