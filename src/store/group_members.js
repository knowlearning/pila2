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
          .map(({ user }) => user)
      )
    }
  },
  mutations: {
    add(state, { user, group_id }) {
      state[uuid()] = { user, group_id }
    },
    remove(state, { user, group_id }) {
      Object
        .entries(state)
        .forEach(([id, { user: u, group_id: g }]) => {
          if (user === u && group_id === g) delete state[id]
        })
    }
  },
  actions: {
    add({ commit }, { user, group_id }) {
      commit('add', { user, group_id })
    },
    remove({ commit }, { user, group_id }) {
      commit('remove', { user, group_id })
    }
  }
}
