<script setup>
import {useStore} from 'vuex'
import Chart from "primevue/chart";
import {computed, reactive } from "vue";

const store = useStore()
const state = reactive({
  income: null,
  consuption: null
})

const data = computed(() => {
  const income = store.state.operations.data.filter(({ amount }) => amount > 0)     // в общем, создаються массив объектов, в котором income - числа больше нуля,
  income.forEach(e => {
    state.income += e.amount
  })
  const consuption = store.state.operations.data.filter(({ amount }) => amount < 0) // а consuption - меньше
  consuption.forEach(e => {
    state.consuption += e.amount
  })
  return [income, consuption]
})
console.log(data.value)
console.log(state)

const chartData = {
  labels: ['Income ', 'Expense'],
  datasets: [
    {
      data: [state.income, state.consuption],
      backgroundColor: ['#2DB370', '#73D8FF']
    }
  ]
}
const lightOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF'
      }
    }
  }
}

</script>

<template>
  <div>
    <Chart :class="$style.chart" type="doughnut" :data="chartData" :options="lightOptions"/>
    {{ state.income + state.consuption}}
  </div>
</template>

<style lang="scss" module>
  .chart {
    max-width: 600px;
    margin: 0 auto;
  }
</style>