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
          .filter(({ group }) => group === groupId)
          .map(({ user }) => user)
      )
    }
  },
  mutations: {
    add(state, { user, group }) {
      state[uuid()] = { user, group }
    },
    remove(state, { user, group }) {
      Object
        .entries(state)
        .forEach(([id, { user: u, group: g }]) => {
          if (user === u && group === g) delete state[id]
        })
    }
  },
  actions: {
    add({ commit }, { user, group }) {
      commit('add', { user, group })
    },
    remove({ commit }, { user, group }) {
      commit('remove', { user, group })
    }
  }
}
