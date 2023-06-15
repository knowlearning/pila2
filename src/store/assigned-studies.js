export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state
  },
  mutations: {
    add(state, { study, researcher }) {
      state[study] = { researcher }
    }
  },
  actions: {
    async load({ commit }) {
      const assignments = await Agent.state('assigned-studies')
      assignments.forEach(a => commit('add', a))
    }
  }
}
