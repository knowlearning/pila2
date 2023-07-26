import { v4 as uuid } from 'uuid'

const TEACHER_JOIN_TYPE = 'application/json;type=teacher-join'

export default {
  scope: null,
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async join({}, teacher_id) {
      const id = uuid()
      const metadata = await Agent.metadata(id)
      if (metadata.active_type !== TEACHER_JOIN_TYPE) {
        metadata.active_type = TEACHER_JOIN_TYPE
      }
      const state = await Agent.state(id)
      state.teacher_id = teacher_id
    }
  }
}