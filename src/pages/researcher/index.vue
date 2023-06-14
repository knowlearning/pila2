<template>
  <h1>Researcher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('researcher')">
    <div>
      <button @click="tab = 'teacher-groups'">Teacher Groups</button>
      <button @click="tab = 'content'">Content</button>
    </div>
    <TeacherGroups v-if="tab === 'teacher-groups'"/>
    <MyContent v-if="tab === 'content'" />
  </div>
  <RoleRequester v-else role="researcher" />
</template>

<script>
  import TeacherGroups from './teacher-groups.vue'
  import RoleRequester from '../../role-requester.vue'
  import MyContent from '../../my-content.vue'

  export default {
    components: {
      TeacherGroups,
      MyContent,
      RoleRequester
    },
    data() {
      return {
        tab: 'teacher-groups'
      }
    }
  }
</script>
