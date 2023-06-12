export default {
  scope: 'role_requests',
  namespaced: true,
  state: () => ({}),
  getters: {
    myRequestedRole: (state, _getters, _rootState, rootGetters) => () => {
      const user = rootGetters['app/user']()
      return state[user] ? state[user].role : null
    }
  },
  mutations: {
    request(state, { user, role }) {
      state[user] = { role }
    }
  },
  actions: {
    async request({ commit, rootGetters }, role) {
      const user = rootGetters['app/user']()
      commit('request', { user, role })
    }
  }
}
