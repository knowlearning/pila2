<template>
  <h1>Assigned Studies</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{ researcher }, id in studies"
        :key="id"
        :class="{ selected: id === current }"
        @click="current = current === id ? null: id"
      >
        <td><ScopeValue :scope="id" :user="researcher" :path="['name']" /></td>
        <td><ScopeValue :scope="id" :user="researcher" :path="['description']" /></td>
        <td>
          <button @click.stop="remove(id)">x</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    v-if="current"
    :key="current"
  >
    <h1>
      <ScopeValue :scope="current" :user="studies[current].researcher" :path="['name']" />
    </h1>
  </div>
</template>

<script>
  import ScopeValue from '../../scope-value.vue'
  import UserInfo from '../../user-info.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue
    },
    data() {
      return {
        current: null
      }
    },
    computed: {
      studies() {
        return this.$store.getters['assignedStudies/assignments']()
      }
    }
  }
</script>

<style scoped>

.selected {
  background: yellow;
}

tr {
  cursor: pointer;
}

.member-tables {
  display: flex;
  justify-content: space-around;
  align-items: top;
}

</style>