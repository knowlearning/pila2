import { v4 as uuid } from 'uuid'

export default {
  scope: 'groups',
  namespaced: true,
  state: () => ({
    groups: {},
    members: {}
  }),
  getters: {
    groups: state => typeFilter => {
      if (typeFilter) return Object.fromEntries(
        Object
          .entries(state.groups)
          .filter(([_, { type }]) => type === typeFilter )
      )
      else return state
    },
    members: state => groupId => (
      Object
        .values(state.members)
        .filter(({ group_id }) => group_id === groupId)
        .map(({ user_id }) => user_id)
    ),
    belongs: state => (uid, gid) => (
      Object
        .values(state.members)
        .some(({ group_id, user_id }) => group_id === gid && user_id === uid)
    )
  },
  mutations: {
    add(state, { name, type, id }) {
      state.groups[id] = { name, type }
    },
    remove(state, id) {
      delete state.groups[id]
    },
    addMember(state, { user_id, group_id }) {
      state.members[uuid()] = { user_id, group_id }
    },
    removeMember(state, { user_id, group_id }) {
      Object
        .entries(state.members)
        .forEach(([id, { user_id: u, group_id: g }]) => {
          if (user_id === u && group_id === g) delete state.members[id]
        })
    }
  },
  actions: {
    add({commit}, { name, type, id=uuid()}) {
      commit('add', { name, type, id })
      return id
    },
    remove({commit}, id) {
      commit('remove', id)
    },
    addMember({ commit, getters }, { user_id, group_id }) {
      if (getters.belongs(user_id, group_id)) return
      commit('addMember', { user_id, group_id })
    },
    removeMember({ commit }, { user_id, group_id }) {
      commit('removeMember', { user_id, group_id })
    }
  }
}
