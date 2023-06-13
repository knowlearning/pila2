
const rolePermissions = {
  admin:      { admin: true,  researcher: true,  teacher: true,  student: true },
  researcher: { admin: false, researcher: true,  teacher: true,  student: true },
  teacher:    { admin: false, researcher: false, teacher: true,  student: true },
  student:    { admin: false, researcher: false, teacher: false, student: true },
}

export default {
  namespaced: true,
  state: () => ({}),
  getters: {
    myRole: state => () => {
      return state.role
    },
    hasPermission: state => permission => {
      const myRole = state.role
      if (!rolePermissions[myRole]) return false
      else return !!rolePermissions[myRole][permission]
    }
  },
  actions: {
    async load() {
      const roles = await Agent.state('my-roles')
      // TODO: load in roles
    }
  }
}
