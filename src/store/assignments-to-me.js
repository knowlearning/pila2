export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state
  },
  mutations: {
    add(state, { assignment_id, researcher }) {
      state[assignment_id] = { researcher }
    }
  },
  actions: {
    async load({ commit }) {
      const assignments = await Agent.state('assignments-to-me')
      assignments.forEach(a => commit('add', a))
    }
  }
}
