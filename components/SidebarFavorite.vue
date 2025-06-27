<template>
  <USlideover
      title="Meus Favoritos"
      close-icon="ph:x"
      :close="{
        color: 'primary',
        variant: 'soft',
        size: 'xl'
      }"
      :ui="{
        content: 'sm:max-w-full md:max-w-[40%]'
      }"
  >
    <UTooltip text="Favoritos" :delay-duration="0">
      <UButton icon="ph:heart" variant="soft" class="text-3xl" color="error" />
    </UTooltip>
    <template #body>
      <div v-if="favoriteStore.favorites.length === 0">
        <p class="text-center text-2xl">Ainda não há favoritos!</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-y-8">
        <ItemSidebar v-for="(item, index) in favoriteStore.favorites" :movie="item" :key="index" />
      </div>
    </template>
  </USlideover>
</template>
<script setup lang="ts">
const favoriteStore = useFavoriteStore()
</script>