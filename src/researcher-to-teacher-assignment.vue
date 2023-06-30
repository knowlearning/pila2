<template>
  <div v-if="loading">
    ...
  </div>
  <div v-else>
    <div>
      Name
      <input v-model="study.name" />
    </div>
    <div>
      Description
      <textarea v-model="study.description" />
    </div>
    <div>
      Content
      <input v-model="study.content" />
    </div>
    <div>
      Dashboard
      <input v-model="study.dashboard" />
    </div>
    <div>
      Files
      <ul>
        <li v-for="id, index in study.files">
          <button @click="download(id)">download</button>
          <ContentName :id="id" />
          <button @click="study.files.splice(index, 1)">x</button>
        </li>
      </ul>
      <select v-model="selectedFile">
        <option value="UNSELECTED">Add File</option>
        <option
          v-for="_, id in files"
          :value="id"
        >
          <ContentName :id="id" />
        </option>
      </select>
    </div>
  </div>
  <div v-if="isGranted">
    Publish Request GRANTED
  </div>
  <div v-else-if="isGranted">
    Publish Request DENIED
  </div>
  <div v-else>
    <button
      @click="requestPublish(id)"
      v-if="!publishRequested(id)"
    >
      Request Publish
    </button>
    <div v-else>
      Publish Requested
      <button @click="undoRequest(id)">undo</button>
    </div>
  </div>
  <GroupAssigner
    :id="id"
    :groups="$store.getters['groups/groups']('teachers')"
    assignment_type="researcher-to-teacher"
  />
</template>

<script>
  import UserInfo from './user-info.vue'
  import ContentName from './content-name.vue'
  import GroupAssigner from './group-assigner.vue'
  import download from './download.js'

  export default {
    props: {
      id: String
    },
    components: {
      ContentName,
      UserInfo,
      GroupAssigner
    },
    data() {
      return {
        loading: true,
        selectedFile: 'UNSELECTED',
        study: null
      }
    },
    async created() {
      this.study = await Agent.mutate(this.id)
      if (!this.study.files) this.study.files = []
      this.loading = false
    },
    computed: {
      isGranted() {
        return this.$store.getters['requestedStudies/granted'](this.id)
      },
      files() {
        return this.$store.getters['files/files']()
      }
    },
    watch: {
      selectedFile(n) {
        if (n === 'UNSELECTED') return
        else {
          this.study.files.push(this.selectedFile)
          this.selectedFile = 'UNSELECTED'
        }
      }
    },
    methods: {
      requestPublish(id) {
        this.$store.dispatch('studyRequests/add', id)
      },
      undoRequest(id) {
        this.$store.dispatch('studyRequests/remove', id)
      },
      publishRequested(id) {
        return this.$store.getters['studyRequests/requested'](id)
      },
      download(id) {
        download(id)
      }
    }

  }

</script>

<style>

.assignment-tables {
  display: flex;
  justify-content: space-around;
  align-items: top;
}

</style>