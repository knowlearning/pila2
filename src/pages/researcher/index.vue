<template>
  <h1>Researcher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('researcher')">
    <div>
      <button @click="tab = 'teacher-groups'">Teacher Groups</button>
      <button @click="tab = 'content'">Content</button>
    </div>
    <TeacherGroups v-if="tab === 'teacher-groups'"/>
    <div v-if="tab === 'content'">
      <MyContent />
      <ExpertContent />
    </div>
  </div>
  <RoleRequester v-else role="researcher" />
</template>

<script>
  import TeacherGroups from './teacher-groups.vue'
  import RoleRequester from '../../role-requester.vue'
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'

  export default {
    components: {
      TeacherGroups,
      MyContent,
      ExpertContent,
      RoleRequester
    },
    data() {
      return {
        tab: 'teacher-groups'
      }
    }
  }
</script>
