export default {
  scope: 'role_assertions',
  namespaced: true,
  state: () => ({}),
  mutations: {
    grant(state, { user, role }) {
      state[user] = { role }
    }
  },
  actions: {
    grant({ commit }, { user, role }) {
      commit('grant', { user, role })
    }
  }
}
