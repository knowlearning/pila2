export default {
  scope: 'study_requests',
  namespaced: true,
  state: () => ({}),
  getters: {
    requests: state => () => state,
    requested: state => id => !!state[id]
  },
  mutations: {
    add(state, id) {
      state[id] = {}
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    add({commit}, id) {
      commit('add', id)
      
      return id
    },
    remove({commit}, id) {
      commit('remove', id)
    }
  }
}