export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    requests: state => () => state
  },
  mutations: {
    add(state, { user, role, updated }) {
      state[user] = { role, updated }
    }
  },
  actions: {
    async load({ commit }) {
      // TODO: remove || [] hack...
      const roleRequests = await Agent.state('requested-roles') || []
      roleRequests
        .forEach(request => commit('add', request))
    }
  }
}