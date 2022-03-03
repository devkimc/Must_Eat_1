import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    map: ''
  },
  getters: {
    getInitMap (state) {
      return state.map
    }
  },
  mutations: {
    setInitMap (state, data) {
      state.map = data
    }
  },
  actions: {}
})

export default store
