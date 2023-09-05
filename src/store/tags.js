export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    taggedContent: state => type => Object.entries()
  },
  mutations: {
    add(state, { id, content, tag_type, user_id, updated, archived }) {
      state[id] = { tag_type, user_id, updated, archived }
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
    async tag({ commit, dispatch }, { tag_type, content }) {
      //  TODO: if tag already exists, return

      Agent.create({
        active_type: 'application/json;type=tag',
        active: { tag_type, content }
      })

      await dispatch('load')
    },
    async untag() {
      await dispatch('load')
    }
  }
}