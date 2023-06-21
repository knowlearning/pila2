export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => item_type => (
      Object
        .fromEntries(
          Object
            .entries(state)
            .filter(([_, d]) => d.item_type === item_type)
        )
    )
  },
  mutations: {
    add(state, { assignment_id, assigner_id, item_type }) {
      state[assignment_id] = { assigner_id, item_type }
    }
  },
  actions: {
    async load({ commit }) {
      const assignments = await Agent.state('assignments-to-me')
      assignments.forEach(a => commit('add', a))
    }
  }
}
