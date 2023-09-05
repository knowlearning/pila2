<template>
  <h1>My Content</h1>
  <TaggedContent type="tracked" />
  <h1>Expert Content</h1>
  <TaggedContent type="expert" />
</template>

<script>
  import TaggedContent from './tagged-content.vue'

  export default {
    components: {
      TaggedContent
    }
  }
  
</script>