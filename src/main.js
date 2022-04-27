import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/main.css'
import { createI18n } from 'vue-i18n'
import nl from '@/lang/nl'

const app = createApp(App)

const i18n = createI18n({
    locale: 'nl',
    messages: {nl},
});

app.use(i18n);

app.use(router)

app.mount('#app')
