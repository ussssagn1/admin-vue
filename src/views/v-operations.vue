<script setup>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import {useStore} from "vuex";
  import dateFormat from "dateformat";
  import {computed} from "vue";

  const store = useStore()

  const data = computed(() => store.state.operations.data) //store - экземпляр, state - объект Stora,
  const getterData = store.getters.getData // ПРОБЛЕМА - если я использую эту функцию в конкретном файле, то в остальных я использовать её не смогу - возвратит 0
  const getterDataNew = store.getters.operations_getData // из-за того что мы добавили operations namespaced: true, всё работает коректно, обязательно нужно добавлять название модуля
  console.log('Data: ', data)
  console.log('getterData: ', getterData)
  console.log('getterDataNew: ', getterDataNew)

</script>

<template>
  <div class="_container mt-4">
    <DataTable v-if="data.length" :value="data" responsive-layout="scroll">
      <column header="Date operations">
        <template #body="slotProps">
          {{ dateFormat(slotProps.data.date, 'dd, mmmm, yyyy') }}
        </template>
      </column>
      <column field="place" header="Place"></column>
      <column field="category" header="Category"></column>
      <column field="amount" header="Amount"></column>
      <column field="card" header="Card"></column>
      <column field="description" header="Description"></column>
    </DataTable>
    <span v-else>Loading...</span>
  </div>
</template>

<style></style>