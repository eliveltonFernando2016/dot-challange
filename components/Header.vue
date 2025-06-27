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
          class="w-100 hidden md:block"
          @keyup.enter="handleSearch"
      />
      <div class="flex items-center justify-between gap-x-2">
        <UButton
            @click="showInputSearch = !showInputSearch"
            icon="ph:magnifying-glass"
            color="info"
            variant="soft"
            class="text-3xl md:hidden"
        />
        <SidebarFavorite />
        <SidebarCart />
      </div>
    </UContainer>
    <UContainer v-if="showInputSearch" class="mt-2">
      <UInput
          v-model="moviesStore.search"
          type="search"
          placeholder="Pesquisa"
          trailing-icon="ph:magnifying-glass"
          size="xl"
          class="block md:hidden"
          @keyup.enter="handleSearch"
      />
    </UContainer>
  </div>
</template>
<script setup lang="ts">
const moviesStore = useMoviesStore()
const showInputSearch = ref<boolean>(false)
const router = useRouter()

function handleSearch() {
  moviesStore.searchMovies(1)
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}
</script>