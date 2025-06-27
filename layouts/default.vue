<template>
  <UApp :toaster="{
    position: 'top-right',
  }">
    <Header />
    <main>
      <slot />
    </main>
  </UApp>
</template>
<script setup lang="ts">

</script>