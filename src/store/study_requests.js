import { v4 as uuid } from 'uuid'

const STUDY_GRANT_TYPE = 'application/json;type=study_grant'

export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    requests: state => () => state,
    granted: state => study =>  {
      return state[study] && state[study].granted
    }
  },
  mutations: {
    add(state, { study, researcher, granted, updated }) {
      state[study] = { researcher, updated, granted }
    }
  },
  actions: {
    async load({ commit }) {
      const studyRequests = await Agent.state('study-requests')
      studyRequests.forEach(request => commit('add', request))
    },
    async grant({ dispatch }, { study, granted }) {
      const id = uuid()
      const state = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = STUDY_GRANT_TYPE
      state.study = study
      state.granted = granted

      await Agent.synced()
      await dispatch('studyRequests/load', null, {root:true})
    }

  }
}