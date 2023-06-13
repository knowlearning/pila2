<template>
  <h1>Researcher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('researcher')">
    You're a researcher!!!!!! Go research now.
  </div>
  <RoleRequester v-else role="researcher" />
</template>

<script>
  import RoleRequester from '../role-requester.vue'

  export default {
    components: {
      RoleRequester
    }
  }
</script>
