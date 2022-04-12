<template>
  <div class="gitlabmanager">
    <div class="gitlabmanager-left">
      <div v-for="(lab, i) in labs" :key="i">
        <div style="text-align: left">
           <svg-icon width="20" height="20" icon-class="four" />
           <span class="gitlabmanager-left-headlab">{{lab.name}}</span>
        </div>
        <div v-for="(labchildren, p) in lab.children" :key="p">
          <div class="gitlabmanager-left-children">
            <div class="gitlabmanager-left-children-left">{{labchildren.name}}</div>
            <div class="gitlabmanager-left-children-right">{{labchildren.number}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gitlabmanager-right">
      <div class="gitlabmanager-right-search">
        <div class="gitlabmanager-right-search-left">Executable Program</div>
        <div class="gitlabmanager-right-search-right"><el-input v-model="input" placeholder="context" /></div>
      </div>
      <div class="gitlabmanager-right-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="仓库名称" >
            <template #default="scope">
              <div style="color: #0B2646;">{{scope.row.pj_name}}</div>
              <div style="color: #8E8E8E;">{{scope.row.description}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="last_activity_at" label="最近更新"/>
          <el-table-column label="仓库成员">
            <template #default="scope">
              <div style="color: #0B2646;">{{scope.row.pj_name}}</div>
            </template>
          </el-table-column>
          <el-table-column>
            <template #default>
              <div>999 +</div>
            </template>
          </el-table-column>
          <el-table-column label="分组名称">
            <template #default="scope">
              <div style="font-weight: 500; font-size: 12px; line-height: 18px; color: #3B82F6;">{{scope.row.group_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="group_member" label="分组成员"/>
          <el-table-column>
            <template #default>
              <div>999 +</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default>
              <el-tooltip placement="left-start" popper-class="atooltip">
                <template #content>
                  <div class="atooltip-div">
                    查看扫码结果
                  </div>
                  <div class="atooltip-div">
                    复制 Url 到剪切板
                  </div>
                  <div class="atooltip-div">
                    申请权限
                  </div>
                  <div class="atooltip-div">
                    保护分支设置
                  </div>
                  <div class="atooltip-div">
                    请求技术委员会评审
                  </div>
                  <div class="atooltip-div">
                    仓库同步设置
                  </div>
                </template>
                <svg-icon style="cursor:pointer;" width="5" height="15" icon-class="point" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gitlabmanager-right-page">
        <el-pagination
          page-size="100"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GitlabManager',
  data() {
    return {
      name: 'gitlabmanager',
      labs: [
        {
          name: '代码仓库',
          children: [{
            name: '所有',
            number: 140
          }, {
            name: '所有1',
            number: 140
          }, {
            name: '所有2',
            number: 140
          }, {
            name: '所有3',
            number: 140
          }]
        }, {
          name: '代码仓库',
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
      tableData: [
        {
            "id":"deserunt qui",
            "pj_name":"culpa dolor sint commodo",
            "creator_id":"Duis sit laborum null",
            "creator_name":"sunt est",
            "created_at":"ullamco est cillum mollit nulla",
            "updated_at":"sint occaecat ullamco reprehenderit in",
            "last_activity_at":"2021-04-21",
            "description":"magna in dolor",
            "archived":true,
            "group_id":"Ut aliqua dolor velit officia",
            "group_name":"et Duis proident deserunt",
            "project_member":"ipsum et aliquip eiusmod",
            "group_member":"ut Excepteur",
            "sync_time":null
        },
        {
            "id":"est",
            "pj_name":"elit proident cillum do",
            "creator_id":"aliquip aute eu",
            "creator_name":"ulla",
            "created_at":"voluptate",
            "updated_at":"sint voluptate consequat tempor nisi",
            "last_activity_at":"2021-04-21",
            "description":"enim aliqua",
            "archived":true,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":"reprehenderit null",
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
        }
    ],
      input: ''
    };
  },
  methods: {
    handleClick() {
      console.log('click')
    }
  }
}
</script>

<style lang="less" scoped>
.gitlabmanager {
  display: flex;
  padding: 0 10px;
  height: calc(100vh - 90px);
  &-left {
    width: 240px;
    box-shadow: inset -1px 0px 0px #ECECEC;
    min-height: calc(100vh - 86px);
    & > div {
      padding-top: 20px;
    }
    &-headlab {
      line-height: 25px;
      padding-left: 10px;
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
        color: #18263C;
      }
      &-right {
        color: #909AAA;
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
  .atooltip-div {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #4B4B4B;
  }
</style>
