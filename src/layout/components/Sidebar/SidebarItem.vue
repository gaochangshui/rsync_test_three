<template>
  <div v-if="!item.hidden">
    <el-menu-item :title="item.meta?.title" :index="basePath">
      <svg-icon :icon-class="item.meta?.icon" />
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
