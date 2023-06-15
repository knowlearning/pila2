<template>
  <span v-if="loaded">
    {{ value }}
  </span>
  <span v-else>...</span>
</template>

<script>

export default {
  props: {
    scope: String,
    user: {
      type: String,
      required: false
    },
    path: Array
  },
  data() {
    return { loaded: false, state: {} }
  },
  async created() {
    this.state = await (this.user ? Agent.state(this.scope, this.user) : Agent.state(this.scope))
    this.loaded = true
  },
  computed: {
    value() {
      return this.path.reduce((acc, field) => acc[field], this.state)
    }
  }
}

</script>