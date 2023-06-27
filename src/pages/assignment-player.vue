<template>
  <div v-if="assignment" class="wrapper">
    <vueContentComponent
      :id="assignment.content"
      @state="stateListener"
      @mutate="mutateListener"
    />
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
    },
    methods: {
      stateListener(event) {
        console.log('STATE LISTENER!', event)
      },
      mutateListener(event) {
        console.log('MUTATE LISTENER!', event)
      }
    }
  }
</script>

<style scoped>

.wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

</style>