<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th v-for="tag in tags" :id="tag">
          {{tag}}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="id in content" :key="id">
        <td>
          <button @click="download(id)">download</button>
        </td>
        <td><ContentName :id="id" /></td>
        <td v-for="tag in tags" :id="tag">
          <input
            type="checkbox"
            v-if="$store.getters['tags/hasTag'](id, tag)"
            @click="$store.dispatch('tags/untag', { content_id: id, tag_type: tag })"
            checked
          />
          <input
            type="checkbox"
            v-else
            @click="$store.dispatch('tags/tag', { content_id: id, tag_type: tag })"
          />
        </td>
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
      type: String,
      tags: Array
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