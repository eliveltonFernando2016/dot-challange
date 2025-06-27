export const useCartStore = defineStore('cart', () => {
    const toast = useToast()
    const cart = ref<Movie[]>(JSON.parse(localStorage.getItem('cart') || '[]'))

    const getCart = computed(() => cart.value)
    const getQuantity = computed(() => {
        return cart.value.reduce((count, item) => {
            return count + (item.quantity || 1)
        }, 0)
    })
    const getTotal = computed(() => {
        return cart.value.reduce((total, item) => {
            return total + (Number(item.price) * (item.quantity || 1))
        }, 0)
    })

    const addToCart = (item: Movie) => {
        cart.value.push(item)
        localStorage.setItem('cart', JSON.stringify(cart.value))
        toast.add({
            title: 'Adicionado ao Carrinho',
            color: 'success',
            description: `${item.title} foi adicionado ao carrinho.`,
            icon: 'ph:check'
        })
    }

    const clearCart = () => {
        cart.value = []
        localStorage.setItem('cart', JSON.stringify([]))
        toast.add({
            title: 'Esvaziar Carrinho',
            color: 'success',
            description: 'Carrinho esvaziado com sucesso.',
            icon: 'ph:check'
        })
    }

    const removeFromCart = (id: number) => {
        const index = cart.value.findIndex(item => item.id === id)
        if (index !== -1) {
            toast.add({
                title: 'Remover do Carrinho',
                color: 'success',
                description: cart.value[index].title + 'foi Removido do carrinho.',
                icon: 'ph:check'
            })
            cart.value.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart.value))
        }
    }

    watch(cart, (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart))
    }, { deep: true })

    return {
        cart,
        getCart,
        addToCart,
        getTotal,
        getQuantity,
        clearCart,
        removeFromCart,
    }
})