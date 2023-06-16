export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    usersWithRole: state => role => (
      Object
        .entries(state)
        .filter(([user, {role: r}]) => r === role)
        .map(([user]) => user)
    )
  },
  mutations: {
    add(state, { assignee, role, assigner, updated }) {
      state[assignee] = { role, assigner, updated }
    }
  },
  actions: {
    async load({ commit }) {
      const roleAssignments = await Agent.state('role-assignments')
      roleAssignments
        .forEach(assignment => commit('add', assignment))
    }
  }
}
