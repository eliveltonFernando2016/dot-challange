<template>
  <div class="bg-[#d1f0ec] py-4">
    <UContainer as="header" class="flex items-center justify-between">
      <NuxtLink to="/" class="text-primary font-bold text-3xl">LOGO</NuxtLink>
      <UInput
          v-model="moviesStore.search"
          type="search"
          placeholder="Pesquisa"
          trailing-icon="ph:magnifying-glass"
          size="xl"
          class="w-100"
          @keyup.enter="moviesStore.searchMovies(1)"
      />
      <div class="flex items-center justify-between gap-x-2">
        <SidebarFavorite />
        <SidebarCart />
      </div>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
const moviesStore = useMoviesStore()
</script>