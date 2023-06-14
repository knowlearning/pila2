export default {
  scope: 'my_content',
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
    },
    toggleExpert(state, id) {
      state[id].expert = { expert: !state[id].expert }
    }
  },
  actions: {
    async toggleExpert({ commit, dispatch }, id) {
      commit('toggleExpert', id)
      // TODO: dispatch load for expert content
      // await dispatch('roleAssignments/load', null, {root:true})
    },
    add({ commit }, id) {
      commit('add', id)
    },
    remove({ commit }, id) {
      commit('remove', id)
    }
  }
}
