<template>
  <tr>
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
</template>

<script>
  import ContentName from './content-name.vue'
  export default {
    props: {
      id: String,
      tags: Array
    },
    components: {
      ContentName
    }
  }
</script>