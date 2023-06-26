<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{ assigner_id }, id in assignments"
        :key="id"
        :class="{ selected: id === current }"
        @click="current = current === id ? null: id"
      >
        <td>
          <ScopeValue
            :scope="id"
            :user="assigner_id"
            :path="['name']"
          />
        </td>
        <td>
          <ScopeValue
            :scope="id"
            :user="assigner_id"
            :path="['description']"
          />
      </td>
      </tr>
    </tbody>
  </table>
  <div
    v-if="current"
    :key="current"
  >
    <TeacherStudyAssignment
      v-if="type === 'researcher-to-group'"
      :assignment_id="current"
    />
    <ClassAssignment
      v-else-if="type === 'teacher-to-class'"
      :assignment_id="current"
    />
    <div v-else>Need view for type "{{ type }}"</div>
  </div>
</template>

<script>
  import ScopeValue from './scope-value.vue'
  import UserInfo from './user-info.vue'
  import TeacherStudyAssignment from './teacher-study-assignment.vue'
  import ClassAssignment from './class-assignment.vue'

  export default {
    components: {
      UserInfo,
      ScopeValue,
      ClassAssignment,
      TeacherStudyAssignment
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
      assignments() {
        return this.$store.getters['assignmentsToMe/assignments'](this.type)
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