<template>
  <div>
    <mt-navbar v-model="selectedTab" fixed>
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">债权保理</mt-tab-item>
      <mt-tab-item id="3">融资租赁</mt-tab-item>
      <mt-tab-item id="4">供应链金融</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selectedTab" class="bid_ch" ref="top">
      <mt-tab-container-item :id="selectedTab">
        <ul class="bid_ul_con"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="80">
          <li v-for="(bid, index) in bids" :key="index" class="scale-1px">
            <router-link to="#">
              <div class="tit">
                <h3>{{bid.borrow_name}}</h3>
                <span>剩余金额{{bid.borrow_money}}元</span>
              </div>
              <ul class="bid_ul">
                <li><p class="rate">{{bid.borrow_interest_rate}}<span>%</span></p></li>
                <li>
                  <p class="date">{{bid.borrow_duration}}个月</p>
                  <mt-progress :value="bid.progress">
                    <div slot="end" class="pro_num">{{bid.progress}}%</div>
                  </mt-progress>
                </li>
                <li>
                  <router-link to="#" class="join_link">
                    <span>立即<br />加入</span>
                  </router-link>
                </li>
              </ul>
              <div class="progress">
                <p>目标年化利率</p>
              </div>
            </router-link>
          </li>
        </ul>
        <p class="page-infinite-loading" v-show="loading">
          <mt-spinner type="fading-circle" color="#3e3e3e"></mt-spinner>
          加载中...
        </p>
      </mt-tab-container-item>
    </mt-tab-container>
    <jf-footer :select="selected"></jf-footer>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Indicator, InfiniteScroll, Spinner } from 'mint-ui'
import jfFooter from '../footer/footer.vue'

Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)

export default {
  data () {
    return {
      selected: '财行优选',
      selectedTab: '1',
      bids: [], // 标的数组
      loading: false
    }
  },
  methods: {
    getBids (bidurl, isScroll) {
      if (!isScroll) {
        Indicator.open()
      }
      this.$http.get(`/apich/${bidurl}`)
        .then(response => {
          if (response.body.status === '1') {
            const data = response.body.data.map(val => {
              return {
                'borrow_name': val.borrow_name,
                'borrow_interest_rate': val.borrow_interest_rate,
                'borrow_duration': val.borrow_duration,
                progress: val.progress,
                'borrow_money': val.borrow_money
              }
            })
            this.loading = false
            if (isScroll === 'scroll') {
              this.bids = this.bids.concat(data)
            } else {
              this.bids = data
            }
            Indicator.close()
          } else {
            Indicator.close()
            Toast('网络错误，请您稍后重试...')
          }
        }, () => {
          Indicator.close()
          Toast('网络错误，请您稍后重试...')
        })
    },
    loadMore () {
      this.loading = true
      if (this.selectedTab === '1') {
        this.getBids('all', 'scroll') // 模拟上拉加载
      } else if (this.selectedTab === '2') {
        this.getBids('zqbl', 'scroll') // 模拟上拉加载
      }
    }
  },
  watch: {
    selectedTab (val) {
      window.scroll(0, 0)
      switch (val) {
        case '1':
          this.getBids('all')
          break
        case '2':
          this.getBids('zqbl')
          break
        case '3':
          this.getBids('rzzl')
          break
        case '4':
          this.getBids('gyljr')
          break
      }
    }
  },
  components: {
    jfFooter
  }
}
</script>
<style lang="less">
  .mint-navbar{
    -webkit-box-shadow: 0 0 0.1rem rgba(0,0,0,0.2);
    box-shadow: 0 0 0.1rem rgba(0,0,0,0.2);
    .mint-tab-item{
      padding: 0;
      margin: 0;
      &.is-selected{
        border-bottom: 2px solid #d2a36b;
        color: #d2a36b;
        padding: 0;
        margin: 0;
      }
      .mint-tab-item-label{
        height: 0.75rem;
        line-height: 0.75rem;
        border-bottom: 2px solid transparent;
        font-size: 0.3rem;
      }
    }
  }
  .mint-tab-container{
    padding: 0.8rem 0 1.2rem;
    .mint-tab-container-item{
      position: relative;
      padding-bottom: 1rem;
    }
  }
  .bid_ch{
    .bid_ul_con{
      &>li{
        padding: 0.3rem 0.2rem;
        .tit{
          overflow: hidden;
          h3{
            font-size: 0.3rem;
            color: #3e3e3e;
            float: left;
            height: 0.4rem;
            line-height: 0.4rem;
          }
          span{
            float: right;
            font-size: 0.15rem;
            color: #a6a2a3;
            height: 0.4rem;
            line-height: 0.4rem;
          }
        }
        .bid_ul{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          li{
            -webkit-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            height: 1rem;
            position: relative;
            p{
              line-height: 1;
              position: absolute;
              bottom: 0;
              &.rate{
                font-size: 0.72rem;
                color: #d2a36b;
                line-height: 0.32rem;
                span{
                  font-size: 0.36rem;
                }
              }
              &.date{
                font-size: .32rem;
                line-height: 0.3rem;
                color: #666566;
              }
            }
            .mt-progress{
              width: 3.6rem;
              position: absolute;
              left: 0;
              bottom: -0.6rem;
              .mt-progress-progress {
                background-color: #d2a36b;
              }
              .pro_num {
                margin-left: 0.1rem;
                color: #898989;
                font-size: .24rem;
              }
            }
            .join_link{
              display: block;
              width: 1.2rem;
              height: 1.2rem;
              float: right;
              -webkit-border-radius: 50%;
              border-radius: 50%;
              border: 1px solid #d2a36b;
              padding: 0.06rem;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              margin-top: 0.2rem;
              span{
                display: block;
                width: 100%;
                height: 100%;
                background-color: #d2a36b;
                -webkit-border-radius: 50%;
                border-radius: 50%;
                text-align: center;
                line-height: 1.2;
                font-size: 0.3rem;
                color: #fff;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding-top: 0.14rem;
              }
            }
          }
        }
        .progress{
          overflow: hidden;
          height: 0.5rem;
          line-height: 0.5rem;
          margin-top: 0.1rem;
          p{
            float: left;
            font-size: .26rem;
            color: #898989;
          }
        }
      }
    }
  }
  .page-infinite-loading{
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    .mint-spinner-fading-circle {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .mint-spinner-fading-circle-circle {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute
    }
  }
</style>
