export default {
  scope: 'role_assertions',
  namespaced: true,
  state: () => ({}),
  mutations: {
    grant(state, { user, role }) {
      state[user] = { role }
    }
  },
  actions: {
    async grant({ commit, dispatch }, { user, role }) {
      commit('grant', { user, role })
      await dispatch('roleAssignments/load', null, {root:true})
    }
  }
}