<template>
  <h1>ADMIN</h1>
  <div v-if="iAmAnAdmin">
    <div>
      <button @click="tab = 'roles'">Roles</button>
      <button @click="tab = 'content'">Content</button>
    </div>
    <AdminRoleManager v-if="tab === 'roles'" />
    <AdminContentManager v-else-if="tab === 'content'" />
  </div>
  <div v-else>
    Admin Role Required
  </div>
</template>

<script>
  import AdminRoleManager from './roles.vue'
  import AdminContentManager from './content.vue'
  export default {
    components: {
      AdminRoleManager,
      AdminContentManager
    },
    data() {
      return {
        tab: 'roles'
      }
    },
    computed: {
      iAmAnAdmin() {
        return this.$store.getters['myRole/myRole']() === 'admin'
      }
    }
  }

</script>