export default {
  scope: 'study_grants',
  namespaced: true,
  state: () => ({}),
  mutations: {
    grant(state, { study, granted }) {
      state[study] = { granted }
    }
  },
  actions: {
    async grant({ commit, dispatch }, { study, granted }) {
      console.log('GRANTING', study, granted)
      commit('grant', { study, granted })
      await dispatch('requestedStudies/load', null, {root:true})
    }
  }
}
