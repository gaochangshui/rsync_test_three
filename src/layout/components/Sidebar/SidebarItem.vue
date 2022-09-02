<template>
  <div v-if="!item.hidden">
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="item.meta?.title"
        placement="right"
        show-after="1000"
      >
      <el-menu-item :index="'/'+basePath" v-show="item.name!=='查看仓库'">
      <svg-icon :icon-class="item.meta?.icon" />
      <!-- <template #title>{{item.meta?.title}}</template> -->
    </el-menu-item>
      </el-tooltip>
    
  </div>
</template>

<script>
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
  }
}
</script>
<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 10px;
  height: 1em;
}
</style>
