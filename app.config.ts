export default defineAppConfig({
    toaster: {
        position: 'top-right' as const,
    },
    ui: {
        button: {
            slots: {
                base: ['cursor-pointer'],
            }
        }
    }
})