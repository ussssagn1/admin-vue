<script setup>
  import {reactive, ref} from "vue";
  import { useVuelidate } from '@vuelidate/core';
  import { required } from "@vuelidate/validators";
  import {useStore} from "vuex";
  // import XLSX from 'xlsx'

  import Button from "primevue/button";
  import Sidebar from "primevue/sidebar";
  import Calendar from "primevue/calendar";
  import InputText from "primevue/inputtext";
  import InputNumber from "primevue/inputnumber";
  import Dropdown from "primevue/dropdown";
  import Textarea from "primevue/textarea";
  // import FileUpload from "primevue/fileupload";


  // ref - для переменных
  // reactive - для объектов которые не перезаписываються
  const store = useStore()
  const defaultModel = {
    date: null,
    place: null,
    category: null,
    amount: null,
    card: null,
    description: null
  }
  const data = reactive(JSON.parse(localStorage.getItem('operations') || '[]'))

  setTimeout(() => {
    store.commit('setData', data)
  }, 600)
  const isShow = ref(false)
  const model = ref({...defaultModel})

  const rule = {
    date: [required],
    place: [required],
    category: [required],
    amount: [required],
    card: [required],
    description: [required]
  }
  const cards = [
    { value: '*5679', label: 'Mono'},
    { value: '*9874', label: 'Sber'},
  ]



  const v$ = useVuelidate(rule, model)
  const handleSubmit = (invalid) => {
    v$.value.$touch()
    if(invalid) {
      console.log('Invalid')
      return
    }
    v$.value.$reset()
    data.push(model.value)
    model.value = {...defaultModel}
    store.commit('setData', data)
    localStorage.setItem('operations', JSON.stringify(data))
  }

</script>

<template>
  <header :class="$style.header" class="bg-teal-600" >

    <div class="_container py-5 flex justify-content-between align-items-center">
      <router-link :to="{ name: 'Dashboard' }" class="text-black-alpha-90 text-xl uppercase">
        <img class="w-2 h-2" src="/v-logo.svg" alt="">
      </router-link>
      <div class="flex gap-8 align-items-center">
        <router-link :to="{ name: 'Dashboard' }" :active-class="$style.active" class="text-lg font-bold">Dashboard</router-link>
        <router-link :to="{ name: 'Operations' }" :active-class="$style.active" class="text-lg font-bold">Operations</router-link>
        <Button class="p-3 bg-teal-800 hover:bg-black-alpha-20 text-white" label="Add operation" @click="isShow = !isShow"/>
      </div>
    </div>

  </header>

  <router-view />
  <Sidebar v-model:visible="isShow" position="right">
    <form @submit.prevent="handleSubmit(v$.$invalid)">
      <div class="p-float-label mb-4">
        <Calendar
            id="date"
            class="w-full "
            :class="{'p-invalid' : v$.date.$invalid && v$.date.$dirty}"
            v-model="v$.date.$model"
            @blur="v$.date.$touch()"
        />
        <label for="date">Date operation</label>
      </div>
      <div class="p-float-label mb-4">
        <InputText
            id="place"
            class="w-full "
            :class="{'p-invalid' : v$.place.$invalid && v$.place.$dirty}"
            v-model="v$.place.$model"
            @blur="v$.place.$touch()"
        />
        <label for="place">Place</label>
      </div>
      <div class="p-float-label mb-4">
        <InputText
            id="category"
            class="w-full "
            :class="{'p-invalid' : v$.category.$invalid && v$.category.$dirty}"
            v-model="v$.category.$model"
            @blur="v$.category.$touch()"
        />
        <label for="category">Category</label>
      </div>
      <div class="p-float-label mb-4">
        <InputNumber
            id="amount"
            class="w-full  "
            :class="{'p-invalid' : v$.amount.$invalid && v$.amount.$dirty}"
            v-model="v$.amount.$model"
            @blur="v$.amount.$touch()"
            mode="decimal"
            locale="eu-US"
            :min-fraction-digits="2"
        />
        <label for="amount">Amount</label>
      </div>
      <div class="p-float-label mb-4">
        <Dropdown
            id="card"
            class="w-full  "
            :options="cards"
            option-label="label"
            option-value="value"
            :class="{'p-invalid' : v$.card.$invalid && v$.card.$dirty}"
            v-model="v$.card.$model"
            @blur="v$.card.$touch()"
        />
        <label for="card">Card</label>
      </div>
      <div class="p-float-label mb-4">
        <Textarea
            id="description"
            class="w-full"
            :class="{'p-invalid' : v$.description.$invalid && v$.description.$dirty}"
            v-model="v$.description.$model"
            @blur="v$.description.$touch()"
            :autoResize="true"
            rows="2"
        />
        <label for="description">Description</label>
      </div>
      <Button label="Send operation" type="submit" class="bg-teal-500"></Button>
    </form>
<!--    <FileUpload mode="basic" name="file[]" :custom-upload="true" @uploader="parseCSV" class="mt-3 bg-teal-500"/>-->
  </Sidebar>
</template>

<style lang="scss" module>
  .header {
    position: relative;
  }
  .active {
    color: #50e19b;
  }
</style>
