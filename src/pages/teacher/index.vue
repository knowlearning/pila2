<template>
  <h1>Teacher</h1>
  <div v-if="$store.getters['roles/hasPermission']($store.state.app.user, 'teacher')">
    <div>
      <button @click="tab = 'classes'">Classes</button>
      <button @click="tab = 'content'">Content</button>
      <button @click="tab = 'assignments'">Assignments</button>
      <button @click="tab = 'assignments-to-me'">Studies</button>
    </div>
    <Groups
      v-if="tab === 'classes'"
      type="class"
      :possibleMembers="() => students"
    />
    <div v-if="tab === 'content'">
      <MyContent />
      <ExpertContent />
    </div>
    <Assignments
      v-if="tab === 'assignments'"
      assignable_item_type="teacher-created"
      assignment_type="teacher-to-student"
    />
    <AssignmentsToMe
      v-if="tab === 'assignments-to-me'"
      type="researcher-to-teacher"
    />
  </div>
  <RoleRequester v-else role="teacher" />
</template>

<script>
  import RoleRequester from '../../role-requester.vue'
  import Groups from '../../groups.vue'
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'
  import AssignmentsToMe from '../../assignments-to-me.vue'
  import Assignments from '../../assignments.vue'

  export default {
    components: {
      Groups,
      MyContent,
      ExpertContent,
      RoleRequester,
      Assignments,
      AssignmentsToMe
    },
    data() {
      return {
        tab: 'classes',
        students: []
      }
    },
    async created() {
      const students = await Agent.state('my-students')
      this.students = students.map(({ student }) => student)
    }
  }
</script>
