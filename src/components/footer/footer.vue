<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item v-for="address in addresses" :id="address.name" :key="address.name" @click="select(address.name)">
      <img slot="icon" :src="address.imgSrc">
      {{address.name}}
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  props: {
    select: {
      require: true,
      type: String
    }
  },
  data () {
    return {
      selected: '',
      addresses: [
        {id: 'home', url: '/home', imgSrc: '/static/img/footer/home.png', name: '首页'},
        {id: 'ch', url: 'http://m.xgcaihang.com/Product/index', imgSrc: '/static/img/footer/ch.png', name: '财行优选'},
        {id: 'lcd', url: 'http://m.lichengdai.com/Newinvest/index', imgSrc: '/static/img/footer/lcd.png', name: '网贷产品'},
        {id: 'own', url: '/own', imgSrc: '/static/img/footer/own.png', name: '账户中心'}
      ]
    }
  },
  created () {
    this.selected = this.select
  },
  watch: {
    selected: function (val, oldVal) {
      // 通过 val 的值变更来确定去向
      switch (val) {
        case '首页':
          this.$router.push('/home')
          break
        case '财行优选':
          // window.location.href = 'http://m.xgcaihang.com/Product/index'
          this.$router.push('/caihang')
          break
        case '网贷产品': // 立诚贷地址
          window.location.href = 'http://m.lichengdai.com/Newinvest/index'
          break
        case '账户中心':
          this.$router.push('/own')
          break
      }
    }
  }
}
</script>
<style lang="less">
  .mint-tabbar{
    .mint-tab-item.is-selected{
      color: #d2a36b;
    }
  }
</style>
