<template>
  <UCard
    variant="outline"
    :ui="{
      root: 'rounded-none rounded-b-md',
      header: '!p-0',
      body: '!border-b-0',
      footer: '!p-0 !border-t-0'
    }"
  >
    <template #header>
      <div class="relative">
        <UButton
          @click="favoriteStore.handleFavorite(props.movie)"
          :icon="favoriteStore.favorites.some(fav => fav.id === props.movie.id) ? 'ph:heart-fill' : 'ph:heart'"
          variant="soft"
          class="text-2xl absolute right-1 top-1 rounded-full"
          color="error"
        />
        <p class="absolute text-center w-full bottom-2">{{ props.movie.release_date }}</p>
        <NuxtImg
          :src="props.movie.backdrop_path"
          :alt="props.movie.title"
          class="w-full"
          :custom="true"
          v-slot="{ src, isLoaded, imgAttrs }"
        >
          <img
            v-if="isLoaded"
            v-bind="imgAttrs"
            :src="src"
          />
          <img
            v-else
            src="https://placehold.co/500x283?text=Hello+World"
            alt="placeholder"
          />
        </NuxtImg>
      </div>
    </template>

    <p class="text-center text-lg font-bold min-h-[56px]">{{ props.movie.title }}</p>
    <div class="flex items-center justify-around mt-3">
      <div class="flex items-center gap-x-2">
        <Icon name="ph:star" class="text-yellow-500" />
        {{ props.movie.vote_average.toFixed(1) }}
      </div>

      <p>{{ movieStore.getGenreNames(props.movie.genre_ids)[0] }}</p>
    </div>

    <p class="text-center pt-3 text-lg">{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.movie.price) }}</p>

    <template #footer>
      <UButton
        class="w-full"
        size="xl"
        :icon="verifyCart(props.movie.id) ? 'ph:check' : 'ph:basket'"
        block
        :disabled="verifyCart(props.movie.id)"
        @click="cartStore.addToCart(props.movie)"
      >
        {{ verifyCart(props.movie.id) ? 'Adicionado' : 'Adicionar' }}
      </UButton>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
const movieStore = useMoviesStore()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

function verifyCart(id: string) {
  return cartStore.cart.some(item => item.id === id)
}
</script>