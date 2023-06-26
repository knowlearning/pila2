<template>
  <div v-if="assignment">
    <h1>
      {{ assignment.name }}, content: {{ assignment.content }}
    </h1>
    <p>
      {{ assignment.description }}
    </p>
    <vueContentComponent :id="assignment.content" />
  </div>
  <div v-else>
    ...
  </div>
</template>

<script>
  import { vueContentComponent } from '@knowlearning/agents'

  export default {
    components: {
      vueContentComponent
    },
    props: {
      assignment_id: String,
      assigner_id: String
    },
    data() {
      return {
        assignment: null
      }
    },
    async created() {
      this.assignment = await Agent.state(this.assignment_id, this.assigner_id)
    }
  }

</script>