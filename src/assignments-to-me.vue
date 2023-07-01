<template>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Assigner</th>
        <th>Authority</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{ assigner_id, authority, assignment_id }, id in assignments"
        :key="id"
        :class="{ selected: id === current }"
        @click="current = current === id ? null: id"
      >
        <td>{{ id }}</td>
        <td>
          <ScopeValue
            :scope="assignment_id"
            :user="authority"
            :path="['name']"
          />
        </td>
        <td>
          <ScopeValue
            :scope="assignment_id"
            :user="authority"
            :path="['description']"
          />
        </td>
        <td>
          {{ assigner_id }}
        </td>
        <td>
          {{ authority }}
        </td>
      </tr>
    </tbody>
  </table>
  <div
    v-if="current"
    :key="current"
  >
    <TeacherStudyAssignment
      v-if="type === 'researcher-to-teacher'"
      :id="current"
    />
    <ClassAssignment
      v-else-if="type === 'teacher-to-student'"
      :id="current"
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