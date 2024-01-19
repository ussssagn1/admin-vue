<script setup>
import {useStore} from 'vuex'
import Chart from "primevue/chart";
import {computed} from "vue";

const store = useStore()
const state = computed(() => store.state.operations)
const chart = computed(() => {
  return {
    chartData: {
      labels: ['Income ', 'Expense'],
      datasets: [
        {
          data: [state.value.income, state.value.consumption],
          backgroundColor: ['#2DB370', '#73D8FF']
        }
      ]
    },
    lightOptions: {
      plugins: {
        legend: {
          labels: {
            color: '#FFFFFF'
          }
        }
      }
    }

  }
})


</script>

<template>
  <div>
    <div :class="$style.chart">
      <Chart  type="doughnut" :data="chart.chartData" :options="chart.lightOptions"/>
      {{ state.result }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .chart {
    max-width: 600px;
    margin: 0 auto;
  }
</style>