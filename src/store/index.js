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
import assignableItems from './assignable_items.js'
import studyRequests from './study_requests.js'
import allRequestedStudies from './all_requested_studies.js'
import studyGrants from './study_grants.js'
import assignmentsToMe from './assignments-to-me.js'
import assignments from './assignments.js'
import teachers from './teachers.js'
import files from './files.js'

export default {
  modules: {
    app,
    myRole,
    files,
    teachers,
    assignableItems,
    studyRequests,
    allRequestedStudies,
    studyGrants,
    assignmentsToMe,
    assignments,
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
        store.dispatch('allRequestedStudies/load'),
        store.dispatch('assignmentsToMe/load')
      ])

      store.dispatch('loaded', true)
    }
  ]
}
