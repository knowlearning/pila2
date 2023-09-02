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
      Agent.create({
        active_type: STUDY_GRANT_TYPE,
        active: { study, granted }
      })
      await Agent.synced()
      await dispatch('studyRequests/load', null, {root:true})
    }

  }
}