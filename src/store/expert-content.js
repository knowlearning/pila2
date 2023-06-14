export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    expertContent: state => () => state
  },
  mutations: {
    add(state, { content, assigner, updated }) {
      state[content] = { assigner, updated }
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    async load({ commit, getters }) {
      const expertContent = await Agent.state('expert-content')

      //  remove keys no longer found in expert content
      Object
        .keys(getters.expertContent())
        .filter(id => !expertContent[id])
        .forEach(id => commit('remove', id))
      expertContent.forEach(ec => commit('add', ec))
    }
  }
}
