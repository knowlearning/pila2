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
    <GroupAssigner
      :id="id"
      :groups="$store.getters['groups/groups']('class')"
    />
  </div>
  <div v-else>
    ...
  </div>
</template>

<script>
  import GroupAssigner from './group-assigner.vue'
  import ContentName from './content-name.vue'
  import download from './download.js'

  export default {
    components: {
      ContentName,
      GroupAssigner
    },
    props: {
      id: String
    },
    data() {
      return {
        study: null
      }
    },
    async created() {
      const { authority, assignment_id } = this.$store.getters['assignments/get'](this.id)
      this.study = await Agent.state(assignment_id, authority)
    },
    methods: {
      download(id) { download(id) }
    }
  }

</script>