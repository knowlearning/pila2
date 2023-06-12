<template>
  <div v-if="isLoaded === false">
    loading...
  </div>
  <LoginMenu v-else-if="isAnonymous" />
  <div v-else>
    wooo {{ $store.state.app.user }}
  </div>
</template>

<script>
  import LoginMenu from './login-menu.vue'

  export default {
    components: { LoginMenu },
    computed: {
      isLoaded() { return this.$store.getters['app/isLoaded']() },
      isAnonymous() { return this.$store.getters['app/isAnonymous']() }
    }
  }
</script>

<style scoped>
</style>
