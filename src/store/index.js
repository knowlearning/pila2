import app from './app.js'
import roles from './roles.js'
import roleRequests from './role-requests.js'
import roleAssertions from './role-assertions.js'

export default {
  modules: {
    app,
    roles,
    roleRequests,
    roleAssertions
  },
  state: () => ({
    loaded: false
  }),
  mutations: {
    loaded(state, loaded) { state.loaded = loaded}
  },
  actions: {
    loaded({ commit }, loaded) { commit('loaded', loaded) }
  },
  plugins: [
    async store => {
      store.dispatch('loaded', false)

      await Promise.all([
        store.dispatch('app/load'),
        store.dispatch('roles/load')
      ])

      store.dispatch('loaded', true)
    }
  ]
}
