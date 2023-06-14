export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    requests: state => () => state
  },
  mutations: {
    add(state, { study, researcher, updated }) {
      state[study] = { researcher, updated }
    }
  },
  actions: {
    async load({ commit }) {
      const studyRequests = await Agent.state('requested-studies')
      studyRequests.forEach(request => commit('add', request))
    }
  }
}