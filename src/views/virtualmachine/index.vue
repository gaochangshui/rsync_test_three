<template>
  <div class="VirtualMachine">
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc6RoJEwfCI9cAUN92NS8gpU_aA3zVDxHGa5Gqgn-pRw0yMiQ/viewform?embedded=true" frameborder="0">正在加载…</iframe>
  </div>
</template>

<script>
export default {
  name: 'VirtualMachine'
};
</script>

<style lang="less">
  .VirtualMachine {
    height: 100%;
    width: 100%;
    & > iframe {
      width:100%;
      height:90vh;
    }
  }
</style>
