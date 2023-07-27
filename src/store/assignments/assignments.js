import { v4 as uuid } from 'uuid'

export default {
  scope: 'assignments',
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    isAssigned: (_state, getters) => (group_id, assignment_id, assignment_type) => {
      return getters.assignedGroups(assignment_id, assignment_type).includes(group_id)
    },
    assignedGroups: state => (assignment_id, assignment_type) => {
      return (
        Object
          .values(state)
          .filter(a => (
            a.assignment_id === assignment_id
            && a.assignment_type === assignment_type
          ))
          .map(({ group_id }) => group_id)
      )
    },
    assignedStudents: (_state, getters, _rootState, rootGetters) => (assignment_id, assignment_type) => {
      return Array.from(new Set(
        getters
          .assignedGroups(assignment_id, assignment_type)
          .map(group_id => rootGetters['groupMembers/members'](group_id))
          .flat()
      ))
    }
  },
  mutations: {
    assign(state, { group_id, assignment_id, assignment_type }) {
      const id =uuid()
      state[id] = {}
      state[id].group_id = group_id
      state[id].assignment_id = assignment_id
      state[id].assignment_type = assignment_type
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
    assign({commit, getters}, { group_id, assignment_id, assignment_type }) {
      if (getters.isAssigned(group_id, assignment_id, assignment_type)) return

      commit('assign', { group_id, assignment_id, assignment_type })
    },
    unassign({commit}, { group_id, assignment_id }) {
      commit('unassign', { group_id, assignment_id })
    }
  }
}