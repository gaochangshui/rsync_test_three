<template>
  <div v-if="!item.hidden">
    
    <el-menu-item :title="item.meta?.title" :index="'/'+basePath" v-show="item.name!=='查看仓库'">
      <svg-icon :icon-class="item.meta?.icon" />
      <template #title>{{item.meta?.title}}</template>
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
