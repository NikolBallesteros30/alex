<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-burgundy text-white" style="height: 160px">
      <!-- Fila superior -->
      <q-toolbar class="q-px-xl q-py-md flex items-center justify-center" style="height: 80px;">
        <div class="full-width flex items-center justify-between" style="max-width: 1200px;">
        <!-- Logo -->
        <div class="row items-center q-gutter-md">
         <q-toolbar-title class="cursor-pointer" @click="$router.push('/')">
  <img src="/img/logo.png" alt="Logo Roll & Go" style="height: 130px; width: 150px; margin-top: 45px;" />
</q-toolbar-title>

        
          <q-btn
           flat
           label="Ir al menú"
           class="text-white header-btn"
           @click="irAMenu"
           />


          <q-btn flat label="Restaurantes" class="text-white header-btn" />
        </div>

        <!-- Buscador -->
        <!-- Buscador centrado -->
        <q-input
          v-model="search"
          rounded
          dense
          outlined
          debounce="300"
          placeholder="Buscar"
          class="search-bar bg-white text-dark"
          style="width: 300px;"
        >
          <template #prepend>
            <q-icon name="search" color="grey-6" />
          </template>
        </q-input>
        

        <!-- Iconos a la derecha -->
        <div class="row items-center q-gutter-sm">
          
          
          
          <q-btn flat dense class="text-white header-lang-btn">
            <q-avatar size="20px" class="q-mr-xs">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRkZEQjAwIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIyNCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDA3M0ZGIi8+CjxyZWN0IHk9IjE2IiB3aWR0aD0iMjQiIGhlaWdodD0iOCIgZmlsbD0iI0ZGMDAwMCIvPgo8L3N2Zz4K" alt="Colombia flag">
            </q-avatar>
            ES
            <q-icon name="expand_more" size="16px" class="q-ml-xs" />
          </q-btn>
        </div>
      </div>
      </q-toolbar>

      <!-- Fila inferior -->
      <div class="bg-cream text-dark flex items-center justify-center" style="height: 80px;">
        <div class="q-px-xl row items-center justify-start q-gutter-md" style="max-width: 1200px; width: 100%;">
        <q-btn flat icon="login" label="Inicia tu orden" class="text-dark bottom-bar-btn" />
        <q-btn flat icon="local_shipping" label="Domicilio" class="text-dark bottom-bar-btn" />
        
       
        </div>
      </div>
    </q-header>

    <!-- Contenido de página -->
    <q-page-container class="q-pa-none">
      <router-view />
    </q-page-container>

   

    <!-- Modal del carrito -->
    <q-dialog v-model="mostrarCarrito" persistent>
      <q-card class="q-pa-md" style="min-width: 300px; max-width: 600px;">
        <q-card-section>
          <div class="text-h6">Tu carrito</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div v-if="carrito.items.length === 0" class="text-grey">El carrito está vacío.</div>
          <div v-else>
            <div v-for="(item, i) in carrito.items" :key="i" class="q-mb-md">
              <div class="text-bold">{{ item.nombre }}</div>
              <div class="text-caption text-grey">
                {{ item.especificaciones }}
              </div>
              <div v-if="item.adicionales.length > 0" class="text-caption q-mt-xs">
                <span v-for="(a, j) in item.adicionales" :key="j">
                  • {{ a.nombre }} x{{ a.cantidad }}<br />
                </span>
              </div>
              <div class="text-subtitle2 q-mt-xs">Total: {{ formatPrecio(item.total) }}</div>
              <q-separator class="q-my-sm" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>

import { ref, reactive, provide } from 'vue'

const search = ref('')
const mostrarCarrito = ref(false)

import { inject } from 'vue'
const carrito = inject('carrito')


function irAMenu() {
  const el = document.getElementById('categorias')
  if (el) {
    const offset = 200
    const topPos = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: topPos, behavior: 'smooth' })
  }
}



function formatPrecio(valor) {
  return `$${valor.toLocaleString('es-CO')}`
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Open+Sans:wght@400;600;700&display=swap');

.bg-burgundy {
  background-color: #4b0b0b;
}
.bg-cream {
  background-color: #fff1d6;
}
.bg-red {
  background-color: #ff5c5c;
}

.search-bar {
  border-radius: 25px;
  font-family: 'Open Sans', sans-serif;
}

.search-bar .q-field__control {
  border-radius: 25px;
}

/* Header buttons styling */
.header-btn {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
}

.header-icon-btn {
  font-family: 'Open Sans', sans-serif;
}

.header-lang-btn {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
}

/* Bottom bar buttons */
.bottom-bar-btn {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.3px;
}

.bottom-bar-btn-active {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.3px;
}

.btn-carrito {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>