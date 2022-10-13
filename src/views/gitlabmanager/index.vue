<template>
  <div class="gitlabmanager" @click="onBlur">
    <div class="gitlabmanager-left">
      <div style="text-align: left">
        <svg-icon width="15" height="15" icon-class="four" />
        <span class="gitlabmanager-left-headlab">{{ labs[0].name }}</span>
      </div>
      
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item
          v-for="(labchildren, p) in labs[0].children"
          :key="p"
          :index="String(p)"
          class="menu-item"
          @click="getTitle(labchildren.name)"
        >
          <div class="gitlabmanager-left-children-left">
            {{ labchildren.name }}
          </div>
          <el-skeleton :loading="loading" animated  >
      <template #template>
      <div :class="image_class">
        <el-skeleton-item
          variant="image"
          class="gitlabmanager-left-children-right"
          style="width:60px"
        />
      </div>
    </template>
    <template #default>
      <div class="gitlabmanager-left-children-right">
            {{ labchildren.number }}
          </div>
    </template>
    </el-skeleton>
          
        </el-menu-item>
      </el-menu>
    </div>
    <div class="gitlabmanager-right">
      <div class="gitlabmanager-right-search">
        <div class="gitlabmanager-right-search-left">{{ topTitle }}</div>
        <div
          class="gitlabmanager-right-search-right"
          v-show="topTitle === '所有仓库' || topTitle === '我参与的'"
        >
          <el-input
            v-model="input"
            placeholder="搜索分组、仓库名称和描述"
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
          <el-button type="primary"
           style="font-size:16px;
           height:40px;
           margin-left: 28px;"
           v-show="topTitle === '所有仓库' "
           @click="getOptions">
            <span style="margin-right:5px;font-size:26px">+</span>
            新建仓库
          </el-button>
        </div>
      </div>
      <div class="formDialog" v-loading="formloading">
        <el-dialog
        v-model="formDialogVisible"
        title="新建仓库"
        width="800px"
        top="6vh"
        :before-close="handleClose"
      >
      <el-form :model="form" 
      label-width="120px" 
      label-position="top"
      :rules="formRules"
      hide-required-asterisk="true"
      ref="formRef">
    <el-form-item prop="name">
      <template #label>
        <p>仓库名<span style="margin-left:5px">（字母开头并只支持小写字母、数字和"-"、且不能以"-"结尾）
        <el-dropdown>
          <div>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="" width="15" style="position:relative;top: 4px;">
            <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z">
            </path></svg>
          </div>
          <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item><a href="http://docs.trechina.cn/docs/code_management/naming_conventions" target="_blank">命名规则</a></el-dropdown-item>
      </el-dropdown-menu>
    </template>
        </el-dropdown>
        </span>
          </p>
      </template>
      <el-input v-model.trim="form.name" />
    </el-form-item>
    <el-row>
      <el-col :span="10">
      <el-form-item prop="location">
        <template #label>
          <p style="margin: 0px;">创建的位置</p>
        </template>
      <el-select v-model="form.location" placeholder="请选择创建位置" style="width:95%" @change="changeLocation(form.location)">
        <el-option :label="item.nameView+'('+ item.name+')'" :value="item.id" v-for="item in location" :key="item.id" />
      </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="14">
      <el-form-item prop="group">
        <template #label>
        <p style="margin:0px">群组<span style="margin-left:5px">（新建群组请联系营业事务）</span></p>
      </template>
        <el-cascader :options="options" 
        :props="props1" 
        clearable 
        filterable
        v-model="form.group" 
        placeholder=" "
        :filter-method="(node,keyword)=>groupFilter(node,keyword)"
        style="width:100%"/>
    </el-form-item>
    </el-col>
    </el-row> 
    <el-form-item prop="description">
      <template #label>
          <p style="margin: 0px;">仓库描述</p>
        </template>
      <el-input v-model="form.description" 
      type="textarea" 
      placeholder="请输入清晰描述以便区别" 
      rows='4'/>
    </el-form-item>  
    <el-form-item prop="associated">
      <template #label>
          <p style="margin: 0px;">关联项目</p>
        </template>
      <el-select v-model="form.associated"
        style="width: 100%;"
         filterable 
         placeholder="请选择关联项目"
         @click="projectquery('')"
         :filter-method="(value)=>projectquery(value)">
    <el-option
    class="projectStyle"
      v-for="item in projectOptions"
      :key="item.ProjectCode"
      :label="item.ProjectCode"
      :value="[item.ProjectCode+' '+item.ProjectName]"
    >
    <div style="line-height: 15px;color: black;font-weight:normal;">{{item.ProjectCode}}</div>
    <span style="color: black;font-weight:normal;">{{item.ProjectName}}</span>
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item prop="breach">
      <template #label>
          <p style="margin: 0px;">分支策略</p>
        </template>
      <el-select v-model="form.breach" style="width:100%">
        <el-option 
        :label="item.label" 
        :value="item.value" 
        v-for="item in breachDemo" 
        :key="item.value" />
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
      <el-form-item prop="language">
        <template #label>
          <p style="margin: 0px;">主要编程语言</p>
        </template>
      <el-select v-model="form.language" placeholder="请选择编程语言" multiple style="width:95%" size="default">
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
    </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="gitignore">
        <template #label>
          <p style="margin: 0px;">添加 .gitignore</p>
        </template>
        <el-select v-model="form.gitignore" style="width:95%">
        <el-option :label="item" :value="item" v-for="item in gitignoreOpution" :key="item" />
      </el-select>
    </el-form-item>
    </el-col>
    </el-row> 
    <el-form-item prop="Readme">
      <template #label>
          <p style="margin: 0px;">Readme文件选择</p>
        </template>
        <el-select v-model="form.Readme" style="width:47.5%">
        <el-option label="Readme文件（中文）" value="CH" />
        <el-option label="Readme文件（日文）" value="JP" />
        <el-option label="Readme文件（英文）" value="EN" />
      </el-select>
    </el-form-item>
    <el-form-item prop="time">
      <template #label>
          <p style="margin: 0px;">维护者有效期</p>
        </template>
      <el-date-picker
          :disabled-date="disabledDate"
          v-model="form.time"
          type="date"
          placeholder="结束时间"
          style="width: 47.5%"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
    </el-form-item>
    </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="formDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="newWarehouse()"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
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
import { ElLoading ,ElMessage,ElMessageBox } from 'element-plus'
import axios from '@/http'
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
      formDialogVisible:false,
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
      projectOptions:[],
      location:[],
      gitignoreOpution:[],
      formloading:false,
      form:{
        name: '',
        location: '',
        group:'',
        description: '',
        associated: ' ',
        breach:'1',
        language: [],
        gitignore:'',
        Readme:'CH',
        time: ''
      },
      props1:{
        checkStrictly: true,
      },
      options:[],
      optionsCopy:[],
      formRules:{
        name:[{required:true,message: '请输入仓库名', trigger: 'blur'},
        {max:255,message:'请输入长度小于255的仓库名',trigger: 'blur'},
        {pattern: /^(?![-|0-9])[a-z0-9|-]+(?<!-)$/ , message: '请输入正确仓库名', trigger: 'blur'}],
        location:[{required:true,message: '请选择创建的位置', trigger: 'blur'}],
        group:[{required:true,message: '请选择群组', trigger: 'change'}],
        description: [{required:true,message: '请输入仓库描述', trigger: 'blur'},
        {max:2000,message:'请输入长度小于2000的仓库描述',trigger: 'blur'}],
        associated: [{required:true,message: '请选择关联项目', trigger: 'blur'}],
        breach:[{required:true,message: '请选择分支策略', trigger: 'change'}],
        language: [{type: 'array',required:true,message: '请选择主要编程语言', trigger: 'blur'}],
        gitignore:[{required:true,message: '请选择添加.gitignore', trigger: 'change'}],
        Readme:[{required:true,message: '请选择Readme文件', trigger: 'change'}],
        time: [{required:true,message: '请选择维护者有效期', trigger: 'blur'}]
      },
      breachDemo:[
        {
          label:'单分支模型(只创建main分支)',
          value:'1'
        },
        {
          label:'生产/开发模型(支持main/develop类型分支)',
          value:'2'
        },
        {
          label:'特性/发布模型(支持main/develop/feature类型分支)',
          value:'3'
        },
        {
          label:'开发/发布/分离模型(支持main/develop/feature/release类型分支)',
          value:'4'
        },
        {
          label:'开发/发布/缺陷分离模型(支持main/develop/feature/release/hotfix类型分支)',
          value:'5'
        }
      ],
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
      labs: [
        {
          name: '代码仓库',
          children: [
            {
              name: '所有仓库',
              number: ''
            },
            {
              name: '我参与的',
              number: ''
            },
            {
              name: '星标仓库',
              number: ''
            },
            {
              name: '模板仓库',
              number: ''
            }
          ]
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
    formDialogVisible(){
      this.form.name=''
      this.form.location=''
      this.form.group=''
      this.form.description=''
      this.form.associated=''
      this.form.language=[]
      this.form.time=''
      this.form.breach='1'
      this.form.gitignore=this.gitignoreOpution[0]
      this.form.Readme='CH'
      this.options=[]
    },
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
      //表格更新防抖
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
    groupFilter(val,key){
      return val.text.indexOf(key.trim())!==-1
    },
    changeLocation(val){
      this.form.group=''
      this.options=this.optionsCopy.filter(item=>{
        return Number(item.value)===val
      })[0].children;
      if(val===17){
        this.form.Readme='JP'
      }else{
        this.form.Readme='CH'
      }
    },
    projectquery(val){
      if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer= setTimeout(()=>{
          axios
        .get('/qcdapi/projects', {
          params: {
            filter:val.trim()
          },
        })
        .then((e) => {
          this.projectOptions=e.data
        });
      },500);
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
    getTitle(val) {
      if (val === '所有仓库') {
        this.warehouseType = 'Index';
        this.getTableData();
      } else if (val === '我参与的') {
        this.warehouseType = 'ProjectsIInvolved';
        this.getTableData();
      } else if (val === '星标仓库') {
        this.warehouseType = 'ProjectsIStarred';
        this.getTableData();
      } else if (val === '模板仓库') {
        this.warehouseType = 'ProjectsTemplate';
        this.getTableData();
      }
      this.topTitle = val;
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
          }else{
            this.Syncflg=false;
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
          }else{
            this.Syncflg=false;
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
    newWarehouse(){
      
      this.$refs.formRef.validate((valid)=>{
        if(valid) {
          ElMessageBox.confirm(
    '请详细确认仓库名，群组等信息是否正确。一旦需删除该仓库，请联系PMO进行作业。',
    '操作确认',
    {
      autofocus:true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      this.setNewWareHouse()
    }).catch(() => {

    }) 
    } else {
      return false
    }
      });
    },
    setNewWareHouse(){
        const loading=ElLoading.service({
              lock: true,
              text: '创建仓库中，请稍后。。。',
              background: 'rgba(0, 0, 0, 0.7)',})
        axios.post('/actionapi/projects/SetWareHouse',{
        name:this.form.name,
        location:this.form.group[this.form.group.length-1],
        description:this.form.description,
        qcdId:this.form.associated[0].split(' ')[0],
        branchType:this.form.breach,
        language:this.form.language.join(),
        gitignore:this.form.gitignore,
        readmePrefix:this.form.Readme,
        expiryDate:this.form.time,
        user_id:this.usercd,
      }).then((e)=>{
        loading.close()
        if(e.data.flag){
          this.formDialogVisible=false
          ElMessageBox.confirm(
    '仓库创建成功，是否跳转到新建的仓库页面？',
    '操作确认',
    {
      autofocus:true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'success',
    }
  )
    .then(() => {
      window.open(e.data.web_url)
    }).catch(() => {

    })
        }else{
          ElMessage({
            message: e.data.message,
            type: 'error',
            duration:5000,
          })
        }
      })
    },
    getOptions(){
      axios.
      get('/actionapi/projects/GetLocationGroup').then((e)=>{
        this.location=e.data.location
        this.optionsCopy=JSON.parse(e.data.group)
      })
      axios.
      get('/actionapi/projects/GetIgnoreList').then((e)=>{
        this.gitignoreOpution=e.data
        this.form.gitignore=this.gitignoreOpution[0]
      })
      this.formDialogVisible=true
    },
    async getTableData() {
      this.tableData = [];
      this.loadingtable=true
      await axios
        .get('/actionapi/WarehouseApi/' + this.warehouseType, {
          params: {
            pj_name: this.input.trim(),
            group_name: this.input.trim(),
            pageSize: this.pageSize,
            pageNum: this.curPage,
            user_cd: this.usercd
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
    async getIndexNum() {
      await axios
        .get('/actionapi/WarehouseApi/IndexNum', {
          params: {
            user_cd: this.usercd
          }
        })
        .then((e) => {
          this.labs[0].children[0].number = e.data.num.all;
          this.labs[0].children[1].number = e.data.num.my;
          this.labs[0].children[2].number = e.data.num.starred;
          this.labs[0].children[3].number = e.data.num.temp;
          this.loading = false;
        });
    }
  },
  async created() {
    await this.getCookie();
    await this.getIndexNum();
    await this.getTableData();
  }
};
</script>

<style lang="less">
.el-menu-item:hover{
  background-color: #E1E2E5 !important;
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
.el-textarea__inner{
  padding: 5px 11px;
}
.formDialog .el-dialog__body{
  padding: 0px 20px !important;
}
</style>
<style lang="less" scoped >
.el-dropdown-menu a{
  text-decoration:none;
  color: #4B4B4B;
}
.el-dropdown-menu a:hover{
  color: #3E79F6;
}
/deep/.el-dropdown-menu__item:not(.is-disabled):hover{
  background-color:white;
}
</style>