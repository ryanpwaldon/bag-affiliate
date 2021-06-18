import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import { createApp } from 'vue'
import store from './store/store'

export default createApp(App).use(store).use(router).mount('#app')
