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
      console.log('content id', content_id, 'user id', user_id)
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
    async tag({ commit, dispatch }, { tag_type, content_id }) {
      //  TODO: if tag already exists, return

      Agent.create({
        active_type: 'application/json;type=tag',
        active: { tag_type, content_id }
      })

      await dispatch('load')
    },
    async untag() {
      await dispatch('load')
    }
  }
}