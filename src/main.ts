import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from 'axios'
import dayjs from 'dayjs'

import "./icons" // icon
// ui-framework
import '@/assets/styles/index.css'

import extensions from './extensions'

const app = createApp(App)

axios.defaults.baseURL = 'https://dog.ceo/api/'
app.provide('$axios', axios)
app.provide('dayjs', dayjs)
extensions(app)

app.use(store)
app.use(router)
app.mount('#app')
