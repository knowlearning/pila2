<template>
  <h1>
    <ScopeValue :scope="id" :path="['name']" />
  </h1>
  <div v-if="isGranted">
    Publish Request GRANTED
  </div>
  <div v-else-if="isGranted">
    Publish Request DENIED
  </div>
  <div v-else>
    <button
      @click="requestPublish(id)"
      v-if="!publishRequested(id)"
    >
      Request Publish
    </button>
    <div v-else>
      Publish Requested
      <button @click="undoRequest(id)">undo</button>
    </div>
  </div>
  <GroupAssigner
    :id="id"
    :groups="$store.getters['groups/groups']('teachers')"
  />
</template>

<script>
  import UserInfo from './user-info.vue'
  import ScopeValue from './scope-value.vue'
  import GroupAssigner from './group-assigner.vue'

  export default {
    props: {
      id: String
    },
    components: {
      ScopeValue,
      UserInfo,
      GroupAssigner
    },
    computed: {
      isGranted() {
        return this.$store.getters['requestedStudies/granted'](this.id)
      }
    },
    methods: {
      requestPublish(id) {
        this.$store.dispatch('studyRequests/add', id)
      },
      undoRequest(id) {
        this.$store.dispatch('studyRequests/remove', id)
      },
      publishRequested(id) {
        return this.$store.getters['studyRequests/requested'](id)
      }
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