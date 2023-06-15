<template>
  <h1>Studies</h1>
  <button @click="add">New Study</button>
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
        v-for="_, id in studies"
        :key="id"
        :class="{ selected: id === current }"
        @click="current = current === id ? null: id"
      >
        <td><ScopeValue :scope="id" :path="['name']" /></td>
        <td><ScopeValue :scope="id" :path="['description']" /></td>
        <td>
          <button @click.stop="remove(id)">x</button>
        </td>
      </tr>
    </tbody>
  </table>
  <Study
    v-if="current"
    :id="current"
    :key="current"
  />
</template>

<script>
  import ScopeValue from '../../scope-value.vue'
  import UserInfo from '../../user-info.vue'
  import Study from './study.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue,
      Study
    },
    data() {
      return {
        current: null
      }
    },
    computed: {
      studies() {
        return this.$store.getters['studies/studies']()
      }
    },
    methods: {
      async add() {
        const name = prompt('Study name')
        this.current = await this.$store.dispatch('studies/add', { name })
      },
      remove(id) {
        this.$store.dispatch('studies/remove', id)
        if (this.current === id) this.current = null
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