import app from './app.js'
import myContent from './my_content.js'
import expertContent from './expert-content.js'
import teachers from './teachers.js'
import files from './files.js'

import requestedRoles from './roles/requested_roles.js'
import roles from './roles/roles.js'

import groups from './groups/groups.js'
import groupMembers from './groups/group_members.js'

import studyRequests from './studies/study_requests.js'
import allRequestedStudies from './studies/all_requested_studies.js'
import studyGrants from './studies/study_grants.js'

import assignableItems from './assignments/assignable_items.js'
import assignmentsToMe from './assignments/assignments-to-me.js'
import assignments from './assignments/assignments.js'

export default {
  modules: {
    app,
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
    requestedRoles,
    roles
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
        store.dispatch('roles/load').then(() => log('loaded role assignments', Date.now() - start)),
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
