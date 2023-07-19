import { v4 as uuid } from 'uuid'

const EXPERT_CONTENT_TAG_TYPE = 'application/json;type=expert_tag'

export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    expertContent: state => () => state,
    isExpert: state => content => !!state[content]
  },
  mutations: {
    add(state, { content, assigner, updated }) {
      state[content] = { assigner, updated }
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    async toggleExpert({ getters, dispatch }, content) {
      const id = uuid()
      const state = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = EXPERT_CONTENT_TAG_TYPE
      state.content = content
      state.expert = !getters.isExpert(content)

      await Agent.synced()
      dispatch('load')
    },
    async load({ commit, getters }) {
      const expertContent = await Agent.state('expert-content')

      //  remove keys no longer found in expert content
      Object
        .keys(getters.expertContent())
        .filter(id => !expertContent[id])
        .forEach(id => commit('remove', id))
      expertContent.forEach(ec => commit('add', ec))
    }
  }
}
