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
  <div
    v-if="current"
    :key="current"
  >
    <h1>
      <ScopeValue :scope="current" :path="['name']" />
    </h1>
    <div v-if="isGranted(current) === true">
      Publish Request GRANTED
    </div>
    <div v-else-if="isGranted(current) === false">
      Publish Request DENIED
    </div>
    <div v-else>
      <button
        @click="requestPublish(current)"
        v-if="!publishRequested(current)"
      >
        Request Publish
      </button>
      <div v-else>
        Publish Requested
        <button @click="undoRequest(current)">undo</button>
      </div>
    </div>
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
      },
      isGranted(id) {
        return this.$store.getters['requestedStudies/granted'](id)
      },
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