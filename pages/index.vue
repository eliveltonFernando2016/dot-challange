<template>
  <LoadingOverlay
      :active="movieStore.loadingMovies"
      :is-full-page="true"
      color="#7367f0"
  />
  <UContainer>
    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
      <CardMovie v-for="item in movies" :movie="item" :key="item.id" />
      <UPagination
          v-model:page="page"
          :total="movieStore.totalMovies"
          :items-per-page="20"
          :show-controls="false"
          size="xl"
          class="md:col-span-3 lg:col-span-4 flex justify-center"
      />
    </div>
  </UContainer>
</template>
<script setup lang="ts">
useHead({
  title: 'Home',
})
const movieStore = useMoviesStore()
const page = ref<number>(1)

const movies = computed({
  get() {
    return movieStore.getMovies()
  },
  set(value:number) {
    if (movieStore.search !== '')
      movieStore.searchMovies(value)
    else
      movieStore.setMovies(value)
  },
})
onMounted(async () => {
  movies.value = page.value
})
watch(page, (newValue) => {
    movies.value = newValue
})
</script>