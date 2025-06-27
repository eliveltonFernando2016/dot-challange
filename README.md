# Projeto com Nuxt.js

Este projeto foi construído usando [Nuxt 3](https://nuxt.com), aproveitando sua arquitetura moderna baseada em Vue 3, suporte nativo a SSR e sistema de rotas automáticas, que simplifica a criação de aplicações performáticas e escaláveis.

## 📦 Por que Nuxt.js?

- Facilita a configuração de aplicações Vue com suporte a server-side rendering (SSR) e static site generation (SSG).
- Estrutura de pastas baseada em convenção, acelerando o desenvolvimento.
- Ecossistema robusto, com suporte oficial para plugins, middleware e módulos de comunidade.

## 🔥 Gerenciamento de estado com Pinia

Utilizamos [Pinia](https://pinia.vuejs.org/) como store global do projeto, por ser a solução oficial de gerenciamento de estado do Vue 3, totalmente compatível com a Composition API, leve, modular e com excelente integração em SSR.

Exemplo de uso:
```ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const addToCart = (item) => cart.value.push(item)
  return { cart, addToCart }
})
```

## 🛠 Composables

A aplicação faz uso intensivo de **composables**, funções reutilizáveis criadas dentro do diretório `composables/`. Essa abordagem permite compartilhar lógica entre componentes, mantendo o código limpo, organizado e fácil de manter.

Exemplo:
```ts
export function useFormatCurrency() {
  const format = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  return { format }
}
```

## 🔗 Plugin Axios

A comunicação com APIs externas é feita usando o plugin personalizado do [Axios](https://axios-http.com/), configurado no diretório `plugins/axios.ts`. Isso permite centralizar a configuração de baseURL, interceptadores e tratar autenticação ou headers globais de forma padronizada.

Exemplo de uso em composable ou store:
```ts
const { $http } = useNuxtApp()
const response = await $http.get('/endpoint')
```

## 🚀 Scripts disponíveis

Instalar dependências:
```bash
npm install
```

Rodar servidor de desenvolvimento:
```bash
npm run dev
```

Build para produção:
```bash
npm run build
```

Visualizar build de produção localmente:
```bash
npm run preview
```

---

Para mais informações, consulte a [documentação oficial do Nuxt](https://nuxt.com/docs).
