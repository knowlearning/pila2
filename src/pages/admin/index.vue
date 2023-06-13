<template>
  <h1>ADMIN</h1>
  <div v-if="iAmAnAdmin">
    <h1>Role Assignments</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Assigner</th>
          <th>Assigned</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ role, assigner, updated }, user in roleAssignments">
          <td>{{ user }}</td>
          <td>email...</td>
          <td>{{ assigner }}</td>
          <td>{{ updated }}</td>
          <td>
            <select @change="({ target: { value } }) => grantRole(user, value)">
              <option
                v-for="roleName in availableRoles"
                :selected="roleName === role"
              >
                {{ roleName }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <h1>Role Requests</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Requested</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ role, updated }, user in roleRequests">
          <td>{{ user }}</td>
          <td>email...</td>
          <td>{{ updated }}</td>
          <td>{{ role }}</td>
          <td>
            <button @click="grantRole(user, role)">grant</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    Admin Role Required
  </div>
</template>

<script>

  export default {
    state() {
      return {}
    },
    computed: {
      availableRoles() {
        return ['admin', 'researcher', 'teacher', 'student']
      },
      roleRequests() {
        return this.$store.getters['requestedRoles/requests']()
      },
      roleAssignments() {
        return this.$store.getters['roleAssignments/assignments']()
      },
      iAmAnAdmin() {
        return this.$store.getters['myRole/myRole']() === 'admin'
      }
    },
    methods: {
      grantRole(user, role) {
        this.$store.dispatch('roleAssertions/grant', { user, role })
      }
    }
  }

</script>