import { v4 as uuid } from 'uuid'

export default {
  scope: 'studies',
  namespaced: true,
  state: () => ({}),
  getters: {
    studies: state => () => state
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
    async add({commit}, { name, id=uuid()}) {
      const studyConfig = await Agent.mutate(id)
      studyConfig.name = name
      commit('add', { id })
      return id
    },
    remove({commit}, id) {
      commit('remove', id)
    }
  }
}