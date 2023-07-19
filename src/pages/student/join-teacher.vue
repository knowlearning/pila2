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
        const teachers = await Agent.state('teachers')
        teachers[this.$route.params.teacher] = {}
        this.joined = true
      }
    }
  }
</script>