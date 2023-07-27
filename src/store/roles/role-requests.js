const ROLE_REQUEST_TYPE = 'application/json;type=role_request'

setTimeout(() => {
  Agent
    .metadata('requested-role')
    .then(md => {
      if (md.active_type !== ROLE_REQUEST_TYPE) {
        md.active_type = ROLE_REQUEST_TYPE
      }
    })
})

export default {
  scope: 'requested-role',
  namespaced: true,
  state: () => ({
    role: null
  }),
  getters: {
    myRequestedRole: state => () => state.role
  },
  mutations: {
    request(state, role) {
      state.role = role
    }
  },
  actions: {
    async request({ commit }, role) {
      commit('request', role)
    }
  }
}
