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
  import { v1 as uuid } from 'uuid'
  import { vueContentComponent } from '@knowlearning/agents'

  export default {
    components: {
      vueContentComponent
    },
    data() {
      return {
        assignment: null,
        assignmentScopes: Agent.mutate('assignment_scopes', false)
      }
    },
    async created() {
      this.assignment = await Agent.state(this.assignment_id, this.authority)
    },
    computed: {
      assignment_id() {
        return this.$route.params.assignment_id
      },
      authority() {
        return this.$store.getters['assignmentsToMe/assignment'](this.assignment_id).authority
      }
    },
    methods: {
      async stateListener(event) {
        console.log('STATE LISTENER!', event)
      },
      async mutateListener({ scope }) {
        const as = await this.assignmentScopes
        const entryExists = (
          Object
            .values(as)
            .some(({ scope: s, assignment_id: a }) => {
              return s === scope && this.assignment_id === a
            })
        )
        if (!entryExists) {
          as[uuid()] = {
            scope,
            assignment_id: this.assignment_id
          }
          console.log(JSON.stringify(as, null, 4))
        }
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