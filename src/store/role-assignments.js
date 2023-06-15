export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    teachers: state => () => {
      const teachers = []
      Object
        .entries(state)
        .forEach(([user, {role}]) => {
          if (role === 'teacher') teachers.push(user)
        })
      return teachers
    }
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
