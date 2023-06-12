<template>
  <h1>Researcher</h1>
  <div v-if="validResearcher">
    you're a researcher!!!!!! research now.
  </div>
  <div v-else-if="requestedRole">
    You have requested to be a researcher. Please wait for admin approval.
  </div>
  <div v-else>
    <button
      @click="requestRole"
    >
      Request Researcher Role
    </button>
  </div>
  <div>

  </div>
</template>

<script>
  export default {
    computed: {
      requestedRole() {
        return this.$store.getters['roleRequests/myRequestedRole']()
      },
      validResearcher() {
        return false
      }
    },
    methods: {
      requestRole() {
        this.$store.dispatch('roleRequests/request', 'researcher')
      }
    }
  }
</script>