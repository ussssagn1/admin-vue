<script setup>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import {useStore} from "vuex";
  import dateFormat from "dateformat";

  const store = useStore()
  const data = store.state.operations.data
</script>

<template>
  <div class="_container mt-4">
    <DataTable :value="data" responsive-layout="scroll">
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
  </div>
</template>

<style></style>