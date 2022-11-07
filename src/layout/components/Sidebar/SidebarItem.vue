<template>
  <div v-if="!item.hidden">
    <el-tooltip
        class="box-item"
        effect="light"
        :content="item.meta?.title"
        placement="right"
        show-after="1000"
      >
      
      <el-menu-item :index="'/'+basePath" v-show="item.name!=='查看仓库'&&item.name!=='虚拟机'&&item.name!=='统计'">
        <el-badge is-dot :hidden="showBadge(item.meta.id)" >
      <svg-icon :icon-class="item.meta?.icon" />
    </el-badge>
      <span :class="item.meta?.icon">{{item.meta?.name}}</span>
      <!-- <template #title>{{item.meta?.title}}</template> -->
    </el-menu-item>
  
      </el-tooltip>
    
  </div>
</template>

<script>
import { store } from '@/store/store';
import { log } from 'console';

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods:{
    
    showBadge(val){
      if(store.statefather.indexOf(val)!=-1){
        return false
      }else{
        return true
      }
    }
  }
}
</script>
<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 10px;
  height: 10em;
}
.code,.project{
  position:absolute;
  top:24px;
  left:23px;
  font-size: 12px;
}
.table,.link{
  position:absolute;
  top:24px;
  left:11px;
  font-size: 12px;
}
.el-menu-item{
  color: #18263C !important;
  padding-bottom: 15px !important;
  height: 70px !important;
}
.el-menu-item.is-active{
  color: #3E79F6 !important;
}
.el-menu-item:hover{
  background-color: #E1E2E5 !important;
}
</style>
<style >

.is-fixed { 
    transform: translateY(50%) translateX(150%) !important;
}

</style>
