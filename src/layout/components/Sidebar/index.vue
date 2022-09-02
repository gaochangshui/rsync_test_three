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
        <!-- <el-menu-item title="项目">
          <svg-icon icon-class="home" />
          <template #title>项目功能稍后上线</template>
        </el-menu-item> -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        <div @click.stop="goUrl('https://code.trechina.cn/package')">
          <el-tooltip
        class="box-item"
        effect="dark"
        content="资源包管理"
        placement="right"
        show-after="1000"
      >
      <el-menu-item >
            <svg-icon icon-class="package" />
          </el-menu-item>
      </el-tooltip>
          
        </div>
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
      window.open(url, "_blank");
    }
  },
  computed: {
    routes() {
      // console.log(this.$router.options.routes);
      return this.$router.options.routes[1].children;
    },
    activeMenu() {
      const route = this.$route;
      // console.log('route', route, this.$router.options);
      const { meta, path } = route;
      // console.log('meta', meta, path);
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

<style >
.el-menu-item:hover{
  background-color: #E1E2E5 !important;
}
.el-menu-item.is-active{
  color: #3E79F6 !important;
}
.el-menu-item{
  color: #18263C !important;
}
</style>