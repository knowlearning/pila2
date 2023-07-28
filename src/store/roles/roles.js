import { v4 as uuid } from 'uuid'

const ROLE_ASSERTION_TYPE = 'application/json;type=role_assertion'
const ROLE_REQUEST_TYPE = 'application/json;type=role_request'

const rolePermissions = {
  admin:      { admin: true,  researcher: true,  teacher: true,  student: true },
  researcher: { admin: false, researcher: true,  teacher: true,  student: true },
  teacher:    { admin: false, researcher: false, teacher: true,  student: true },
  student:    { admin: false, researcher: false, teacher: false, student: true },
}

export default {
  scope: null,
  namespaced: true,
  state: () => ({
    assignments: {},
    request: null
  }),
  getters: {
    assignments: state => () => state.assignments,
    usersWithRole: state => role => (
      Object
        .entries(state.assignments)
        .filter(([_user, {role: r}]) => r === role)
        .map(([user]) => user)
    ),
    role: state => user => {
      const assignment = state.assignments[user]
      return assignment ? assignment.role : 'student'
    },
    hasPermission: (_state, getters) => (user, permission) => {
      const role = getters.role(user)
      if (!rolePermissions[role]) return false
      else return !!rolePermissions[role][permission]
    },
    myRequest: state => () => state.request.role
  },
  mutations: {
    initRoleRequest(state, request) {
      state.request = request
    },
    request(state, role) {
      state.request.role = role
    },
    assign(state, { assignee, role, assigner, updated }) {
      state.assignments[assignee] = { role, assigner, updated }
    },
  },
  actions: {
    async load({ commit }) {
      await Agent.synced()
      await Promise.all([
        Agent
          .state('role-assignments')
          .then(assignments => {
            assignments.forEach(assignment => commit('assign', assignment))
          }),
        Agent
          .state('requested-role')
          .then(async roleRequest => {
            const metadata = await Agent.metadata('requested-role')
            if (metadata.active_type !== ROLE_REQUEST_TYPE) {
              metadata.active_type = ROLE_REQUEST_TYPE
            }
            commit('initRoleRequest', roleRequest)
          })
      ])
    },
    async request({ commit }, role) {
      commit('request', role)
    },
    async assign({ dispatch }, { user, role }) {
      const id = uuid()
      const assertion = await Agent.state(id)
      const metadata = await Agent.metadata(id)
      metadata.active_type = ROLE_ASSERTION_TYPE
      assertion.role = role
      assertion.assignee = user
    
      await dispatch('roles/load', null, {root:true})
    }
  }
}
