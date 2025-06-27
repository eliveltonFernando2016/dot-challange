export const fetchAddressByCep = async (cep: string): Promise<{ address: string, city: string, state: string }> => {
    const toast = useToast()
    const { $http } = useNuxtApp()

    let address = ''
    let city = ''
    let state = ''

    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8)
        return {
            address,
            city,
            state,
        }

    await $http.get('https://viacep.com.br/ws/' + cleanCep +'/json/').then((response) => {
        if (response.data.erro === 'true')
            toast.add({
                title: 'Erro',
                description: 'CEP não encontrado.',
                color: 'error'
            })
        address = response.data.logradouro
        city = response.data.localidade
        state = response.data.uf
    }).catch((error) => {
        console.error(error)
        toast.add({
            title: 'Erro',
            description: error,
            color: 'error'
        })
    })

    return {
        address,
        city,
        state,
    }
}