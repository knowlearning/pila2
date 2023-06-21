export default {
  scope: 'assignable_items',
  namespaced: true,
  state: () => ({}),
  getters: {
    items: state => item_type => (
      Object
        .fromEntries(
          Object
            .entries(state)
            .filter(([_, d]) => d.item_type === item_type)
        )
    )
  },
  mutations: {
    add(state, { item_type, id }) {
      state[id] = { item_type }
    },
    remove(state, id) {
      delete state[id]
    }
  },
  actions: {
    async add({ commit }, { item_type, id }) {
      commit('add', { item_type, id })
    },
    remove({ commit }, id) {
      commit('remove', id)
    }
  }
}