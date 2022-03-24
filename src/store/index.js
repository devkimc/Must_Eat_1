import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth } from './module'
import { checkToken } from '@/api/auth'

Vue.use(Vuex)

const dataState = createPersistedState({
  paths: ['auth']
})

const store = new Vuex.Store({
  modules: {auth},
  plugins: [dataState],
  state: {
    resMsgCheckToken: '',
    map: '',
    favRest: []
  },
  getters: {
    getResMsgCheckToken (state) {
      return state.resMsgCheckToken
    },
    getInitMap (state) {
      return state.map
    },
    getFavRest (state) {
      return state.favRest
    }
  },
  mutations: {
    setInitMap (state, data) {
      state.map = data
    },
    setFavRest (state, data) {
      state.favRest = data
    },
    checkToken (state) {
      checkToken().then(res => {
        if (res.data.code === 10000) {
          state.auth.loginFlag = true
        } else {
          state.auth.loginFlag = false
          state.auth.userId = ''
          localStorage.clear()
        }
        state.resMsgCheckToken = res.data.msg
      })
    }
  },
  actions: {}
})

export default store
