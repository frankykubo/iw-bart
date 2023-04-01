import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import '@/assets/loader.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
