export default {
  scope: 'files',
  namespaced: true,
  state: () => ({}),
  getters: {
    files: state => () => state
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
    add({ commit }, id) {
      commit('add', id)
    },
    remove({ commit }, id) {
      commit('remove', id)
    }
  }
}
