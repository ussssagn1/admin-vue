export const operations = {
    state: () => ({
        data: []
    }),
    mutations: {
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {},
}