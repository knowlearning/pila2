<template>
  <h1>Studies</h1>
  <table>
    <thead>
      <tr>
        <th>Researcher</th>
        <th>Name</th>
        <th>Updated</th>
        <th>Published</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ researcher, updated }, study in requestedStudies">
        <td><UserInfo :user="researcher" name /></td>
        <td>Study Info... Name {{ study }}</td>
        <td>{{ updated }}</td>
        <td>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import UserInfo from '../../user-info.vue'

  export default {
    components: {
      UserInfo
    },
    state() {
      return {}
    },
    computed: {
      requestedStudies() {
        return this.$store.getters['requestedStudies/requests']()
      }
    },
    methods: {
    }
  }

</script>