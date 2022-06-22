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
        <el-menu-item title="项目" index="0">
          <svg-icon icon-class="home" />
          <template #title>项目功能稍后上线</template>
        </el-menu-item>
        <li @click.stop="goUrl('https://code.trechina.cn/package')" class="el-menu-item" role="menuitem" tabindex="-1" title="资源包管理" style="padding-left: 20px;">
          <div class="el-menu-tooltip__trigger el-tooltip__trigger el-tooltip__trigger">
            <svg-icon icon-class="package" />
          </div>
        </li>
        <li @click.stop="goUrl('https://forms.gle/RZB17dBePZ4GQ37t7')" class="el-menu-item" role="menuitem" tabindex="-1" title="虚拟机" style="padding-left: 20px;">
          <div class="el-menu-tooltip__trigger el-tooltip__trigger el-tooltip__trigger">
            <svg-icon icon-class="xuniji" />
          </div>
        </li>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem },
  methods: {
    goUrl(url) {
      console.log(123, 456);
      window.location.href=url; 
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
