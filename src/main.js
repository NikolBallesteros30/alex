import { createApp } from "vue";
import { Quasar } from "quasar";
import App from "./App.vue";
import {router}from "./routers/routers"
import { carrito } from './stores/carrito' 

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";


const app = createApp(App);

app.use(router)
app.provide('carrito', carrito) /

app.use(Quasar, {
  plugins: {},
});

app.mount("#app");
