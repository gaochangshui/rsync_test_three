<template>
  <div v-if="!item.hidden">
    
    <el-menu-item :title="item.meta?.title" :index="basePath">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="item.meta.icon"
        placement="right"
      >
      <svg-icon :icon-class="item.meta?.icon" />
      </el-tooltip>
    </el-menu-item>
    
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
  }
}
</script>
<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
