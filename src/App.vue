<template>
  <div>
    <router-view/>
  </div>
</template>
<script></script>
<style lang="less">
  /*默认样式*/
  .mint-button--normal{ /*按钮*/
    display: block;
    height: 100%;
    background-color: #d2a36b;
    color: #fff;
    border-radius: 0.08rem;
    font-size: .30rem;
    text-align: center;
    &:after{
      background-color: #b38b5b;
    }
  }
</style>
