<template>
  <div v-if="loading">
    ...
  </div>
  <div v-else>
    <div>
      Name
      <input v-model="assignment.name" />
    </div>
    <div>
      Description
      <textarea v-model="assignment.description" />
    </div>
    <div>
      Content
      <input v-model="assignment.content" />
    </div>
  </div>
  <GroupAssigner
    :id="id"
    :groups="$store.getters['groups/groups']('class')"
  />
</template>

<script>
  import GroupAssigner from './group-assigner.vue'

  export default {
    props: {
      id: String
    },
    components: {
      GroupAssigner
    },
    data() {
      return {
        loading: true,
        selectedFile: 'UNSELECTED',
        assignment: null
      }
    },
    async created() {
      this.assignment = await Agent.mutate(this.id)
      this.loading = false
    }
  }

</script>

<style>

.assignment-tables {
  display: flex;
  justify-content: space-around;
  align-items: top;
}

</style>