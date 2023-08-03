<template>
  <h1>ADMIN</h1>
  <div v-if="iAmAnAdmin">
    <div>
      <button @click="tab = 'roles'">Roles</button>
      <button @click="tab = 'content'">Content</button>
      <button @click="tab = 'studies'">Studies</button>
    </div>
    <AdminRoleManager v-if="tab === 'roles'" />
    <AdminContentManager v-else-if="tab === 'content'" />
    <AdminStudyManager v-else-if="tab === 'studies'" />
  </div>
  <div v-else>
    Admin Role Required
  </div>
</template>

<script>
  import AdminRoleManager from './roles.vue'
  import AdminContentManager from './content.vue'
  import AdminStudyManager from './studies.vue'
  export default {
    components: {
      AdminRoleManager,
      AdminContentManager,
      AdminStudyManager
    },
    data() {
      return {
        tab: 'roles'
      }
    },
    computed: {
      iAmAnAdmin() {
        return this.$store.getters['roles/role'](this.$store.state.user) === 'admin'
      }
    }
  }

</script>