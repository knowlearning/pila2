import { v4 as uuid } from 'uuid'

export default {
  scope: 'study_assignments',
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    isAssigned: (_state, getters) => (group, study) => {
      return getters.assignedGroups(study).includes(group)
    },
    assignedGroups: state => study => {
      return (
        Object
          .values(state)
          .filter(({ study: s }) => study === s)
          .map(({ group }) => group)
      )
    }
  },
  mutations: {
    assign(state, { group, study }) {
      state[uuid()] = { group, study }
    },
    unassign(state, { group, study }) {
      Object
        .entries(state)
        .forEach(([id, { group: g, study: s }]) => {
          if (group === g && study === s) delete state[id]
        })
    }
  },
  actions: {
    assign({commit, getters}, { group, study }) {
      if (getters.isAssigned(group, study)) return

      commit('assign', { group, study })
    },
    unassign({commit}, { group, study }) {
      commit('unassign', { group, study })
    }
  }
}