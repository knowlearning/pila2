export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    withTag: state => type => (
      Object
        .values(state)
        .filter(({ tag_type, archived }) => tag_type === type && !archived )
        .map(({ content_id }) => content_id)
    )
  },
  mutations: {
    add(state, { id, content_id, tag_type, user_id, updated, archived }) {
      state[id] = { content_id, tag_type, user_id, updated, archived }
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    async load({ commit }) {
      const tags = await Agent.state('tags')
      tags.forEach(tag => commit('add', tag))
    },
    async tag({ commit, dispatch }, { tag_type, content_id, archived=false }) {
      //  TODO: if tag already exists, return

      Agent.create({
        active_type: 'application/json;type=tag',
        active: { tag_type, content_id, archived }
      })

      await dispatch('load')
    },
    async untag({ state, dispatch }, { content_id, tag_type }) {
      let existing = null
      const entries = Object.entries(state)
      const { auth: { user } } = await Agent.environment()

      for (let i=0; i<entries.length; i++) {
        const [id, entry] = entries[i]
        if ( entry.content_id === content_id
          && entry.tag_type === tag_type
          && entry.user_id === user
        ) {
          existing = id
          break
        }
      }

      if (existing) {
        const state = await Agent.state(existing)
        state.archived = true
        await dispatch('load')
      }
      else await dispatch('tag', {content_id, tag_type, archived: true })
    }
  }
}