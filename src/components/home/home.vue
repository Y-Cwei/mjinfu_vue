<template>
  <div>
    <div class="b_img">
      <mt-swipe :auto="2000">
        <mt-swipe-item class="b_img" v-for="banner in bannerImgs" :key="banner.id">
          <img :src="banner.address" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div id="news_con">
      <ul id="news" :class="{anim:animate==true}">
        <li v-for='(item, index) in items' :key="index">
          <router-link :to="`/news/${item.conUrl}`" class="news_link">
            {{item.content}}
          </router-link>
        </li>
      </ul>
    </div>
    <div id="main">
      <div class="ycw_tab_con">
        <router-link v-for="(tab, index) in tabs" :to="tab.tabUrl" :key="index">
          <p>{{tab.tabText}}</p>
        </router-link>
      </div>
    </div>
    <!--新手-->
    <div class="bid_con bid_new">
      <div class="tit">
        <i class="icon_new">新手</i>
        <h3>保理链18052001字号08期</h3>
      </div>
      <ul class="bid_ul">
        <li><p class="rate">10%</p></li>
        <li><p class="date">1<span>个月</span></p></li>
        <li><p class="msg">3.74万元可投</p></li>
      </ul>
      <div class="progress">
        <p>目标年化利率</p>
        <mt-progress :value="60">
          <div slot="end" class="pro_num">60.0%</div>
        </mt-progress>
      </div>
    </div>
    <!--财行优选-->
    <div class="bid_con bid_det">
      <div class="bid_tit">
        <div class="scale-1px">
          <p>财行优选</p>
          <router-link to="/#" class="more_link">更多</router-link>
        </div>
      </div>
      <ul class="bid_ul_con">
        <li class="scale-1px" v-for="(bid, index) in wd_bids" :key="index">
          <div class="tit">
            <h3>{{bid.borrow_name}}</h3>
          </div>
          <ul class="bid_ul">
            <li><p class="rate">{{bid.borrow_interest_rate}}%</p></li>
            <li><p class="date">{{bid.borrow_duration}}<span>个月</span></p></li>
            <li><p class="msg">{{bid.borrow_money}}元可投</p></li>
          </ul>
          <div class="progress">
            <p>目标年化利率</p>
            <mt-progress :value="bid.progress">
              <div slot="end" class="pro_num">{{bid.progress}}%</div>
            </mt-progress>
          </div>
        </li>
      </ul>
    </div>
    <img src="/static/img/home/vip.png" alt="" class="img_vip">
    <!--网贷产品-->
    <div class="bid_con bid_det bid_wd">
      <div class="bid_tit">
        <div class="scale-1px">
          <p>网贷产品</p>
          <router-link to="/#" class="more_link">更多</router-link>
        </div>
      </div>
      <ul class="bid_ul_con">
        <li class="scale-1px" v-for="(bid, index) in ch_bids" :key="index">
          <div class="tit">
            <h3>{{bid.borrow_name}}</h3>
          </div>
          <ul class="bid_ul">
            <li><p class="rate">{{bid.borrow_interest_rate}}%</p></li>
            <li><p class="date">{{bid.borrow_duration}}<span>个月</span></p></li>
            <li><p class="msg">{{bid.borrow_money}}元可投</p></li>
          </ul>
          <div class="progress">
            <p>目标年化利率</p>
            <mt-progress :value="bid.progress">
              <div slot="end" class="pro_num">{{bid.progress}}%</div>
            </mt-progress>
          </div>
        </li>
      </ul>
    </div>
    <jf-footer :select="select"></jf-footer>
  </div>
