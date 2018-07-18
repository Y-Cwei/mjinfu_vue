<template>
  <div class="login_con">
    <mt-header title="登录/注册" class="scale-1px">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">登录</mt-tab-item>
      <mt-tab-item id="2">注册</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-field placeholder="请输入手机号" type="number" v-model="login_username" class="scale-1px"></mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model="login_password" class="scale-1px"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-field placeholder="请输入用户名" v-model="reg_username"></mt-field>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="login_btn">
      <mt-button type="default" @click="login">登录</mt-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Header, Button, Navbar, TabItem, TabContainer, TabContainerItem, Field } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Field.name, Field)

export default {
  data () {
    return {
      selected: '1',
      'login_username': '',
      'login_password': '',
      'reg_username': ''
    }
  },
  methods: {
    login () {
      this.$http.get('/api/login')
        .then(response => {
          if (response.body.status === '1') {
            const username = response.body.data.login_username
            const password = response.body.data.login_password
            if (username !== this.login_username || password !== this.login_password) {
              Toast('用户名或密码错误')
            } else {
              localStorage.setItem('PHONE_NUMBER', this.login_username)
              this.$router.push('/own')
            }
          } else {
            Toast('网络错误，请您稍后重试...')
          }
        }, () => {
          Toast('网络错误，请您稍后重试...')
        })
    },
    // 手机号验证...
    checkPhone (phoneNumber) {
      var phoneRge = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (phoneNumber && (phoneNumber.slice(0, 1) !== '1')) {
        Toast('手机号格式不正确')
        this.login_username = phoneNumber.slice(0, 1)
        return false
      } else if (phoneNumber.length === 11) {
        if (!phoneRge.test(phoneNumber)) {
          Toast('手机号格式不正确')
        }
        this.login_username = phoneNumber.slice(0, 11)
      } else if (phoneNumber.length > 11) {
        this.login_username = phoneNumber.slice(0, 11)
      }
    }
  },
  watch: {
    'login_username': function (val) {
      this.checkPhone(val)
    }
  }
}
</script>
<style lang="less">
  .login_con{
    background-color: #fff;
    padding-bottom: 0.6rem;
  }
  .mint-header{
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: #fff;
    .mint-tab-container {
      padding: 0;
      background-color: #fff;
    }
    .mintui-back:before{
      color: #3e3e3e;
      font-size: .34rem;
    }
    .mint-header-title{
      font-size: .34rem;
      color: #3e3e3e;
      text-align: center;
    }
  }
  .mint-navbar{
    height: 0.9rem;
    .mint-tab-item{
      color: #3e3e3e;
      border-bottom: 2px solid #fff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0;
      height: 0.9rem;
      .mint-tab-item-label{
        font-size: 0.3rem;
        height: 0.9rem;
        line-height: 0.9rem;
      }
      &.is-selected{
        color: #d2a36b;
        border-bottom: 2px solid #d2a36b;
      }
    }
  }
  .mint-tab-container{
    .mint-field{
      &:first-child{
        .mint-cell-title{
          background: url(/static/img/login/login_y_mobile.png) center center no-repeat;
          background-size: .3rem .4rem;
        }
      }
      &:last-child{
        .mint-cell-title{
          background: url(/static/img/login/login_y_clock.png) center center no-repeat;
          background-size: .33rem .4rem;
        }
      }
      .mint-cell-title{
        display: block;
        width: 0.4rem;
        height: 1rem;
        margin-right: 0.2rem;
      }
      ::-webkit-input-placeholder{
        font-size: .28rem;
        color:#a5a5a5;
        text-align:left;
      }
    }
  }
  .login_btn{
    width: 90%;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.56rem auto 0;
    .mint-button--normal{
      width: 100%;
    }
  }
</style>
