import { v4 as uuid } from 'uuid'

const STUDY_GRANT_TYPE = 'application/json;type=study_grant'

export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  actions: {
    async grant({ dispatch }, { study, granted }) {
      const id = uuid()
      const state = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = STUDY_GRANT_TYPE
      state.study = study
      state.granted = granted

      await Agent.synced()
      await dispatch('allRequestedStudies/load', null, {root:true})
    }
  }
}
