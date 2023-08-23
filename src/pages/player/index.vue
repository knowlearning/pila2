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
      this.assignment = await Agent.state(this.item_id)
    },
    computed: {
      item_id() {
        return this.$route.params.item_id
      }
    },
    methods: {
      async stateListener(event) {
        console.log('STATE LISTENER!', event)
      },
      async mutateListener({ scope }) {
        // TODO: register this scope as part of an assignment
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