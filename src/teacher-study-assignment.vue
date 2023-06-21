<template>
  <div v-if="study">
    <h1>
      {{ study.name }}
    </h1>
    Content: 
    {{ study.content }}
    <p>
      {{ study.description }}
    </p>
    <div>
      Files
      <ul>
        <li v-for="id in study.files">
          <button @click="download(id)">download</button>
          <ContentName :id="id" />
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    ...
  </div>
</template>

<script>
import ContentName from './content-name.vue'
import download from './download.js'

export default {
  components: {
    ContentName
  },
  props: {
    assignment_id: String,
    assigner_id: String
  },
  data() {
    return {
      study: null
    }
  },
  async created() {
    this.study = await Agent.state(this.assignment_id, this.assigner_id)
  },
  download(id) { download(id) }
}

</script>