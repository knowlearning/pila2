
const rolePermissions = {
  admin:      { admin: true,  researcher: true,  teacher: true,  student: true },
  researcher: { admin: false, researcher: true,  teacher: true,  student: true },
  teacher:    { admin: false, researcher: false, teacher: true,  student: true },
  student:    { admin: false, researcher: false, teacher: false, student: true },
}

export default {
  scope: null,
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
  mutations: {
    set(state, { role }) {
      state.role = role
    }
  },
  actions: {
    async load({ commit }) {
      const [myRole] = await Agent.state('my-role')
      commit('set', myRole || { role: 'student' })
    }
  }
}
