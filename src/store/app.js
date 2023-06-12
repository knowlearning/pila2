export default {
  namespaced: true,
  scope: 'app',
  state: () => ({
    loaded: false,
    user: null,
    provider: null,
    language: null
  }),
  getters: {
    isLoaded: state => () => state.loaded,
    isAnonymous: state => () => state.provider === 'anonymous',
    user: state => () => state.user
  },
  mutations: {
    load(state, { user, provider }) {
      state.user = user
      state.provider = provider
    }
  },
  actions: {
    async load({ commit, state }) {
      if (!state.loaded) {
        const { auth } = await Agent.environment()
        commit('load', auth)
      }
    }
  }
}
