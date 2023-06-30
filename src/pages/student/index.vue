<template>
  <h1>Student</h1>
  <div>
    <button @click="tab = 'class-assignments'">Assignments</button>
    <button @click="tab = 'study-assignments'">Studies</button>
    <AssingmentsToMe
      :key="tab"
      :type="assignmentType"
    />
  </div>
</template>

<script>
  import AssingmentsToMe from '../../assignments-to-me.vue'

  export default {
    components: {
      AssingmentsToMe
    },
    data() {
      return {
        tab: 'class-assignments'
      }
    },
    computed: {
      assignmentType() {
        return {
          'class-assignments': 'teacher-to-class',
          'study-assignments': 'researcher-to-group'
        }[this.tab]
      }
    }
  }
</script>