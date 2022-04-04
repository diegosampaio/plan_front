import { createApp } from 'vue'
import Toast from 'vue-toastification'
import VueTheMask from 'vue-the-mask'


import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import "vue-toastification/dist/index.css";



const app = createApp(App)

app.use(router)
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
})
app.use(VueTheMask)
app.mount('#app')
