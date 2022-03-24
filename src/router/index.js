import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/auth/Login'
import MapIndex from '@/views/map/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/map/index',
      name: 'MapIndex',
      component: MapIndex
    }
  ]
})
