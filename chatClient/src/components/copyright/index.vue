<template>
  <div class="copyright-cmp">
    <p class="copyright-item">作者：张益斌</p>
    <p class="copyright-item">专业：2018级网络工程</p>
    <p class="copyright-item">指导老师：张小集</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      endTime: new Date()
    };
  }
};
</script>

<style lang="scss">
.copyright-cmp {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  .copyright-item {
    margin: 0 0 5px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
