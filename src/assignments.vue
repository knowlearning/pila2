<template>
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
        v-for="_, id in assignable_items"
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
  import { v4 as uuid } from 'uuid'
  import ScopeValue from './scope-value.vue'
  import UserInfo from './user-info.vue'
  import Study from './assignment.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue,
      Study
    },
    props: {
      type: String
    },
    data() {
      return {
        current: null
      }
    },
    computed: {
      assignable_items() {
        return this.$store.getters['assignableItems/items'](this.type)
      }
    },
    methods: {
      async add() {
        const name = prompt('Study name')
        const id = uuid()
        const assignableItem = await Agent.mutate(id)
        assignableItem.name = name // TODO: add reasonable defaults based on type
        this.current = id
        this.$store.dispatch('assignableItems/add', { id, item_type: this.type })
      },
      remove(id) {
        this.$store.dispatch('assignableItems/remove', id)
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