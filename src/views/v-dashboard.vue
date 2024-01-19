<script setup>
import {useStore} from 'vuex'
import Chart from "primevue/chart";
import {computed, onMounted, reactive, ref, watch} from "vue";

const store = useStore()
const data = computed(() => store.state.operations.data)
const result = ref(0)
const state = reactive({
  income: 0,
  consuption: 0
})

function loadingData (newValue) {
  if(newValue.length) {
    const income = newValue.filter(({ amount }) => amount > 0)     // в общем, создаються массив объектов, в котором income - числа больше нуля,
    income.forEach(e => {
      state.income += e.amount
    })
    const consuption = newValue.filter(({ amount }) => amount < 0) // а consuption - меньше
    consuption.forEach(e => {
      state.consuption += e.amount
    })
    result.value = new Intl.NumberFormat('eu-US').format(state.income - state.consuption)
  }
}
onMounted(() => {
  loadingData(data.value)
})



const chartData = reactive({
  labels: ['Income ', 'Expense'],
  datasets: [
    {
      data: [computed(() => state.income), computed(() => state.consuption)],
      backgroundColor: ['#2DB370', '#73D8FF']
    }
  ]
})
const lightOptions = reactive({
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF'
      }
    }
  }
})

</script>

<template>
  <div>
    <div :class="$style.chart">
      <Chart  type="doughnut" :data="chartData" :options="lightOptions"/>
      {{ result }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .chart {
    max-width: 600px;
    margin: 0 auto;
  }
</style>