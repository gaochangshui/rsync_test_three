<template>
  <div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#F2F3F5"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="true"
        mode="vertical"
        router="true"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes[1].children;
    },
    activeMenu() {
      const route = this.$route;
      console.log('route', route, this.$router.options);
      const { meta, path } = route;
      console.log('meta', meta, path);
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      if(route.name==='查看仓库'){
        return '/dashboard';
      }
      return path;
    },
    isCollapse() {
      return true;
    }
  }
}
</script>
