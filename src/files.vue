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
      <tr
        v-for="_, id in files"
        :key="id"
      >
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
        return this.$store.getters['files/files']()
      }
    },
    methods: {
      async uploadFile(e) {
        const file = e.target.files[0]
        const id = await Agent.upload(file.name, file.type, file)
        const metadata = await Agent.metadata(id)
        metadata.name = file.name
        this.$store.dispatch('files/add', id )
        e.target.value = ''
      },
      download(id) {        
        Agent.download(id).direct()
      },
      remove(id) {
        this.$store.dispatch('files/remove', id)
      }
    }
  }
  
</script>