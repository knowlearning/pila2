import { v4 as uuid } from 'uuid'

const TEACHER_JOIN_TYPE = 'application/json;type=teacher-join'

export default {
  scope: null,
  namespaced: true,
  state: () => ({
    teacher_joins: []
  }),
  getters: {
    isMyTeacher: state => tid => {
      return state.teacher_joins.some(({ teacher_id }) => teacher_id === tid)
    }
  },
  mutations: {
    setTeachers(state, teachers) {
      state.teacher_joins = teachers
    }
  },
  actions: {
    async load({ commit }) {
      const teachers = await Agent.state('my-teachers')
      commit('setTeachers', teachers)
    },
    async join({ dispatch }, teacher_id) {
      const id = uuid()
      const metadata = await Agent.metadata(id)
      if (metadata.active_type !== TEACHER_JOIN_TYPE) {
        metadata.active_type = TEACHER_JOIN_TYPE
      }
      const state = await Agent.state(id)
      state.teacher_id = teacher_id
      await dispatch('load')
    }
  }
}