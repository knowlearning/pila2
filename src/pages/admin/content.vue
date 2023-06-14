<template>
  <h1>Content</h1>
  <button @click="addContent">add content</button>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Content</th>
        <th>Expert</th>
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
        <td @click="toggleExpert(id)">
          <span v-if="content.expert">TRUE</span>
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
  import ContentName from '../../content-name.vue'

  export default {
    components: {
      ContentName
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
      toggleExpert(id) {
        this.$store.dispatch('myContent/toggleExpert', id)
      },
      remove(id) {
        this.$store.dispatch('myContent/remove', id)
      }
    }
  }
  
</script>