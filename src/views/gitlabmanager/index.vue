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
            <el-menu-item  v-for="(labchildren, p) in labs[1].children" :key="p" :index="String(p+5)"  class="menu-item">
          <span class="gitlabmanager-left-children-left">{{labchildren.name}}</span>
          <span class="gitlabmanager-left-children-right">{{labchildren.number}}</span>
        </el-menu-item>
        </el-menu>
      </div>
    <div class="gitlabmanager-right">
      <div class="gitlabmanager-right-search">
        <div class="gitlabmanager-right-search-left">Executable Program</div>
        <div class="gitlabmanager-right-search-right"><el-input v-model="input" placeholder="Please input" size="large" style="width:300px" >
        <template #suffix>
          <svg v-show="input==''?false:true" @click="emptyInput" t="1649831312816" class="input-icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2782" width="15" height="15"><path d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z" fill="#bfbfbf" p-id="2783"></path></svg>
          <svg class="input-icon2" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="" width="15" height="15"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
        </template>
      </el-input>
        </div>
      </div>
      <div class="gitlabmanager-right-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="仓库名称" sortable >
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
                <img :src="item" :class="'membericon'+index">
              </div>
            </template>
          </el-table-column>
          <el-table-column >
            <template #default>
              <div>999 +</div>
            </template>
          </el-table-column>
          <el-table-column label="分组名称" >
            <template #default="scope">
              <el-tag style="font-weight: 500; font-size: 12px; line-height: 18px; ">{{scope.row.group_name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  label="分组成员" width="100px">
          <template #default="scope">
              <div v-for="(item,index) in scope.row.project_member" :key="index">
                <img :src="item" :class="'membericon'+index">
              </div>
            </template>
          </el-table-column>
          <el-table-column >
            <template #default>
              <div>999 +</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              
              <el-popover placement="left-start" popper-class="atooltip" ref="popoverRef" trigger="click" effect="light" :enterable="false" class="atooltip" v-model:visible="scope.row.archived" >
                <template #reference>
        <svg-icon style="cursor:pointer;" width="5" height="15" icon-class="point" @click="openPopover(scope.$index,scope.row.archived)"  @blur="onBlur" />
      </template>
              
                <div class="atooltip-div" @click="scope.row.archived = false" >
                  <svg t="1649825398762" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13820" width="14" height="14"><path d="M551.6 276V141.4c12.1-56.3 58.2-22 58.2-22L930 395.9c70.4 48.9 4.8 85.7 4.8 85.7L619.5 755.7c-63.1 46.5-67.9-24.5-67.9-24.5V606.4C231.4 506.1 100.4 907.5 100.4 907.5c-12.1 22-19.4 0-19.4 0C-42.8 305.4 551.6 276 551.6 276z" p-id="13821" fill="#8a8a8a"></path></svg>
                    查看扫码结果
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="" width="14" height="14"><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>
                    复制 Url 到剪切板
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                    <svg t="1649825488695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14345" width="14" height="14"><path d="M824.018851 478.68115c54.894238-54.782697 66.862827-136.315642 39.917128-201.324238l-96.733135 96.55201c-26.318412 26.27748-71.417563 24.243147-97.735975-2.033309-26.305109-26.27748-28.338419-71.250764-2.034333-97.527221l96.747461-96.553033c-65.12116-26.91807-147.057287-15.186887-201.938222 39.59581-54.349839 54.224995-67.210751 134.225027-39.122019 201.045899l-67.237357 67.098187L284.108175 314.082348l11.716856-25.524327-91.480504-60.82839-58.112536 57.986669 60.940954 91.341335 27.655873-13.793144 171.773202 171.480536L207.144292 733.811852c-12.720719 12.707416-12.720719 33.271778 0 45.949518l61.373813 61.275575c12.706393 12.678764 33.326013 12.678764 46.032406 0l199.456704-199.096501 28.200272 28.14399-7.817036 7.829316c-11.632945 11.592013-14.280238 26.305109-3.162016 37.422308l135.214565 134.978181c11.104919 11.090593 31.375591 13.904685 43.00956 2.312672l62.863746-62.751183c11.618619-11.592013 10.839883-33.912367-0.278339-44.974307L636.809075 609.924263c-11.118222-11.090593-27.92091-6.381337-39.554878 5.210675l-5.754051 5.768377-28.212552-28.14399 71.181179-71.056336C698.892039 543.522947 773.012154 529.590634 824.018851 478.68115L824.018851 478.68115 824.018851 478.68115zM308.79646 774.021645c-13.779841 13.765515-36.099173 13.765515-49.877991 0-13.765515-13.737886-13.765515-36.029588 0-49.795103 13.778818-13.736862 36.098149-13.736862 49.877991 0C322.575278 737.992057 322.575278 760.28376 308.79646 774.021645L308.79646 774.021645 308.79646 774.021645zM308.79646 774.021645" p-id="14346" fill="#8a8a8a"></path></svg>
                    申请权限
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                    <svg t="1649829109199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15021" width="14" height="14"><path d="M801.796646 348.507817c-6.599924 7.099918-9.599889 16.799806-8.299904 26.399694 1.499983 10.899874 2.399972 21.799748 2.699969 32.299627 1.399984 51.499404-11.099872 96.098888-37.09957 132.698464-45.099478 63.199269-117.398641 83.499034-170.098032 98.298863-35.799586 9.999884-61.599287 12.599854-82.399047 14.599831-22.799736 2.299973-34.299603 3.399961-50.599414 12.799851-3.199963 1.899978-6.399926 3.899955-9.49989 6.09993-29.499659 21.199755-46.399463 55.699355-46.399463 91.998935v28.599669c0 10.699876 5.499936 20.599762 14.399833 26.599692 30.299649 20.399764 50.199419 55.199361 49.599426 94.598906-0.799991 60.299302-49.999421 109.598732-110.398722 110.398722C291.002557 1024.89999 240.003148 974.400574 240.003148 912.001296c0-38.89955 19.799771-73.199153 49.899422-93.198921 8.799898-5.899932 14.099837-15.899816 14.099837-26.499694V231.60917c0-10.699876-5.499936-20.599762-14.399833-26.599692-30.299649-20.399764-50.199419-55.199361-49.599426-94.598906C240.803138 50.11127 290.002569 0.911839 350.40187 0.01185 413.001146-0.88814 464.000555 49.611276 464.000555 112.010554c0 38.89955-19.799771 73.199153-49.899422 93.198921-8.799898 5.899932-14.099837 15.899816-14.099837 26.499694v346.095994c0 4.099953 4.399949 6.599924 7.999908 4.599947h0.099998c34.299603-19.699772 62.099281-22.399741 88.99897-25.099709 18.799782-1.799979 38.299557-3.799956 65.899238-11.499867 43.299499-12.09986 92.398931-25.8997 117.898635-61.599287 16.999803-23.799725 20.599762-53.399382 19.099779-79.599079-0.699992-12.599854-8.699899-23.499728-20.399763-28.099675-42.099513-16.299811-71.899168-57.299337-71.599172-105.298781 0.399995-61.699286 51.299406-111.698707 112.998692-111.198714 61.399289 0.499994 110.998715 50.499416 110.998716 111.998704 0 29.599657-11.499867 56.499346-30.199651 76.499115z" p-id="15022" fill="#8a8a8a"></path></svg>
                    保护分支设置
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                    <svg t="1649829264730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21539" width="14" height="14"><path d="M836.266667 0H170.666667C114.210133 0 68.266667 45.943467 68.266667 102.4v819.2c0 56.456533 45.943467 102.4 102.4 102.4h665.6c56.456533 0 119.466667-45.943467 119.466666-102.4V102.4c0-56.456533-63.010133-102.4-119.466666-102.4zM324.266667 68.266667h375.466666v119.466666H324.266667V68.266667z m563.2 853.333333a34.133333 34.133333 0 0 1-34.133334 34.133333H170.666667c-18.807467 0-34.133333-15.291733-34.133334-34.133333V102.4c0-18.807467 15.325867-34.133333 34.133334-34.133333h85.333333v119.466666c0 37.649067 30.6176 68.266667 68.266667 68.266667h375.466666c37.649067 0 68.266667-30.6176 68.266667-68.266667V68.266667h85.333333c18.8416 0 34.133333 15.325867 34.133334 34.133333v819.2zM460.032 617.335467l-128.5632-128.3072a34.269867 34.269867 0 0 0-48.384 0 34.065067 34.065067 0 0 0 0 48.264533l152.763733 152.439467c13.3632 13.329067 35.0208 13.329067 48.384 0l290.816-290.133334a34.065067 34.065067 0 0 0 0-48.264533 34.269867 34.269867 0 0 0-48.384 0L460.032 617.335467z" fill="#8a8a8a" p-id="21540"></path></svg>
                    请求技术委员会评审
                  </div>
                  <div class="atooltip-div" @click="scope.row.archived = false">
                    <svg t="1649829220256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20941" width="14" height="14"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27c40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4S687 811.7 646 829c-42.4 17.9-87.4 27-133.9 27s-91.5-9.1-133.9-27c-40.9-17.3-77.7-42.1-109.3-73.8-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47c5.3-4.1 3.5-12.5-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8 0.1-4.5-3.5-8.2-8-8.2z" p-id="20942" fill="#8a8a8a"></path></svg>
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
      visible:"",
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
            "archived":false,
            "group_id":"Ut aliqua dolor velit officia",
            "group_name":"et Duis proident deserunt",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
        },
        {
            "id":"est",
            "pj_name":"elit proident cillum do",
            "creator_id":"aliquip aute eu",
            "creator_name":"ulla",
            "created_at":"voluptate",
            "updated_at":"sint voluptate consequat tempor nisi",
            "last_activity_at":"2021-04-11",
            "description":"enim aliqua",
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
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
            "archived":false,
            "group_id":"Lorem proident ipsum minim",
            "group_name":"commodo officia ad",
            "project_member":['http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico','http://172.17.100.50:8080/static/fe150e16/favicon.ico'],
            "group_member":"tempor aute",
            "sync_time":"exercitation sed do cupidat"
        },
    ],
      input: ''
    };
  },
  methods: {
    onBlur(){
      console.log(11);
      for(let i in this.tableData){
        this.tableData[i].archived=false
      }
    },
    openPopover(val,val2){
      console.log(22);
      for(let i in this.tableData){
        this.tableData[i].archived=false
      }
      this.tableData[val].archived=!val2
    },
    emptyInput(){
      this.input=""
    }
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
