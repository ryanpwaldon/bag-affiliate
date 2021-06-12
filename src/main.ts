import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import { createApp } from 'vue'

export default createApp(App).use(router).mount('#app')
