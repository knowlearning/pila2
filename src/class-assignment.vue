<template>
  <div v-if="assignment">
    <h1>
      {{ assignment.name }}
    </h1>
    <p>
      {{ assignment.description }}
    </p>
    <button @click="$router.push(`/assignment/${this.id}`)">play</button>
  </div>
  <div v-else>
    ...
  </div>
</template>

<script>
  export default {
    props: {
      id: String
    },
    data() {
      return {
        assigned_item: null
      }
    },
    computed: {
      assignment() {
        return this.$store.getters['assignmentsToMe/assignment'](this.id)
      }
    },
    async created() {
      const { assignment_id, authority } = this.assignment
      this.assigned_item = await Agent.state(assignment_id, authority)
    }
  }

</script>