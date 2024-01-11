import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import ToastService from "primevue/toastservice";

/*Стили*/
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/md-dark-indigo/theme.css'
import './assets/ scss/main.scss';

/*App - сущности/подключение */
import App from "./App.vue";
import router from "./router";
import store from "./store";


/*Create - сущности*/
const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue, {ripple: true})
app.use(ToastService)
app.directive('ripple', Ripple)


app.mount("#app");
