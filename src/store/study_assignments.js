import { v4 as uuid } from 'uuid'

export default {
  scope: 'study_assignments',
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    isAssigned: (_state, getters) => (group_id, study) => {
      return getters.assignedGroups(study).includes(group_id)
    },
    assignedGroups: state => study => {
      return (
        Object
          .values(state)
          .filter(({ study: s }) => study === s)
          .map(({ group_id }) => group_id)
      )
    }
  },
  mutations: {
    assign(state, { group_id, study }) {
      state[uuid()] = { group_id, study }
    },
    unassign(state, { group_id, study }) {
      Object
        .entries(state)
        .forEach(([id, { group_id: g, study: s }]) => {
          if (group_id === g && study === s) delete state[id]
        })
    }
  },
  actions: {
    assign({commit, getters}, { group_id, study }) {
      if (getters.isAssigned(group_id, study)) return

      commit('assign', { group_id, study })
    },
    unassign({commit}, { group_id, study }) {
      commit('unassign', { group_id, study })
    }
  }
}