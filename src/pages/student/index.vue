<template>
  <h1>Student</h1>
  <div>
    <AssingmentsToMe type="teacher-to-class" />
  </div>
</template>

<script>
  import AssingmentsToMe from '../../assignments-to-me.vue'

  export default {
    components: {
      AssingmentsToMe
    }
  }
</script>