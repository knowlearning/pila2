<template>
  <div v-if="assignment">
    <h1>
      {{ assignment.name }}
    </h1>
    <p>
      {{ assignment.description }}
    </p>
    <button @click="$router.push(`/assignment/${this.assignment_id}`)">play</button>
  </div>
  <div v-else>
    ...
  </div>
</template>

<script>
  export default {
    props: {
      assignment_id: String
    },
    data() {
      return {
        assignment: null
      }
    },
    computed: {
      assigner_id() {
        return this.$store.getters['assignmentsToMe/assignment'](this.assignment_id).assigner_id
      }
    },
    async created() {
      this.assignment = await Agent.state(this.assignment_id, this.assigner_id)
    }
  }

</script>