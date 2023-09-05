<template>
  <MyContent expertEditing />
  <h1>Expert Content</h1>
  <TaggedContent type="expert" />
</template>

<script>
  import MyContent from '../../my-content.vue'
  import TaggedContent from '../../components/tagged-content.vue'

  export default {
    components: {
      MyContent,
      TaggedContent
    }
  }
  
</script>