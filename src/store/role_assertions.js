import { v4 as uuid } from 'uuid'

const ROLE_ASSERTION_TYPE = 'application/json;type=role_assertion'

export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  actions: {
    async grant({ dispatch }, { user, role }) {
      const id = uuid()
      const assertion = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = ROLE_ASSERTION_TYPE
      assertion.role = role
      assertion.assignee = user

      await dispatch('roleAssignments/load', null, {root:true})
    }
  }
}
