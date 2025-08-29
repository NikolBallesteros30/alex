<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-burgundy text-white" :style="headerHeight">
      <!-- Fila superior -->
      <q-toolbar class="q-px-md q-py-md flex items-center justify-center" :style="topToolbarHeight">
        <div class="full-width flex items-center justify-between" style="max-width: 1200px;">
          <!-- Logo -->
          <div class="row items-center q-gutter-md">
            <q-toolbar-title class="cursor-pointer" @click="$router.push('/')">
              <img src="/img/logo.png" alt="Logo Roll & Go" :style="logoStyle" />
            </q-toolbar-title>

            <!-- Botones de navegación -->
            <div class="gt-sm">
              <q-btn flat label="Ir al menú" class="text-white header-btn q-mr-md" @click="irAMenu" />
             

            </div>

            <!-- Botón "Ir al menú" para móvil -->
            <div class="lt-md">
              <q-btn flat :label="$q.screen.xs ? 'Menú' : 'Ir al menú'" class="text-white header-btn"
                @click="irAMenu" />
            </div>
          </div>

          <!-- Buscador -->
          <q-input v-model="search" rounded dense outlined debounce="300" placeholder="Buscar"
            class="search-bar bg-white text-dark" :style="searchBarStyle" @keyup.enter="realizarBusqueda">

            <template #prepend>
              <q-btn flat round dense icon="search" @click="realizarBusqueda" color="red-8" />
            </template>
          </q-input>

          <!-- Iconos a la derecha -->
          <div class="row items-center q-gutter-sm">
            <q-btn flat dense class="text-white header-lang-btn">
              <q-avatar :size="avatarSize" class="q-mr-xs">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRkZEQjAwIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIyNCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDA3M0ZGIi8+CjxyZWN0IHk9IjE2IiB3aWR0aD0iMjQiIGhlaWdodD0iOCIgZmlsbD0iI0ZGMDAwMCIvPgo8L3N2Zz4K"
                  alt="Colombia flag">
              </q-avatar>
              <span :class="{ 'gt-xs': $q.screen.xs }">ES</span>
              <q-icon name="expand_more" :size="iconSize" class="q-ml-xs" />
            </q-btn>
          </div>
        </div>
      </q-toolbar>

      <!-- Fila inferior -->
      <div class="bg-cream text-dark flex items-center justify-center" :style="bottomBarHeight">
        <div class="q-px-md row items-center justify-start q-gutter-md" style="max-width: 1200px; width: 100%;">
          <!-- Botón inicia tu orden -->
          <q-btn flat icon="login" :label="$q.screen.gt.xs ? 'Inicia tu orden' : ''" class="text-dark bottom-bar-btn"
            @click="scrollToPromociones" />

          <!-- Botón domicilio -->
          <q-btn flat icon="local_shipping" :label="$q.screen.gt.xs ? 'Domicilio' : ''" class="text-dark bottom-bar-btn"
            @click="abrirWhatsApp" />
        </div>
      </div>
    </q-header>

    <!-- Contenido de página -->
    <q-page-container class="q-pa-none">
      <router-view />
    </q-page-container>

    <!-- Modal del carrito -->
    <q-dialog v-model="mostrarCarrito" persistent>
      <q-card class="q-pa-md" :style="carritoModalStyle">
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

    <!-- Modal de iniciar pedido -->
    <q-dialog v-model="mostrarFormulario">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Inicia tu orden</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="formPedido.nombre" label="Tu nombre" filled />
          <q-input v-model="formPedido.producto" label="Producto" filled />
          <q-input v-model="formPedido.cantidad" type="number" label="Cantidad" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn color="primary" label="Enviar" @click="enviarPedido" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, reactive, provide, computed, inject } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const search = ref('')
const mostrarCarrito = ref(false)


const carrito = inject('carrito')

// Computed properties para estilos responsivos
const headerHeight = computed(() => {
  if ($q.screen.xs) return 'height: 120px'
  if ($q.screen.sm) return 'height: 140px'
  return 'height: 160px'
})

const topToolbarHeight = computed(() => {
  if ($q.screen.xs) return 'height: 60px'
  if ($q.screen.sm) return 'height: 70px'
  return 'height: 80px'
})

const bottomBarHeight = computed(() => {
  if ($q.screen.xs) return 'height: 60px'
  if ($q.screen.sm) return 'height: 70px'
  return 'height: 80px'
})

const logoStyle = computed(() => {
  if ($q.screen.xs) return 'height: 80px; width: 90px; margin-top: 15px;'
  if ($q.screen.sm) return 'height: 100px; width: 115px; margin-top: 25px;'
  return 'height: 130px; width: 150px; margin-top: 45px;'
})

const searchBarStyle = computed(() => {
  if ($q.screen.xs) return 'width: 120px;'
  if ($q.screen.sm) return 'width: 180px;'
  if ($q.screen.md) return 'width: 250px;'
  return 'width: 300px;'
})

const avatarSize = computed(() => {
  return $q.screen.xs ? '16px' : '20px'
})

const iconSize = computed(() => {
  return $q.screen.xs ? '14px' : '16px'
})

const carritoModalStyle = computed(() => {
  if ($q.screen.xs) return 'min-width: 280px; max-width: 90vw;'
  return 'min-width: 300px; max-width: 600px;'
})

function irAMenu() {
  const el = document.getElementById('categorias')
  if (el) {
    const offset = $q.screen.xs ? 120 : $q.screen.sm ? 140 : 200
    const topPos = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: topPos, behavior: 'smooth' })
  }
}

 
function formatPrecio(valor) {
  return `$${valor.toLocaleString('es-CO')}`
}

function realizarBusqueda() {
  if (search.value.trim()) {
    router.push({
      path: '/busqueda',
      query: { q: search.value.trim() }
    })
  }
}

function scrollToPromociones() {
  const el = document.getElementById('promociones')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}


// 👉 nuevo: abrir WhatsApp
function abrirWhatsApp() {
  const telefono = '3123866406'
  const mensaje = encodeURIComponent('Hola, quiero pedir a domicilio 🚚')
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank')
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

/* Responsive adjustments */
@media (max-width: 599px) {

  .header-btn,
  .header-lang-btn {
    font-size: 12px;
    padding: 4px 8px;
  }

  .bottom-bar-btn {
    font-size: 12px;
    min-width: 60px;
  }
}

@media (min-width: 600px) and (max-width: 1023px) {

  .header-btn,
  .header-lang-btn {
    font-size: 13px;
  }
}
</style>