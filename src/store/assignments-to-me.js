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
    ),
    assignment: state => id => state[id]
  },
  mutations: {
    add(state, { assignment_id, assigner_id, authority, item_type }) {
      state[assignment_id] = { assigner_id, authority, item_type }
    }
  },
  actions: {
    async load({ commit }) {
      const assignments = await Agent.state('assignments-to-me')
      assignments.forEach(a => commit('add', a))
    }
  }
}
