/**
 * Created by Y_Cwei on 2018/7/4.
 */
import Vue from 'vue'
import vueResource from 'vue-resource'
import { Toast, Indicator } from 'mint-ui'
Vue.use(vueResource)

export default function (bidurl, isScroll) {
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
}
