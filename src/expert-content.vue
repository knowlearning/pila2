<template>
  <h1>Expert Content</h1>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Content</th>
        <th>Admin</th>
        <th v-if="expertEditing"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{ assigner }, id in expertContent"
        :key="id"
      >
        <td> {{ id }} </td>
        <td><ContentName :id="id" /></td>
        <td><UserInfo :user="assigner" name /></td>
        <td v-if="expertEditing">
          <button @click="toggleExpert(id)">remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import ContentName from './content-name.vue'
  import UserInfo from './user-info.vue'

  export default {
    components: {
      ContentName,
      UserInfo
    },
    props: {
      expertEditing: Boolean
    },
    computed: {
      myContent() {
        return this.$store.getters['myContent/myContent']()
      },
      expertContent() {
        return this.$store.getters['expertContent/expertContent']()
      }
    },
    methods: {
      addContent() {
        const id = prompt('Enter a content id')
        this.$store.dispatch('myContent/add', id)
      },
      toggleExpert(id) {
        this.$store.dispatch('myContent/toggleExpert', id)
      },
      remove(id) {
        this.$store.dispatch('myContent/remove', id)
      }
    }
  }
  
</script>