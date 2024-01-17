<script setup>
import {useStore} from 'vuex'
import Chart from "primevue/chart";

const store = useStore()

const data = store.state.operations.data
console.log(data)

const chartData = {
  labels: ['Income ', 'Expense'],
  datasets: [
    {
      data: [300, 50],
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
  </div>
</template>

<style lang="scss" module>
  .chart {
    max-width: 600px;
    margin: 0 auto;
  }
</style>