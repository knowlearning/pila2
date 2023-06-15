<template>
  <h1>Studies</h1>
  <table>
    <thead>
      <tr>
        <th>Researcher</th>
        <th>Name</th>
        <th>Published</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ researcher, granted }, study in requestedStudies">
        <td><UserInfo :user="researcher" name /></td>
        <td><ScopeValue :scope="study" :path="['name']" /></td>
        <td>
          <input
            type="checkbox"
            :checked="!!granted"
            @click="publish(study, !granted)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import UserInfo from '../../user-info.vue'
  import ScopeValue from '../../scope-value.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue
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
      publish(study, granted) {
        return this.$store.dispatch('studyGrants/grant', { study, granted })
      }
    }
  }

</script>