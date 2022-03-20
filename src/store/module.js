export const auth = {
  state: {
    loginFlag: false,
    userId: ''
  },
  getters: {
    getLoginFlag (state) {
      return state.loginFlag
    },
    getUserId (state) {
      return state.userId
    }
  },
  mutations: {
    setLoginFlag (state, data) {
      state.loginFlag = data
    },
    setUserId (state, data) {
      state.userId = data
    }
  }
}
