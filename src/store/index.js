import app from './app.js'
import roleRequests from './role-requests.js'
import myContent from './my_content.js'
import roleAssertions from './role_assertions.js'
import requestedRoles from './requested_roles.js'
import roleAssignments from './role-assignments.js'
import expertContent from './expert-content.js'
import myRole from './my-role.js'
import groups from './groups.js'
import groupMembers from './group_members.js'
import studies from './studies.js'
import studyRequests from './study_requests.js'
import requestedStudies from './requested_studies.js'
import studyGrants from './study_grants.js'
import assignedStudies from './assigned-studies.js'
import studyAssignments from './study_assignments.js'

export default {
  modules: {
    app,
    myRole,
    studies,
    studyRequests,
    requestedStudies,
    studyGrants,
    assignedStudies,
    studyAssignments,
    groups,
    groupMembers,
    myContent,
    expertContent,
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
        store.dispatch('myRole/load'),
        store.dispatch('roleAssignments/load'),
        store.dispatch('expertContent/load'),
        store.dispatch('requestedRoles/load'),
        store.dispatch('requestedStudies/load'),
        store.dispatch('assignedStudies/load')
      ])

      store.dispatch('loaded', true)
    }
  ]
}
