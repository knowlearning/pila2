export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    requests: state => () => state
  },
  mutations: {
    add(state, { study, researcher, granted, updated }) {
      state[study] = { researcher, updated, granted }
    }
  },
  actions: {
    async load({ commit }) {
      const studyRequests = await Agent.state('requested-studies')
      studyRequests.forEach(request => commit('add', request))
    }
  }
}