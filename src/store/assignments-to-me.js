export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => assignment_type => (
      Object
        .fromEntries(
          Object
            .entries(state)
            .filter(([_, d]) => d.assignment_type === assignment_type)
        )
    ),
    assignment: state => id => state[id]
  },
  mutations: {
    add(state, { assignment_id, assigner_id, authority, assignment_type }) {
      //  TODO: probably should throw error if we try and add a duplicate
      state[assignment_id] = { assigner_id, authority, assignment_type }
    }
  },
  actions: {
    async load({ commit }) {
      const assignments = await Agent.state('assignments-to-me')
      assignments.forEach(a => commit('add', a))
    }
  }
}
