<template>
  <h1>Researcher</h1>
  <div v-if="$store.getters['myRole/hasPermission']('researcher')">
    <div>
      <button @click="tab = 'teacher-groups'">Teacher Groups</button>
      <button @click="tab = 'content'">Content</button>
      <button @click="tab = 'studies'">Studies</button>
    </div>
    <Groups
      v-if="tab === 'teacher-groups'"
      type="teachers"
      :possibleMembers="teachers"
    />
    <div v-if="tab === 'content'">
      <MyContent />
      <ExpertContent />
    </div>
    <Studies v-if="tab === 'studies'" />
  </div>
  <RoleRequester v-else role="researcher" />
</template>

<script>
  import Groups from '../../groups.vue'
  import RoleRequester from '../../role-requester.vue'
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'
  import Studies from './studies.vue'

  export default {
    components: {
      Groups,
      MyContent,
      ExpertContent,
      RoleRequester,
      Studies
    },
    data() {
      return {
        tab: 'teacher-groups'
      }
    },
    methods: {
      teachers() {
        return this.$store.getters['roleAssignments/usersWithRole']('teacher')
      }
    }
  }
</script>
