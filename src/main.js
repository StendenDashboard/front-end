import { createApp } from 'vue'
import App from './App.vue'
import Vue3Storage from "vue3-storage";

const app = createApp(App);
app.use(Vue3Storage, { namespace: "javaAdvanced", storage: "" })
    .mount("#app");