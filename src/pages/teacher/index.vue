<template>
  <h1>Teacher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('teacher')">
    <div>
      <button @click="tab = 'classes'">Classes</button>
      <button @click="tab = 'content'">Content</button>
      <button @click="tab = 'studies'">Studies</button>
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
    <AssignedStudies v-if="tab === 'studies'" />
  </div>
  <RoleRequester v-else role="teacher" />
</template>

<script>
  import RoleRequester from '../../role-requester.vue'
  import Groups from '../../groups.vue'
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'
  import AssignedStudies from './assigned-studies.vue'

  export default {
    components: {
      Groups,
      MyContent,
      ExpertContent,
      RoleRequester,
      AssignedStudies
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
