export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => assignment_type => {
      const filteredEntries = (
        Object
        .entries(state)
        .filter(([_id, a]) => a.assignment_type === assignment_type)
      )
      return Object.fromEntries(filteredEntries)
    },
    assignment: state => id => state[id]
  },
  mutations: {
    add(state, { id, assignment_id, authority, assigner_id, assignment_type, assignable_item_type }) {
      state[id] = {
        assignment_id,
        authority,
        assigner_id,
        assignment_type,
        assignable_item_type
      }
    }
  },
  actions: {
    async load({ commit }) {
      const assignments = await Agent.state('assignments-to-me')
      assignments.forEach(a => commit('add', a))
    }
  }
}
