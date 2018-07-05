<template>
  <div>
    <div class="own_h">
      <div class="per">
        <p class="grade">会员等级：普通会员</p>
        <p class="phone">159****0363</p>
      </div>
      <p class="asset">总资产(元)</p>
      <p class="sum">0.00</p>
      <ul class="det">
        <li class="left">
          <p class="det_ass">累计收益(元）</p>
          <p class="det_sum">0.00</p>
        </li>
        <li class="right">
          <p class="det_ass">账户余额(元）</p>
          <p class="det_sum">0.00</p>
        </li>
      </ul>
    </div>
    <div class="cell_con">
      <mt-cell title="财行账户" to="//github.com" is-link class="scale-1px"></mt-cell>
      <mt-cell title="网贷账户" to="//github.com" is-link class="scale-1px"></mt-cell>
      <mt-cell title="我的奖励" to="//github.com" is-link class="scale-1px"></mt-cell>
      <mt-cell title="帮助中心" to="//github.com" is-link class="scale-1px"></mt-cell>
      <mt-cell title="在线客服" to="//github.com" is-link class="scale-1px"></mt-cell>
    </div>
    <mt-cell title="退出" class="log_out"></mt-cell>
    <jf-footer :select="select"></jf-footer>
  </div>
</template>
<script>
import jfFooter from '../footer/footer.vue'
export default {
  data () {
    return {
      select: '账户中心'
    }
  },
  components: {
    jfFooter
  }
}
</script>
<style lang="less">
  body{
    background-color: #f3f3f3;
  }
  .own_h{
    width: 100%;
    background: #000;
    background-size: cover;
    padding: 0.3rem 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .per{
      overflow: hidden;
      color: #d0b391;
      font-size: 0.26rem;
      padding: 0 0.3rem;
      .grade{
        float: left;
        padding-left: 0.45rem;
        background: url(/static/img/own/grade.png) left top no-repeat;
        background-size: 0.36rem 0.29rem;
        height: 0.34rem;
        line-height: 0.34rem;
      }
      .phone{
        float: right;
        font-size: 0.24rem;
        height: 0.34rem;
        line-height: 0.34rem;
      }
    }
    .asset{
      padding: 0.6rem 0.3rem 0;
      color: #d0b391;
      font-size: 0.26rem;
    }
    .sum{
      font-size: 0.6rem;
      color: #d0b391;
      padding: 0 0.3rem;
    }
    .det{
      overflow: hidden;
      margin-top: 0.3rem;
      li{
        width: 50%;
        float: left;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-top: 1px solid #505053;
        &.left{
          border-right: 1px solid #505053;
        }
        p{
          padding: 0 0.3rem;
          color: #d0b391;
          &.det_ass{
            font-size: 0.26rem;
            padding-top: 0.3rem;
          }
          &.det_sum{
            font-size: 0.36rem;
            padding-bottom: 0.2rem;
          }
        }
      }
    }
  }
  .cell_con{
    width: 100%;
    margin-top: 0.2rem;
    .mint-cell-wrapper{
      height: 1rem;
      line-height: 1rem;
      padding: 0 0.3rem;
      .mint-cell-text{
        font-size: 0.28rem;
        color: #3e3e3e;
      }
    }
  }
  .log_out{
    margin: 0.3rem 0 1.2rem;
    .mint-cell-text{
      display: block;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      color: #3E3E3E;
    }
  }
</style>
