<template>
  <h1>Content</h1>
  <button @click="addContent">add content</button>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Content</th>
        <th v-if="expertEditing">Expert</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="content, id in myContent"
        :key="id"
      >
        <td> {{ id }} </td>
        <td><ContentName :id="id" /></td>
        <td
          v-if="expertEditing"
          @click="toggleExpert(id)"
        >
          <span v-if="isExpert(id)">TRUE</span>
          <span v-else>False</span>
        </td>
        <td>
          <button @click="remove(id)">x</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import ContentName from './components/content-name.vue'
  import UserInfo from './components/user-info.vue'

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
      }
    },
    methods: {
      addContent() {
        const id = prompt('Enter a content id')
        this.$store.dispatch('myContent/add', id)
      },
      remove(id) {
        this.$store.dispatch('myContent/remove', id)
      },
      toggleExpert(id) {
        this.$store.dispatch('expertContent/toggleExpert', id)
      },
      isExpert(id) {
        return this.$store.getters['expertContent/isExpert'](id)
      }
    }
  }
  
</script>