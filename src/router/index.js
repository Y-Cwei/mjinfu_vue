import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/home/home'
import news from '../components/news/news.vue'
import own from '../components/own/own.vue'
import caihang from '../components/caihang/caihang.vue'
import infinite from '../components/infinite/infinite.vue'
import login from '../components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: home},
    {path: '/news/:id', name: 'news', component: news},
    {path: '/own', name: 'own', component: own},
    {path: '/caihang', name: 'caihang', component: caihang},
    {path: '/infinite', name: 'infinite', component: infinite},
    {path: '/login', name: 'login', component: login}
  ]
})
