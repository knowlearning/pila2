<template>
  <MyContent expertEditing />
  <ExpertContent expertEditing />
</template>

<script>
  import MyContent from '../../my-content.vue'
  import ExpertContent from '../../expert-content.vue'
  import ContentName from '../../components/content-name.vue'
  import UserInfo from '../../components/user-info.vue'

  export default {
    components: {
      MyContent,
      ExpertContent,
      ContentName,
      UserInfo
    },
    computed: {
      myContent() {
        return this.$store.getters['myContent/myContent']()
      },
      expertContent() {
        return this.$store.getters['expertContent/expertContent']()
      }
    },
    methods: {
      addContent() {
        const id = prompt('Enter a content id')
        this.$store.dispatch('myContent/add', id)
      },
      toggleExpert(id) {
        this.$store.dispatch('expertContent/toggleExpert', id)
      },
      remove(id) {
        this.$store.dispatch('myContent/remove', id)
      }
    }
  }
  
</script>