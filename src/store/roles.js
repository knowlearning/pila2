export default {
  namespaced: true,
  state: () => ({}),
  actions: {
    async load() {
      const roles = await Agent.state('roles')
      // TODO: load in roles
    }
  }
}
