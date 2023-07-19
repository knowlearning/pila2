<template>
  <button @click="add">New Assignment</button>
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
  <div v-if="current" :key="current">
    <ResearcherToTeacherAssignment
      v-if="assignable_item_type === 'researcher-created'"
      :id="current"
    />
    <TeacherToStudentAssignment
      v-else-if="assignable_item_type === 'teacher-created'"
      :id="current"
    />
  </div>
</template>

<script>
  import { v4 as uuid } from 'uuid'
  import ScopeValue from './scope-value.vue'
  import UserInfo from './user-info.vue'
  import ResearcherToTeacherAssignment from './researcher-to-teacher-assignment.vue'
  import TeacherToStudentAssignment from './teacher-to-student-assignment.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue,
      ResearcherToTeacherAssignment,
      TeacherToStudentAssignment
    },
    props: {
      assignable_item_type: String,
      assignment_type: String
    },
    data() {
      return {
        current: null
      }
    },
    computed: {
      assignable_items() {
        return this.$store.getters['assignableItems/items'](this.assignable_item_type)
      }
    },
    methods: {
      async add() {
        const name = prompt('Study name')
        const id = uuid()
        const assignableItem = await Agent.state(id)
        assignableItem.name = name // TODO: add reasonable defaults based on type
        this.current = id
        this.$store.dispatch('assignableItems/add', { id, item_type: this.assignable_item_type })
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