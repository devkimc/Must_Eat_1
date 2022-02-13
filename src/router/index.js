import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/auth/Login'
import RegistRest from '@/views/management/RegistRest'
import IndexMap from '@/views/map/IndexMap'

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
      path: '/management/registrest',
      name: 'RegistRest',
      component: RegistRest
    },
    {
      path: '/map/indexmap',
      name: 'RegistRest',
      component: IndexMap
    }
  ]
})
