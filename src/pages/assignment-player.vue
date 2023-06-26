<template>
  <div v-if="assignment">
    <vueContentComponent :id="assignment.content" />
  </div>
  <div v-else>
    ...loading...
  </div>
</template>

<script>
  import { vueContentComponent } from '@knowlearning/agents'

  export default {
    components: {
      vueContentComponent
    },
    data() {
      return {
        assignment: null
      }
    },
    async created() {
      this.assignment = await Agent.state(this.assignment_id, this.assigner_id)
    },
    computed: {
      assignment_id() {
        return this.$route.params.assignment_id
      },
      assigner_id() {
        return this.$store.getters['assignmentsToMe/assignment'](this.assignment_id).assigner_id
      }
    }
  }
</script>

<style scoped>

.selected {
  background: yellow;
}

tr {
  cursor: pointer;
}

.member-tables {
  display: flex;
  justify-content: space-around;
  align-items: top;
}

</style>