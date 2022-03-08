import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    map: '',
    FavRest: []
  },
  getters: {
    getInitMap (state) {
      return state.map
    },
    getFavRest (state) {
      return state.FavRest
    }
  },
  mutations: {
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
