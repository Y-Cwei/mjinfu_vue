// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import { Swipe, SwipeItem, Tabbar, TabItem, Progress, Cell, Navbar, TabContainer, TabContainerItem } from 'mint-ui'
import App from './App'
import router from './router'

import './assets/js/adaptive.js'
import './mock/mockServer.js'
import '../static/css/reset.css'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.component(Swipe.name, Swipe)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Progress.name, Progress)
Vue.component(Cell.name, Cell)
Vue.component(Navbar.name, Navbar)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
