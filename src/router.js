import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Dashboard')
    },
    {
      path: '/ordering',
      component: () => import('@/views/Ordering')
    },
    {
      path: '/ordered',
      component: () => import('@/views/Ordered')
    },
  ]
})
