import Vue from 'vue'
import Router from 'vue-router'
import Sentiment from './views/sentiment/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sentiment',
      name: 'index',
      component: Sentiment
    }
  ]
})
