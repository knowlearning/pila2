import { v4 as uuid } from 'uuid'

const ROLE_ASSERTION_TYPE = 'application/json;type=role_assertion'

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
    assignments: state => () => state,
    usersWithRole: state => role => (
      Object
        .entries(state)
        .filter(([_user, {role: r}]) => r === role)
        .map(([user]) => user)
    ),
    role: state => user => state[user] ? state[user].role : 'student',
    hasPermission: (_state, getters) => (user, permission) => {
      const role = getters.role(user)
      if (!rolePermissions[role]) return false
      else return !!rolePermissions[role][permission]
    }
  },
  mutations: {
    add(state, { assignee, role, assigner, updated }) {
      state[assignee] = { role, assigner, updated }
    }
  },
  actions: {
    async load({ commit }) {
      await Agent.synced()
      const roleAssignments = await Agent.state('role-assignments')
      roleAssignments
        .forEach(assignment => commit('add', assignment))
    },
    async assert({ dispatch }, { user, role }) {
      const id = uuid()
      const assertion = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = ROLE_ASSERTION_TYPE
      assertion.role = role
      assertion.assignee = user
    
      await dispatch('roleAssignments/load', null, {root:true})
    }
  }
}
