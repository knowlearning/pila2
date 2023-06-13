<template>
  <div v-if="requestedRole">
    You have requested to be a {{ role }}. Please wait for admin approval.
  </div>
  <div v-else>
    <button
      @click="requestRole"
    >
      Request "{{ role }}" Role
    </button>
  </div>
</template>

<script>

  export default {
    props: {
      role: String
    },
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
        this.$store.dispatch('roleRequests/request', this.role)
      }
    }
  }

</script>