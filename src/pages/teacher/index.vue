<template>
  <h1>Teacher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('teacher')">
    <div>
      <button @click="tab = 'classes'">Classes</button>
      <button @click="tab = 'content'">Content</button>
      <button @click="tab = 'studies'">Studies</button>
    </div>
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
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'
  import AssignedStudies from './assigned-studies.vue'

  export default {
    components: {
      MyContent,
      ExpertContent,
      RoleRequester,
      AssignedStudies
    },
    data() {
      return {
        tab: 'classes'
      }
    }
  }
</script>
