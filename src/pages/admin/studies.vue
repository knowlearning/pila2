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
      <tr v-for="{ researcher, granted }, study in studyRequests">
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
  import UserInfo from '../../components/user-info.vue'
  import ScopeValue from '../../components/scope-value.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue
    },
    state() {
      return {}
    },
    computed: {
      studyRequests() {
        return this.$store.getters['studyRequests/requests']()
      }
    },
    methods: {
      publish(study, granted) {
        return this.$store.dispatch('studyRequests/grant', { study, granted })
      }
    }
  }

</script>