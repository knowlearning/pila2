<template>
  <h1>
    <ScopeValue :scope="id" :path="['name']" />
  </h1>
  <div v-if="isGranted(id) === true">
    Publish Request GRANTED
  </div>
  <div v-else-if="isGranted(id) === false">
    Publish Request DENIED
  </div>
  <div v-else>
    <button
      @click="requestPublish(id)"
      v-if="!publishRequested(id)"
    >
      Request Publish
    </button>
    <div v-else>
      Publish Requested
      <button @click="undoRequest(id)">undo</button>
    </div>
  </div>
  <div class="assignment-tables">
    <div>
      <table>
        <tr>
          <th>Group</th>
          <th></th>
        </tr>
        <tr
          v-for="group in groupAssignmentsFor(id)"
          :key="group"
        >
          <td>
            <ScopeValue scope="groups" :path="[group, 'name']" />
          </td>
          <td>
            <button @click="removeAssignment(group, id)">x</button>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <table>
        <tr>
          <th></th>
          <th>Group</th>
        </tr>
        <tr
          v-for="{ name }, group_id in groups"
          :key="group_id"
        >
          <td>
            <button @click="makeAssignment(group_id, id)">+</button>
          </td>
          <td>{{ name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import UserInfo from './user-info.vue'
  import ScopeValue from './scope-value.vue'

  export default {
    props: {
      id: String
    },
    components: {
      ScopeValue,
      UserInfo
    },
    computed: {
      groups() {
        return this.$store.getters['groups/groups']()
      }
    },
    methods: {
      groupAssignmentsFor(study) {
        return this.$store.getters['assignments/assignedGroups'](study)
      },
      isGranted(id) {
        return this.$store.getters['requestedStudies/granted'](id)
      },
      requestPublish(id) {
        this.$store.dispatch('studyRequests/add', id)
      },
      undoRequest(id) {
        this.$store.dispatch('studyRequests/remove', id)
      },
      publishRequested(id) {
        return this.$store.getters['studyRequests/requested'](id)
      },
      makeAssignment(group_id, assignment_id) {
        this.$store.dispatch('assignments/assign', { group_id, assignment_id })
      },
      removeAssignment(group_id, assignment_id) {
        this.$store.dispatch('assignments/unassign', { group_id, assignment_id })
      }
    }

  }

</script>

<style>

.assignment-tables {
  display: flex;
  justify-content: space-around;
  align-items: top;
}

</style>