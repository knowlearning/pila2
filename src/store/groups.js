import { v4 as uuid } from 'uuid'

export default {
  scope: 'groups',
  namespaced: true,
  state: () => ({}),
  getters: {
    groups: state => () => state
  },
  mutations: {
    add(state, { name, id }) {
      state[id] = { name }
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    add({commit}, { name, id=uuid()}) {
      commit('add', { name, id })
      return id
    },
    remove({commit}, id) {
      commit('remove', id)
    }
  }
}