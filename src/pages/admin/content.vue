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
  <h1>Expert Content</h1>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Content</th>
        <th>Admin</th>
        <th></th>
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
        <td>
          <button @click="toggleExpert(id)">remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import ContentName from '../../content-name.vue'
  import UserInfo from '../../user-info.vue'

  export default {
    components: {
      ContentName,
      UserInfo
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