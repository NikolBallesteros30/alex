<template>
  <div class="pagina-busqueda">
    <!-- Header de búsqueda -->
    <div class="busqueda-header q-pa-xl">
      <div class="text-center">
        <q-icon name="search" size="48px" color="primary" class="q-mb-md" />
        <div class="text-h4 q-mb-sm">Búsqueda de productos</div>
        <div class="text-body1 text-grey">
          {{ terminoBusqueda ? `Resultados para: "${terminoBusqueda}"` : 'Busca tus productos favoritos' }}
        </div>
      </div>
    </div>

    <!-- Resultados de búsqueda -->
    <div v-if="resultadosBusqueda.length > 0" class="resultados-busqueda">
      <div class="titulo-resultados q-mb-lg">
        <q-icon name="search" size="24px" class="q-mr-sm" color="primary" />
        <span class="text-h6">Resultados de búsqueda</span>
      </div>
      
      <div class="resultados-grid">
        <div
          class="col-xs-12 col-sm-6 col-md-4"
          v-for="producto in resultadosBusqueda"
          :key="producto.id"
        >
          <q-card class="producto-card cursor-pointer" @click="abrirModal(producto)">
            <div class="producto-img-container">
              <q-img
                :src="producto.imagen"
                :alt="producto.nombre"
                class="producto-img"
                fit="cover"
              />
              <div class="producto-overlay">
                <q-icon name="visibility" color="white" size="md" />
              </div>
            </div>
            <q-card-section class="q-pa-sm">
              <div class="producto-nombre">{{ producto.nombre }}</div>
              <div class="producto-categoria">{{ obtenerNombreCategoria(producto.categoria) }}</div>
              <div class="producto-precio">{{ formatPrecio(producto.precio) }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Modal de producto -->
    <q-dialog v-model="modalAbierto" persistent transition-show="scale" transition-hide="scale">
      <q-card class="modal-producto">
        <q-card-section class="q-pa-none">
          <q-img
            :src="productoSeleccionado?.imagen"
            :alt="productoSeleccionado?.nombre"
            class="modal-img"
            fit="cover"
          />
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div class="text-h6 q-mb-sm">{{ productoSeleccionado?.nombre }}</div>
          <div class="text-body2 text-grey q-mb-md">{{ productoSeleccionado?.descripcion }}</div>
          <div class="text-h5 text-primary q-mb-md">{{ formatPrecio(productoSeleccionado?.precio) }}</div>
          
          <!-- Especificaciones -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-bold q-mb-xs">Especificaciones adicionales</div>
            <q-input
              v-model="especificaciones"
              filled
              type="textarea"
              placeholder="Ej: Sin cebolla, extra salsa, etc."
              autogrow
              dense
            />
          </div>

          <!-- Botón de agregar al carrito -->
          <div class="text-center">
            <q-btn 
              round 
              :style="{ backgroundColor: '#600000', color: 'white' }" 
              icon="shopping_cart" 
              size="lg" 
              @click="agregarAlCarrito"
            >
              <q-tooltip>Agregar al carrito</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Mensaje cuando no hay resultados -->
    <div v-if="terminoBusqueda && resultadosBusqueda.length === 0" class="no-resultados q-pa-xl text-center">
      <q-icon name="search_off" size="64px" color="grey-5" class="q-mb-md" />
      <div class="text-h6 q-mb-sm">No se encontraron productos</div>
      <div class="text-body1 text-grey q-mb-lg">
        No encontramos productos que coincidan con "{{ terminoBusqueda }}"
      </div>
      <q-btn 
        color="primary" 
        label="Volver al inicio" 
        @click="$router.push('/')"
        icon="home"
      />
    </div>

    <!-- Mensaje cuando no hay término de búsqueda -->
    <div v-if="!terminoBusqueda" class="busqueda-vacia q-pa-xl text-center">
      <q-icon name="search" size="64px" color="grey-5" class="q-mb-md" />
      <div class="text-h6 q-mb-sm">Ingresa un término de búsqueda</div>
      <div class="text-body1 text-grey">
        Usa la barra de búsqueda en la parte superior para encontrar productos
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { buscarProductos } from '../stores/productos'

const route = useRoute()
const carrito = inject('carrito')

// Obtener el término de búsqueda de la URL
const terminoBusqueda = computed(() => route.query.q || '')

// Buscar productos basado en el término
const resultadosBusqueda = computed(() => {
  if (!terminoBusqueda.value) return []
  return buscarProductos(terminoBusqueda.value)
})

// Variables para el modal
const modalAbierto = ref(false)
const productoSeleccionado = ref(null)
const especificaciones = ref('')

function obtenerNombreCategoria(categoria) {
  const nombres = {
    hamburguesas: 'Hamburguesas',
    perros: 'Perros Calientes',
    salchipapas: 'Salchipapas',
    bebidas: 'Bebidas',
    extras: 'Extras'
  }
  return nombres[categoria] || categoria
}

function formatPrecio(valor) {
  return `$${valor?.toLocaleString('es-CO')}`
}

function abrirModal(producto) {
  productoSeleccionado.value = producto
  especificaciones.value = ''
  modalAbierto.value = true
}

function agregarAlCarrito() {
  if (!productoSeleccionado.value) return

  const nuevoItem = {
    ...productoSeleccionado.value,
    adicionales: [],
    especificaciones: especificaciones.value,
    total: productoSeleccionado.value.precio
  }

  carrito.items.push(nuevoItem)
  modalAbierto.value = false
}
</script>

<style scoped>
.pagina-busqueda {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.busqueda-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.no-resultados, .busqueda-vacia {
  background: white;
  border-radius: 12px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.resultados-busqueda {
  padding: 20px;
}

.titulo-resultados {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.resultados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.producto-card {
  transition: transform 0.2s ease;
  border-radius: 12px;
  overflow: hidden;
}

.producto-card:hover {
  transform: translateY(-5px);
}

.producto-img-container {
  position: relative;
  height: 200px;
}

.producto-img {
  width: 100%;
  height: 100%;
}

.producto-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.producto-card:hover .producto-overlay {
  opacity: 1;
}

.producto-nombre {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.producto-categoria {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.producto-precio {
  font-weight: 700;
  color: #600000;
  font-size: 18px;
}

.modal-producto {
  max-width: 500px;
  width: 90vw;
}

.modal-img {
  height: 250px;
  width: 100%;
}

@media (max-width: 599px) {
  .resultados-grid {
    grid-template-columns: 1fr;
  }
  
  .producto-img-container {
    height: 180px;
  }
}
</style>
