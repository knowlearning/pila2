import { v4 as uuid } from 'uuid'

export default {
  scope: 'assignments',
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    isAssigned: (_state, getters) => (group_id, assignment_id) => {
      return getters.assignedGroups(assignment_id).includes(group_id)
    },
    assignedGroups: state => assignment_id => {
      return (
        Object
          .values(state)
          .filter(({ assignment_id: id }) => assignment_id === id)
          .map(({ group_id }) => group_id)
      )
    }
  },
  mutations: {
    assign(state, { group_id, assignment_id }) {
      state[uuid()] = { group_id, assignment_id }
    },
    unassign(state, { group_id, assignment_id }) {
      Object
        .entries(state)
        .forEach(([id, { group_id: gid, assignment_id: sid }]) => {
          if (group_id === gid && assignment_id === sid) delete state[id]
        })
    }
  },
  actions: {
    assign({commit, getters}, { group_id, assignment_id }) {
      if (getters.isAssigned(group_id, assignment_id)) return

      commit('assign', { group_id, assignment_id })
    },
    unassign({commit}, { group_id, assignment_id }) {
      commit('unassign', { group_id, assignment_id })
    }
  }
}