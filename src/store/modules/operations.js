const prefix = 'operations'

export const operations = {
    state: () => ({
        income: 0,
        consumption: 0,
        result: 0,
        data: []
    }),
    mutations: {
        setData(state, payload) { //
            state.data = payload

            const income = payload.filter(({ amount }) => amount > 0)     // в общем, создаються массив объектов, в котором income - числа больше нуля,
            income.forEach(e => {
                state.income += e.amount
            })
            const consumption = payload.filter(({ amount }) => amount < 0) // а consuption - меньше
            consumption.forEach(e => {
                state.consumption += e.amount
            })
            state.result = new Intl.NumberFormat('eu-US').format(state.income - state.consumption)
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