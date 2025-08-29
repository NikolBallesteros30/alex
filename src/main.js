import { createApp } from "vue";
import { Quasar } from "quasar";
import App from "./App.vue";
import {router}from "./routers/routers"
import { carrito } from './stores/carrito' 
import { productos } from './stores/productos'

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import '@quasar/extras/mdi-v7/mdi-v7.css'


const app = createApp(App);

app.use(router)
app.provide('carrito', carrito)
app.provide('productos', productos)

app.use(Quasar, {
  plugins: {},
});

app.mount("#app");
