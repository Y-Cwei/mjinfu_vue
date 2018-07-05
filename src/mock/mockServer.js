/**
 * Created by Y_Cwei on 2018/6/25.
 */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/api/banner', {
  status: '1', // banner
  data: data.banner
})
Mock.mock('/news/news_01', {
  status: '1', // 消息
  data: data.news[0]
})
Mock.mock('/news/news_02', {
  status: '1', // 消息
  data: data.news[1]
})
Mock.mock('/news/news_03', {
  status: '1', // 消息
  data: data.news[2]
})
Mock.mock('/api/bid', {
  status: '1', // 标的
  data: data.list
})
Mock.mock('/apich/all', {
  status: '1', // 全部
  data: data.chList.all
})
Mock.mock('/apich/zqbl', {
  status: '1', // 债权保理
  data: data.chList.zqbl
})
Mock.mock('/apich/rzzl', {
  status: '1', // 融资租赁
  data: data.chList.rzzl
})
Mock.mock('/apich/gyljr', {
  status: '1', // 供应链金融
  data: data.chList.gyljr
})
