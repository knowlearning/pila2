<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="id in content" :key="id">
        <td>
          <button @click="download(id)">download</button>
        </td>
        <td><ContentName :id="id" /></td>
        <td>
          <button @click="remove(id)">x</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import ContentName from './content-name.vue'

  export default {
    props: {
      type: String
    },
    components: {
      ContentName
    },
    computed: {
      content() {
        return this.$store.getters['tags/withTag'](this.type)
      }
    },
    methods: {
      download(id) {
        Agent.download(id).direct()
      },
      remove(content_id) {
        this.$store.dispatch('tags/untag', { content_id, tag_type: this.type })
      }
    }
  }
</script>