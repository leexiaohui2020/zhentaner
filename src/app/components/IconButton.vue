<template>
  <a href="javascript:;" class="iconbtn" :style="btnStyle">
    <i class="icon" :class="`ion-md-${type}`"></i>
  </a>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 1
    }
  },
  computed: {
    btnStyle() {
      return { width: `${this.size}rem`, height: `${this.size}rem`, fontSize: `${this.size * 0.618}rem` }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/style/vars';
.iconbtn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: @text-color;
  text-decoration: none;
}
</style>
