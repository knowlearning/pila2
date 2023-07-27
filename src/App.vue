<template>
  <div v-if="isLoaded === false">
    loading...
  </div>
  <LoginMenu v-else-if="isAnonymous" />
  <div
    id="main-app"
    v-else
  >
    <div>
      {{ $store.state.app.user }}: {{ $store.getters['roleAssignments/role']($store.state.app.user) }}
      <button @click="logOut">log out</button>
    </div>
    <div id="main-app-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LoginMenu from './login-menu.vue'

  export default {
    components: { LoginMenu },
    computed: {
      isLoaded() { return this.$store.state.loaded },
      isAnonymous() { return this.$store.getters['app/isAnonymous']() }
    },
    methods: {
      logOut() {
        Agent.logout()
      }
    }
  }
</script>

<style scoped>
#main-app
{
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
#main-app-body
{
  flex-grow: 1;
}
</style>
