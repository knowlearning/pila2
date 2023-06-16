import { v4 as uuid } from 'uuid'

export default {
  scope: 'group_members',
  namespaced: true,
  state: () => ({}),
  getters: {
    members: state => groupId => (
      Object
        .values(state)
        .filter(({ group_id }) => group_id === groupId)
        .map(({ user_id }) => user_id)
    ),
    belongs: state => (uid, gid) => (
      Object
        .values(state)
        .some(({ group_id, user_id }) => group_id === gid && user_id === uid)
    )
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
    add({ commit, getters }, { user_id, group_id }) {
      if (getters.belongs(user_id, group_id)) return

      commit('add', { user_id, group_id })
    },
    remove({ commit }, { user_id, group_id }) {
      commit('remove', { user_id, group_id })
    }
  }
}
