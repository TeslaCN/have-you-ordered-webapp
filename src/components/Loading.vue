<template>
<div class="loading"></div>
</template>

<script>
export default {
  name: 'Loading' // 定义的组件名称 使用时写法：loading
}
</script>

<style scoped>
.loading {
  position: absolute;
  left: 0;
  top: 100px;
  background: url('~@/assets/loading-ball.svg') center center no-repeat #ffffff;
  width: 100vw;
  height: 80vh;
  z-index: 1000;
}
</style>
