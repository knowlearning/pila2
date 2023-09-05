<template>
  <h1>Files</h1>
  <input
    ref="fileInput"
    style="display: none;"
    type="file"
    @change="uploadFile"
  >
  <button
    class="top-button"
    @click="$refs.fileInput.click()"
  >
    Upload
  </button>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Filename</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="id in files" :key="id">
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
  import ContentName from './components/content-name.vue'

  export default {
    components: {
      ContentName
    },
    computed: {
      files() {
        return this.$store.getters['tags/withTag']('file')
      }
    },
    methods: {
      async uploadFile(e) {
        const file = e.target.files[0]
        const content_id = await Agent.upload(file.name, file.type, file)
        const metadata = await Agent.metadata(content_id)
        metadata.name = file.name
        this.$store.dispatch('tags/tag', { content_id, tag_type: 'file' } )
        e.target.value = ''
      },
      download(id) {
        console.log('DOWNLOADING', id)
        Agent.download(id).direct()
      },
      remove(content_id) {
        this.$store.dispatch('tags/untag', { content_id, tag_type: 'file' })
      }
    }
  }
  
</script>