<template>
  <h1>Researcher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('researcher')">
    <TeacherGroups />
  </div>
  <RoleRequester v-else role="researcher" />
</template>

<script>
  import TeacherGroups from './teacher-groups.vue'
  import RoleRequester from '../../role-requester.vue'

  export default {
    components: {
      TeacherGroups,
      RoleRequester
    }
  }
</script>
