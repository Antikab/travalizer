import "primeicons/primeicons.css"
import Aura from '@primeuix/themes/aura'

import "./assets/main.css"
import { createApp } from "vue"
import { initializeApp } from "firebase/app"
import PrimeVue from "primevue/config"
import App from "./App.vue"
import router from "./router"

const firebaseConfig = {
  apiKey: "AIzaSyBh8-Xe5Lc-Y3Eu2fi61v8r9gPj_DLCVWU",
  authDomain: "travalizer-4a7d0.firebaseapp.com",
  projectId: "travalizer-4a7d0",
  storageBucket: "travalizer-4a7d0.firebasestorage.app",
  messagingSenderId: "885971237913",
  appId: "1:885971237913:web:9fcb4687eff84b1dd9fe88"
}

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
      preset: Aura,
      options: {
          darkModeSelector: 'system',
          cssLayer: false
      }
  }
});
app.use(router)
app.mount("#app")
