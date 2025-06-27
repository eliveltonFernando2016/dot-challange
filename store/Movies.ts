export const useMoviesStore = defineStore('movies', () => {
    const { $http} = useNuxtApp()
    const movies = ref<Movie[]>([])
    const genres = ref<Genre[]>([])
    const toast = useToast()
    const loadingMovies = ref<boolean>(true)
    const totalMovies = ref<number>(0)
    const search = ref<string>('')

    const getMovies = (): Movie[] => {
        return movies.value
    }
    const getGenres = (): Genre[] => {
        return genres.value
    }
    const getGenreNames = (ids: number[]): string[] => {
        return ids.map(id => {
            const genre = genres.value.find(g => g.id === id)
            return genre ? genre.name : null
        }).filter(Boolean) as string[]
    }

    const setGenres = async () => {
        await $http.get('/genre/movie/list?language=pt-BR').then((response) => {
            genres.value = response.data.genres
        }).catch((error) => {
            toast.add({
                title: 'Erro',
                color: 'error',
                description: error,
                icon: 'ph:x'
            })
        })
    }
    const setMovies = async (currentPage: number) => {
        loadingMovies.value = true
        await $http.get('/discover/movie?include_adult=false&language=pt-BR&page=' + currentPage).then((response) => {
            const mappedResults = response.data.results.map((movie: Movie) => ({
                ...movie,
                backdrop_path: movie.backdrop_path ? 'https://image.tmdb.org/t/p/w200' + movie.backdrop_path : null,
                poster_path: movie.poster_path ? 'https://image.tmdb.org/t/p/w200' + movie.poster_path : null,
                release_date: new Date(movie.release_date).toLocaleDateString('pt-BR'),
                price: (Math.random() * 90 + 10).toFixed(2),
            }))
            totalMovies.value = response.data.total_results
            movies.value = mappedResults
        }).catch((error) => {
            toast.add({
                title: 'Erro',
                color: 'error',
                description: error,
                icon: 'ph:x'
            })
        }).finally(() => {
            loadingMovies.value = false
        })
    }

    const searchMovies = async (currentPage: number) => {
        loadingMovies.value = true
        await $http.get('/search/movie?query='+ search.value +'&include_adult=false&language=pt-BR&page=' + currentPage).then((response) => {
            const mappedResults = response.data.results.map((movie: Movie) => ({
                ...movie,
                backdrop_path: movie.backdrop_path ? 'https://image.tmdb.org/t/p/w200' + movie.backdrop_path : null,
                poster_path: movie.poster_path ? 'https://image.tmdb.org/t/p/w200' + movie.poster_path : null,
                release_date: new Date(movie.release_date).toLocaleDateString('pt-BR'),
                price: (Math.random() * 90 + 10).toFixed(2),
            }))
            totalMovies.value = response.data.total_results
            movies.value = mappedResults
        }).catch((error) => {
            toast.add({
                title: 'Erro',
                color: 'error',
                description: error,
                icon: 'ph:x'
            })
        }).finally(() => {
            loadingMovies.value = false
        })
    }

    onMounted(async () => {
        await setGenres()
    })

    watch(search, async (newValue) => {
        if (newValue === '') {
            await setMovies(1)
        }
    })

    return {
        totalMovies,
        loadingMovies,
        search,
        getMovies,
        setMovies,
        getGenres,
        getGenreNames,
        searchMovies,

    }
})
