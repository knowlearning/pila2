<template>
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
            <button @click="makeAssignment(group_id, id, assignment_type)">+</button>
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
      id: String,
      groups: Object,
      assignment_type: String
    },
    components: {
      ScopeValue,
      UserInfo
    },
    methods: {
      groupAssignmentsFor(id) {
        return this.$store.getters['assignments/assignedGroups'](id, this.assignment_type)
      },
      makeAssignment(group_id, assignment_id, assignment_type) {
        this.$store.dispatch('assignments/assign', { group_id, assignment_id, assignment_type })
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