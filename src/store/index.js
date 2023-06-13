import app from './app.js'
import roleRequests from './role-requests.js'
import roleAssertions from './role_assertions.js'
import requestedRoles from './requested_roles.js'
import roleAssignments from './role-assignments.js'
import myRole from './my-role.js'

export default {
  modules: {
    app,
    myRole,
    roleRequests,
    roleAssertions,
    requestedRoles,
    roleAssignments
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
        store.dispatch('roleAssignments/load'),
        store.dispatch('requestedRoles/load')
      ])

      store.dispatch('loaded', true)
    }
  ]
}
