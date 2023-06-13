export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {
    
  },
  actions: {
    async load() {
      const roles = await Agent.state('role-assignments')
      // TODO: load in roles
    }
  }
}
