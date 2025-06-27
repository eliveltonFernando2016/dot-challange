<template>
  <UContainer class="my-8">
    <h1 class="text-2xl pb-8">Finalizar Compra</h1>
    <UForm @submit="onSubmit" :schema="schema" :state="state" class="grid sm:grid-cols-1 md:grid-cols-2 gap-20">
      <div>
        <div class="grid grid-cols-2 gap-6">
          <UFormField name="name" class="col-span-2" label="Nome completo">
            <UInput v-model="state.name" placeholder="" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="cpf" label="CPF">
            <UInput v-model="state.cpf" v-maska="'###.###.###-##'" placeholder="000.000.000-00" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="phone" label="Telefone">
            <UInput v-model="state.phone" v-maska="'(##) # ####-####'" type="tel" placeholder="(00) 0 0000-0000" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="email" class="col-span-2" label="E-mail">
            <UInput v-model="state.email" type="email" placeholder="example@example.com" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="cep" label="CEP">
            <UInput v-model="state.cep" v-maska="'#####-###'" placeholder="00000-000" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="address" label="Endereço">
            <UInput v-model="state.address" placeholder="" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="city" label="Cidade">
            <UInput v-model="state.city" placeholder="" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
          <UFormField name="state" label="Estado">
            <UInput v-model="state.state" placeholder="" size="xl" class="w-full" :ui="{ base: 'peer' }" />
          </UFormField>
        </div>
      </div>
      <div>
        <div v-if="cartStore.getQuantity === 0">
          <p class="text-center text-2xl">Seu carrinho está vazio!</p>
        </div>
        <div v-else class="grid grid-cols-1 gap-y-8">
          <ItemSidebar v-for="(item, index) in cartStore.cart" :movie="item" :key="index" is-cart />
        </div>
        <USeparator class="mt-8" />
        <div class="w-full flex items-center justify-between mt-8">
          <p class="text-xl font-bold">Total:</p>
          <p class="text-xl">{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartStore.getTotal) }}</p>
        </div>
        <UButton :disabled="cartStore.getQuantity === 0" type="submit" label="Finalizar" block class="w-full mt-8" size="xl" />
      </div>
    </UForm>
  </UContainer>
</template>
<script setup lang="ts">
import * as z from 'zod'
import { vMaska } from 'maska/vue'
import type { FormSubmitEvent } from '@nuxt/ui'

useHead({
  title: 'Checkout',
})

const cartStore = useCartStore()
const toast = useToast()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  cpf: undefined,
  phone: undefined,
  email: undefined,
  cep: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
})

const schema = z.object({
  name: z.string().min(5,'Nome inválido'),
  cpf: z.string().refine(val => cpfValidator(val), { message: 'CPF inválido' }),
  phone: z.string().min(16, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),
  cep: z.string().min(9, 'CEP inválido'),
  address: z.string(),
  city: z.string(),
  state: z.string(),
})

watch(() => state.cep, async (cep) => {
  if (cep !== undefined && cep.toString().length === 9) {
    const { address, city, state: uf } = await fetchAddressByCep(cep.toString())
    state.address = address
    state.city = city
    state.state = uf
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Obrigado Uzumaki Naruto!',
    description: 'Sua compra foi finalizada com sucesso!',
    color: 'success',
    duration: 4000
  })

  setTimeout(() => {
    state.name = undefined
    state.cpf = undefined
    state.phone = undefined
    state.email = undefined
    state.cep = undefined
    state.address = undefined
    state.city = undefined
    state.state = undefined

    cartStore.clearCart()
  }, 4000)

  console.log(event.data)
}
</script>