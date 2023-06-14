export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state
  },
  mutations: {
    add(state, { assignee, role, assigner, updated }) {
      state[assignee] = { role, assigner, updated }
    }
  },
  actions: {
    async load({ commit }) {
      // TODO: remove || [] hack...
      const roleAssignments = await Agent.state('role-assignments') || []
      roleAssignments
        .forEach(assignment => commit('add', assignment))
    }
  }
}
