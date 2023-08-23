import roles from './roles.js'
import groups from './groups.js'

import studyRequests from './study_requests.js'

import assignableItems from './tags/assignable_items.js'
import assignments from './assignments.js'

import expertContent from './tags/expert-content.js'
import files from './tags/files.js'
import myContent from './tags/my_content.js'

export default {
  modules: {
    files,
    assignableItems,
    studyRequests,
    assignments,
    groups,
    myContent,
    expertContent,
    roles
  },
  state: () => ({
    loaded: false,
    user: null,
    provider: null
  }),
  getters: {
    isAnonymous: state => () => state.provider === 'anonymous',
    user: state => () => state.user
  },
  mutations: {
    loaded(state, loaded) { state.loaded = loaded},
    load(state, { user, provider }) {
      state.user = user
      state.provider = provider
    }
  },
  actions: {
    loaded({ commit }, loaded) { commit('loaded', loaded) },
    async load({ commit, state }) {
      if (!state.user) {
        const { auth } = await Agent.environment()
        commit('load', auth)
      }
    }
  },
  plugins: [
    store => window.store = store,
    async store => {
      store.dispatch('loaded', false)

      await Promise.all([
        store.dispatch('load'),
        store.dispatch('roles/load'),
        store.dispatch('groups/load'),
        store.dispatch('expertContent/load'),
        store.dispatch('studyRequests/load'),
        store.dispatch('assignments/load')
      ])

      store.dispatch('loaded', true)
    }
  ]
}
