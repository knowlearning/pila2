<template>
  <h1>Teacher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('teacher')">
    You're a teacher!!!!!! Go teach now.
  </div>
  <RoleRequester v-else role="teacher" />
</template>

<script>
  import RoleRequester from '../role-requester.vue'

  export default {
    components: {
      RoleRequester
    }
  }
</script>