</template>
<script>
import jfFooter from '../footer/footer.vue'
export default {
  name: 'home',
  data () {
    return {
      bannerImgs: [],
      animate: false,
      items: [
        {content: '测试数据1', conUrl: 'news_01'},
        {content: '测试数据2', conUrl: 'news_02'},
        {content: '测试数据3', conUrl: 'news_03'}
      ],
      tabs: [
        {tabText: '我的福利', tabUrl: '/Event/chnewtask.html'},
        {tabText: 'VIP专区', tabUrl: '/Event/chnewtask.html'},
        {tabText: '安全保障', tabUrl: '/Event/chnewtask.html'},
        {tabText: '账户中心', tabUrl: '/Event/chnewtask.html'},
        {tabText: '关于我们', tabUrl: '/Event/chnewtask.html'},
        {tabText: '在线客服', tabUrl: '/Event/chnewtask.html'},
        {tabText: '下载APP', tabUrl: '/Event/chnewtask.html'},
        {tabText: '帮助中心', tabUrl: '/Event/chnewtask.html'}
      ],
      // 财行标的
      ch_bids: [],
      // 网贷标的
      wd_bids: [],
      select: '首页'
    }
  },
  created () {
    this.$http.get('/api/banner').then(response => { // banner
      this.bannerImgs = response.body.data
    }, response => {
      alert('网络错误')
    })
    setInterval(this.scrollText, 2000) // 无缝滚动
    this.$http.get('/api/bid') // 标的数组
      .then(response => {
        if (response.body.status === '1') {
          const bids = response.body.data.map(val => {
            return {
              'borrow_name': val.borrow_name,
              'borrow_interest_rate': val.borrow_interest_rate,
              'borrow_duration': val.borrow_duration,
              progress: val.progress,
              'borrow_money': val.borrow_money
            }
          })
          this.ch_bids = bids.slice(0, 4)
          this.wd_bids = bids.slice(2, 6)
        } else {
          alert('珍爱RMB，建议还是去别家平台投标吧...')
        }
      }, () => {
        alert('网络错误，请您稍后重试...')
      })
  },
  methods: {
    scrollText () {
      this.animate = !this.animate
      setTimeout(function () {
        this.items.push(this.items[0])
        this.items.shift()
        this.animate = false
      }.bind(this), 500)
    }
  },
  components: {
    jfFooter
  }
}
</script>
<style lang="less">
  .b_img{
    width: 100%;
    height: 4.18rem;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .mint-swipe-indicators{
    bottom: 6px;
    .mint-swipe-indicator{
      opacity: 0.5;
    }
  }
  #news_con{
    height: 0.7rem;
    line-height: 0.7rem;
    overflow: hidden;
    padding-left: .3rem;
    border-bottom: 1px solid #f3f3f3;
    transition: all 0.5s linear;
    background-color: #fff;
    .anim{
      transition: all 0.5s linear;
      margin-top: -0.7rem;
    }
    li{
      line-height: 0.7rem;
      height: 0.7rem;
      .news_link{
        display: block;
        font-size: .22rem;
        color: #9e9e9e;
      }
    }
  }
  #main{
    position: relative;
    .ycw_tab_con{
      width: 100%;
      text-align: center;
      background-color: #fff;
      padding-bottom: 0.3rem;
      border-bottom: 0.2rem solid #f3f3f3;
      font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif, PingFangSC-Light;
      a{
        display: inline-block;
        width: 24%;
        text-align: center;
        height: 1.7rem;
        color: #3e3e3e;
        font-size: 0.24rem;
        position: relative;
        p{
          width: 100%;
          position: absolute;
          bottom: 0.05rem;
          color: #3e3e3e;
        }
      }
      a:nth-child(1){
        background: url(/static/img/tabicon/ico_05.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
      a:nth-child(2){
        background: url(/static/img/tabicon/ico_06.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
      a:nth-child(3){
        background: url(/static/img/tabicon/ico_02.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
      a:nth-child(4){
        background: url(/static/img/tabicon/ico_01.png) center center no-repeat;
        background-size: 0.6rem 0.6rem
      }
      a:nth-child(5){
        background: url(/static/img/tabicon/ico_04.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
      a:nth-child(6){
        background: url(/static/img/tabicon/ico_07.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
      a:nth-child(7){
        background: url(/static/img/tabicon/ico_03.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
      a:nth-child(8){
        background: url(/static/img/tabicon/ico_08.png) center center no-repeat;
        background-size: auto 0.6rem;
      }
    }
  }
  /*新手*/
  .bid_con{
    background-color: #fff;
    padding: 0.3rem;
    .bid_tit{
      div{
        overflow: hidden;
        padding: 0 0.3rem;
        p{
          width: 80%;
          font-size: 0.32rem;
          height: 0.75rem;
          line-height: 0.75rem;
          color: #303030;
          float: left;
        }
        .more_link{
          width: 20%;
          height: 0.75rem;
          line-height: 0.75rem;
          float: right;
          font-size: 0.24rem;
          color: #a6a2a3;
          text-align: right;
        }
      }
    }
    &.bid_new{
      border-bottom: 0.2rem solid #f3f3f3;
      .tit{
        position: relative;
        overflow: hidden;
        &>*{
          float: left;
        }
        .icon_new{
          background-color: #F36564;
          color: #fff;
          font-size: 0.16rem;
          padding: 0 0.12rem;
          -webkit-border-top-left-radius: 0.2rem;
          border-top-left-radius: 0.2rem;
          -webkit-bottom-right-radius: 0.2rem;
          border-bottom-right-radius: 0.2rem;
          height: 0.3rem;
          line-height: 0.3rem;
          position: absolute;
          top: 50%;
          left: 0.1rem;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }
        h3{
          font-family: "微软雅黑";
          font-size: 0.3rem;
          color: #3E3E3E;
          padding-left: 0.9rem;
          height: 0.4rem;
          line-height: 0.38rem;
        }
      }
    }
    .bid_ul{
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      li{
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
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
            line-height: 0.62rem;
          }
          &.date{
            font-size: 0.72rem;
            color: #666566;
            line-height: 0.62rem;
            span{
              font-size: .32rem;
              line-height: 0.3rem;
            }
          }
          &.msg{
            color: #d2a36b;
            font-size: 0.3rem;
            right: 0;
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
      .mt-progress{
        width: 45%;
        float: right;
        .mt-progress-progress{
          background-color: #d2a36b;
        }
        .pro_num{
          margin-left: 0.1rem;
          color: #898989;
          font-size: .24rem;
        }
      }
    }
  }
  /*财行优选*/
  .bid_det{
    padding: 0.1rem 0 0;
    &.bid_wd{padding-bottom: 1.2rem}
    .bid_ul_con{
      &>li{
        padding: 0.3rem 0.4rem;
        .tit{
          h3{
            font-size: 0.3rem;
            color: #3e3e3e;
          }
        }
        .progress{
          .mt-progress{
            width: 66%;
          }
        }
      }
    }
  }
  .img_vip{
    width: 100%;
    height: auto;
  }
</style>
