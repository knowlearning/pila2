<template>
  <h1>Join Teacher</h1>
  <div v-if="isMyTeacher">
    You have already joined this teacher.
  </div>
  <div v-else="">
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
    computed: {
      teacherId() {
        return this.$route.params.teacher
      },
      isMyTeacher() {
        return this.$store.getters['teachers/isMyTeacher'](this.teacherId)
      }
    },
    methods: {
      async join() {
        this.$store.dispatch('teachers/join', this.teacherId)
      }
    }
  }
</script>