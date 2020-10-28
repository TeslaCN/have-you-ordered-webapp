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
      path: '/ordered/:date',
      component: () => import('@/views/Ordered')
    },
    {
      path: '/ordered',
      component: () => import('@/views/Ordered')
    },
    {
      path: '/orderMost',
      component: () => import('@/views/OrderMost')
    },
    {
      path: '/version',
      component: () => import('@/views/Version')
    }
  ]
})
