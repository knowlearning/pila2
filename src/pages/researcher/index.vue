<template>
  <h1>Researcher</h1>
  <div v-if="$store.getters['roles/hasPermission']($store.state.user, 'researcher')">
    <div>
      <button @click="tab = 'teacher-groups'">Teacher Groups</button>
      <button @click="tab = 'content'">Content</button>
      <button @click="tab = 'files'">Files</button>
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
    <div v-if="tab === 'files'">
      <Files />
    </div>
    <Assignments
      v-if="tab === 'studies'"
      assignable_item_type="researcher-created"
      assignment_type="researcher-to-teacher"
    />
  </div>
  <RoleRequester v-else role="researcher" />
</template>

<script>
  import Groups from '../../groups.vue'
  import RoleRequester from '../../role-requester.vue'
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'
  import Assignments from '../../assignments.vue'
  import Files from '../../files.vue'

  export default {
    components: {
      Groups,
      MyContent,
      ExpertContent,
      Files,
      RoleRequester,
      Assignments
    },
    data() {
      return {
        tab: 'teacher-groups'
      }
    },
    computed: {
      teachers() {
        return this.$store.getters['roles/usersWithRole']('teacher')
      }
    }
  }
</script>
