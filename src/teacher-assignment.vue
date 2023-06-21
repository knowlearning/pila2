<template>
  <h1>
    <ScopeValue :scope="id" :path="['name']" />
  </h1>
  {{ $store.getters['groups/groups']('class') }}
  <GroupAssigner
    :id="id"
    :groups="$store.getters['groups/groups']('class')"
  />
</template>

<script>
  import ScopeValue from './scope-value.vue'
  import GroupAssigner from './group-assigner.vue'

  export default {
    props: {
      id: String
    },
    components: {
      ScopeValue,
      GroupAssigner
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