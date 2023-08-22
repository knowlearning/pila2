import { v4 as uuid } from 'uuid'

const ASSIGNMENTS_TYPE = 'application/json;type=assignment'

export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    assignments: state => () => state,
    get: state => id => state[id],
    isAssigned: (_state, getters) => (group_id, item_id, assignment_type) => {
      return getters.assignedGroups(item_id, assignment_type).includes(group_id)
    },
    assignedGroups: state => (item_id, assignment_type) => {
      return (
        Object
          .values(state)
          .filter(a => (
            a.item_id === item_id
            && a.assignment_type === assignment_type
          ))
          .map(({ group_id }) => group_id)
      )
    },
    assignedStudents: (_state, getters, _rootState, rootGetters) => (item_id, assignment_type) => {
      return Array.from(new Set(
        getters
          .assignedGroups(item_id, assignment_type)
          .map(group_id => rootGetters['groups/members'](group_id))
          .flat()
      ))
    },
    to: (state, getters) => (user_id, assignment_type) => {
      return Object.keys(state).filter(id => {
        const { item_id } = state[id]
        return getters.assignedStudents(item_id, assignment_type).includes(user_id)
      })
    }
  },
  mutations: {
    addAssignment(state, { id, group_id, item_id, assignment_type, assigner }) {
      state[id] = {
        group_id,
        item_id,
        assignment_type,
        assigner
      }
    }
  },
  actions: {
    async load({commit}) {
      await (
        Agent
          .state('assignments')
          .then(assignments => {
            console.log('GOT ASSIGNMENTS!', assignments)
            assignments.forEach(assignment => commit('addAssignment', assignment))
          })
      )
    },
    async assign({getters, dispatch}, { group_id, item_id, assignment_type }) {
      if (getters.isAssigned(group_id, item_id, assignment_type)) return

      const id = uuid()
      const state = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = ASSIGNMENTS_TYPE
      state.group_id = group_id
      state.item_id = item_id
      state.assignment_type = assignment_type

      await Agent.synced()
      await dispatch('load')
    },
    unassign({ commit }, { group_id, item_id }) {
      alert('TODO: deside on deletion/archiving approach')
    }
  }
}