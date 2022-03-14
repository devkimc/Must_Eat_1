import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { checkToken } from '@/api/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loginFlag: false,
    resMsgCheckToken: '',
    map: '',
    FavRest: []
  },
  getters: {
    getLoginFlag (state) {
      return state.loginFlag
    },
    getResMsgCheckToken (state) {
      return state.resMsgCheckToken
    },
    getInitMap (state) {
      return state.map
    },
    getFavRest (state) {
      return state.FavRest
    }
  },
  mutations: {
    setLoginFlag (state) {
      checkToken().then(res => {
        if (res.data.code === 10000) {
          state.loginFlag = true
        } else {
          state.loginFlag = false
        }
        state.resMsgCheckToken = res.data.msg
      })
    },
    setInitMap (state, data) {
      state.map = data
    },
    setFavRest (state, data) {
      state.FavRest = data
    }
  },
  actions: {}
})

export default store
