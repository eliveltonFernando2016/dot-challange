export const useFavoriteStore = defineStore('favorite', () => {
    const favorites = ref<Movie[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))
    const toast = useToast()

    const handleFavorite = (movie: Movie) => {
        const index = favorites.value.findIndex(fav => fav.id === movie.id)
        if (index !== -1) {
            favorites.value.splice(index, 1)
            toast.add({
                title: 'Removido dos favoritos',
                color: 'error',
                description: `${movie.title} foi removido da sua lista de favoritos.`,
                icon: 'ph:heart-break'
            })
        } else {
            favorites.value.push(movie)
            toast.add({
                title: 'Adicionado aos favoritos',
                color: 'success',
                description: `${movie.title} foi adicionado à sua lista de favoritos.`,
                icon: 'ph:heart'
            })
        }
    }

    watch(favorites, (newFavorites) => {
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }, { deep: true })

    return {
        favorites,
        handleFavorite,
    }
})