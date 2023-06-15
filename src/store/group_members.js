import { v4 as uuid } from 'uuid'

export default {
  scope: 'group_members',
  namespaced: true,
  state: () => ({}),
  getters: {
    members: state => groupId => {
      return(
        Object
          .values(state)
          .filter(({ group_id }) => group_id === groupId)
          .map(({ user_id }) => user_id)
      )
    }
  },
  mutations: {
    add(state, { user_id, group_id }) {
      state[uuid()] = { user_id, group_id }
    },
    remove(state, { user_id, group_id }) {
      Object
        .entries(state)
        .forEach(([id, { user_id: u, group_id: g }]) => {
          if (user_id === u && group_id === g) delete state[id]
        })
    }
  },
  actions: {
    add({ commit }, { user_id, group_id }) {
      commit('add', { user_id, group_id })
    },
    remove({ commit }, { user_id, group_id }) {
      commit('remove', { user_id, group_id })
    }
  }
}
