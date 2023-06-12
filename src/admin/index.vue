<template>
  <h1>ADMIN VIEW!!!!!!!!!!!!!!</h1>
  <div>
    {{ $store.getters['requestedRoles/requests']() }}
  </div>
</template>

<script>

  export default {}

</script>