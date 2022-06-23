<template>
  <div class="package">
    <iframe src="https://code.trechina.cn/package" frameborder="0">正在加载…</iframe>
  </div>
</template>

<script>
export default {
  name: 'Package'
};
</script>

<style lang="less">
  .package {
    height: 100%;
    width: 100%;
    & > iframe {
      width:100%;
      height:90vh;
    }
  }
</style>
