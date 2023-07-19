export default {
  scope: 'my-content',
  namespaced: true,
  state: () => ({}),
  getters: {
    myContent: state => () => state
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
