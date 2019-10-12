<template>
  <header class="header">
    <IconButton type="menu" :size="40 * $state.rem" />
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
@import '~common/style/vars';
@h: 40 * @rem;
.header {
  top: 0;
  left: 0;
  width: 100%;
  height: @h;
  position: fixed;
  z-index: @z-index-df;
}
</style>