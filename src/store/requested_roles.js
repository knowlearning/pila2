export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    requests: state => () => state
  },
  mutations: {
    add(state, { assignee, role, updated }) {
      state[assignee] = { role, updated }
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