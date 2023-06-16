import { v4 as uuid } from 'uuid'

export default {
  scope: 'groups',
  namespaced: true,
  state: () => ({}),
  getters: {
    groups: state => () => state
  },
  mutations: {
    add(state, { name, type, id }) {
      state[id] = { name, type }
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    add({commit}, { name, type, id=uuid()}) {
      commit('add', { name, type, id })
      return id
    },
    remove({commit}, id) {
      commit('remove', id)
    }
  }
}