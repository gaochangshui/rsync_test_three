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
        <el-menu-item title="项目">
          <svg-icon icon-class="home" />
          <template #title>项目功能稍后上线</template>
        </el-menu-item>
        <el-menu-item title="虚拟机">
          <svg-icon icon-class="xuniji" @click.stop="goUrl('https://forms.gle/RZB17dBePZ4GQ37t7', 1)" />
          <template #title>虚拟机</template>
        </el-menu-item>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        <el-menu-item title="资源包管理">
          <svg-icon icon-class="package" @click.stop="goUrl('https://code.trechina.cn/package', 2)" />
          <template #title>资源包管理</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem },
  methods: {
    goUrl(url, type) {
      type === 1 ? window.open(url, "_blank","scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes") : window.open(url, "_blank");
    }
  },
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
