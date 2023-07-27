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

      const start = Date.now()
      function log(name, time) {
        console.log(name, time)
      }
      await Promise.all([
        store.dispatch('app/load').then(() => log('loaded app', Date.now() - start)),
        store.dispatch('myRole/load').then(() => log('loaded my role', Date.now() - start)),
        store.dispatch('roleAssignments/load').then(() => log('loaded role assignments', Date.now() - start)),
        store.dispatch('expertContent/load').then(() => log('loaded expert content', Date.now() - start)),
        store.dispatch('requestedRoles/load').then(() => log('loaded requested roles', Date.now() - start)),
        store.dispatch('allRequestedStudies/load').then(() => log('loaded all requested studies', Date.now() - start)),
        store.dispatch('assignmentsToMe/load').then(() => log('loaded assignments to me', Date.now() - start)),
        store.dispatch('teachers/load').then(() => log('loaded teachers', Date.now() - start))
      ])

      store.dispatch('loaded', true)
    }
  ]
}
