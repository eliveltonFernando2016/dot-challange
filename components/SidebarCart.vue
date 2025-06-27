<template>
  <USlideover
      title="Meu Carrinho"
      close-icon="ph:x"
      :close="{
        color: 'primary',
        variant: 'soft',
        size: 'xl'
      }"
      :ui="{
        content: 'max-w-[40%]',
        footer: 'block'
      }"
  >
    <UChip :text="cartStore.getQuantity" size="3xl" :ui="{ base: 'size-5 ring-0' }">
      <UButton icon="ph:shopping-cart" variant="soft" class="text-3xl" color="primary" />
    </UChip>

    <template #body>
      <div v-if="cartStore.getQuantity === 0">
        <p class="text-center text-2xl">Seu carrinho está vazio!</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-y-8">
        <ItemSidebar v-for="(item, index) in cartStore.cart" :movie="item" :key="index" is-cart />
      </div>
    </template>
    <template #footer="{ close }">
      <div class="w-full flex items-center justify-between">
        <p class="text-xl font-bold">Total:</p>
        <p class="text-xl">{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartStore.getTotal) }}</p>
      </div>
      <div class="flex gap-x-4 mt-4">
        <UModal
          :dismissible="false"
          title="Esvaziar Carrinho"
          close-icon="ph:x"
          :ui="{
            footer: 'justify-center'
          }"
        >
          <UButton :disabled="cartStore.getQuantity === 0" label="Esvaziar Carrinho" block color="neutral" class="w-full" size="xl" />

          <template #body>
            <p class="text-xl">Tem certeza que deseja esvaziar o carrinho?</p>
          </template>

          <template #footer="{ close }">
            <UButton label="Cancelar" color="neutral" icon="ph:x" variant="soft" @click="close" />
            <UButton label="Confirmar" variant="soft" icon="ph:check" color="success" @click="() => { cartStore.clearCart(); close() }" />
          </template>
        </UModal>
        <UButton :disabled="cartStore.getQuantity === 0" to="/checkout" label="Finalizar Compra" block color="success" class="w-full" size="xl" @click="close" />
      </div>
    </template>
  </USlideover>
</template>
<script setup lang="ts">
const cartStore = useCartStore()

function checkout() {

}
</script>