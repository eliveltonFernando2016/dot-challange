<template>
  <div class="grid grid-cols-6 gap-x-2 items-center justify-between w-full">
    <div class="col-span-4 flex items-center gap-x-4">
      <NuxtImg
        provider="aliyun"
        :src="props.movie.backdrop_path"
        :alt="props.movie.title"
        class="w-15"
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
      <p class="sm:text-sm md:text-base">{{ props.movie.title }}</p>
    </div>
    <p class="text-center">{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.movie.price) }}</p>
    <div class="text-right">
      <UTooltip v-if="!props.isCart" text="Adicionar aos carrinho" :delay-duration="0">
        <UButton icon="ph:shopping-cart" variant="ghost" size="xl" color="primary" @click="cartStore.addToCart(props.movie as Movie)" />
      </UTooltip>
      <UModal
        :dismissible="false"
        :title="props.isCart ? 'Remover do Carrinho' : 'Remover favorito'"
        close-icon="ph:x"
        :ui="{
          footer: 'justify-center'
        }"
      >
        <UTooltip text="Remover dos favoritos" :delay-duration="0">
          <UButton icon="ph:trash" variant="ghost" size="xl" color="error" />
        </UTooltip>

        <template #body>
          <p class="text-xl">Tem certeza que deseja remover <b class="text-primary">{{ props.movie.title }}</b> {{ props.isCart ? 'do carrinho' : 'dos favoritos' }}?</p>
        </template>

        <template #footer="{ close }">
          <UButton label="Cancelar" color="neutral" icon="ph:x" variant="soft" @click="close" />
          <UButton label="Confirmar" variant="soft" icon="ph:check" color="error" @click="() => { props.isCart ? cartStore.removeFromCart(props.movie.id) : favoriteStore.handleFavorite(props.movie); close() }" />
        </template>
      </UModal>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  isCart: {
    type: Boolean,
    required: false,
    default: false,
  }
})
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
</script>