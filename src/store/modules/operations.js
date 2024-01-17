const prefix = 'operations'

export const operations = {
    state: () => ({
        data: []
    }),
    mutations: {
        setData(state, payload) { //
            state.data = payload
        }
    },
    getters: {
        [`${prefix}_getData`]: state => { // динамические названия свойств
            return state.data
        }
    },
    actions: {
        async reqBase() { // подцепимся к localStorage - ВДРУГ ЧТО ДОБАВИТЬ АРГУМЕНТ {}, {}
            setTimeout(() => {
                console.log(localStorage.get('operations'))
            }, 300)
        }
    },
}