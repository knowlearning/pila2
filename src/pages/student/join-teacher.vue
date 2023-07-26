<template>
  <h1>Join Teacher</h1>
  <div>
    <button @click="join">Join</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        joined: false
      }
    },
    methods: {
      async join() {
        const { teacher } = this.$route.params
        this.$store.dispatch('teachers/join', teacher)
      }
    }
  }
</script>