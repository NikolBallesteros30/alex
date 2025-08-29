import { reactive, computed } from 'vue'

export const productos = reactive({
  // Todos los productos organizados por categoría
  hamburguesas: [
    { id: 1, nombre: 'Burguer Clásica', imagen: '/img/h1.png', descripcion: 'Pan brioche, carne de res, queso americano, tocineta, vegetales frescos', precio: 23000, categoria: 'hamburguesas' },
    { id: 2, nombre: 'Broiler', imagen: '/img/h2.png', descripcion: 'Carne 100% res, mozzarella, tocineta caramelizada, vegetales', precio: 28000, categoria: 'hamburguesas' },
    { id: 3, nombre: 'Burguer Pork', imagen: '/img/h3.png', descripcion: 'Salchicha jumbo, cebolla crispy, salsas', precio: 25000, categoria: 'hamburguesas' },
    { id: 4, nombre: 'Burguer Breakfast', imagen: '/img/h4.png', descripcion: 'Pan integral, carne de res, queso chedar fundido, huevo frito, deliciosa tocineta ahumada y salsas de la casa', precio: 24000, categoria: 'hamburguesas' },
    { id: 5, nombre: 'Burguer KP', imagen: '/img/h5.png', descripcion: 'Pan brioche, pechuga apanada, tocineta ahumada, jamón, queso americano, vegetales frescos', precio: 32000, categoria: 'hamburguesas' },
    { id: 6, nombre: 'Burguer Triple Carne', imagen: '/img/h6.png', descripcion: 'Pan brioche, triple carne de res, queso chedar, vegetales frescos', precio: 38000, categoria: 'hamburguesas' },
    { id: 7, nombre: 'Burguer Vegan', imagen: '/img/h7.jpg', descripcion: 'Pan brioche, carne vegana, tofu, vegetales frescos', precio: 31000, categoria: 'hamburguesas' },
    { id: 8, nombre: 'Burguer Crispy', imagen: '/img/h8.png', descripcion: 'Pan brioche doradito, carne de res, pollo desmechado, queso chedar, tocineta crispy, vegetales frescos', precio: 58000, categoria: 'hamburguesas' },
    { id: 9, nombre: 'Burguer Trifásica', imagen: '/img/h9.png', descripcion: 'Pan brioche, doble carne de res, pollo apanado, doble queso chedar, vegetales frescos', precio: 40000, categoria: 'hamburguesas' }
  ],
  
  perros: [
    { id: 10, nombre: 'Perro Clásico', imagen: '/img/p1.png', descripcion: 'Salchicha americana, cebolla, tomate, mostaza, mayonesa', precio: 12000, categoria: 'perros' },
    { id: 11, nombre: 'Perro Especial', imagen: '/img/p2.png', descripcion: 'Salchicha americana, tocineta, queso rallado, salsas', precio: 15000, categoria: 'perros' },
    { id: 12, nombre: 'Perro Ranchero', imagen: '/img/p3.png', descripcion: 'Salchicha americana, carne desmechada, cebolla caramelizada, salsas', precio: 18000, categoria: 'perros' },
    { id: 13, nombre: 'Perro Mexicano', imagen: '/img/p4.png', descripcion: 'Salchicha americana, guacamole, jalapeños, queso fundido', precio: 16000, categoria: 'perros' }
  ],
  
  salchipapas: [
    { id: 14, nombre: 'Salchipapa Clásica', imagen: '/img/s1.png', descripcion: 'Papas fritas, salchichas, queso rallado, salsas', precio: 14000, categoria: 'salchipapas' },
    { id: 15, nombre: 'Salchipapa Especial', imagen: '/img/s2.png', descripcion: 'Papas fritas, salchichas, tocineta, queso fundido, salsas', precio: 18000, categoria: 'salchipapas' },
    { id: 16, nombre: 'Salchipapa Ranchera', imagen: '/img/s3.png', descripcion: 'Papas fritas, salchichas, carne desmechada, cebolla caramelizada', precio: 20000, categoria: 'salchipapas' },
    { id: 17, nombre: 'Salchipapa Mexicana', imagen: '/img/s4.png', descripcion: 'Papas fritas, salchichas, guacamole, jalapeños, queso fundido', precio: 19000, categoria: 'salchipapas' }
  ],
  
  bebidas: [
    { id: 18, nombre: 'Pepsi 390ml', imagen: '/img/b1.png', descripcion: 'Bebida gaseosa Pepsi 390ml', precio: 6000, categoria: 'bebidas' },
    { id: 19, nombre: 'Pony Malta 330ml', imagen: '/img/b2.png', descripcion: 'Bebida malta Pony 330ml', precio: 3000, categoria: 'bebidas' },
    { id: 20, nombre: 'Coca Cola 330ml', imagen: '/img/b3.png', descripcion: 'Bebida gaseosa Coca Cola 330ml', precio: 3500, categoria: 'bebidas' },
    { id: 21, nombre: 'Sprite 330ml', imagen: '/img/b4.png', descripcion: 'Bebida gaseosa Sprite 330ml', precio: 2800, categoria: 'bebidas' },
    { id: 22, nombre: 'Uva Postobon 450ml', imagen: '/img/b5.png', descripcion: 'Bebida gaseosa Uva Postobon 450ml', precio: 5000, categoria: 'bebidas' },
    { id: 23, nombre: 'Colombiana 450ml', imagen: '/img/b6.png', descripcion: 'Bebida gaseosa Colombiana 450ml', precio: 5000, categoria: 'bebidas' },
    { id: 24, nombre: 'Manzana Postobon 450ml', imagen: '/img/b7.png', descripcion: 'Bebida gaseosa Manzana Postobon 450ml', precio: 5500, categoria: 'bebidas' },
    { id: 25, nombre: 'Agua Cristal 500ml', imagen: '/img/b8.png', descripcion: 'Agua mineral Cristal 500ml', precio: 5500, categoria: 'bebidas' },
    { id: 26, nombre: 'Agua Manantial 600ml', imagen: '/img/b9.png', descripcion: 'Agua mineral Manantial 600ml', precio: 9000, categoria: 'bebidas' },
    { id: 27, nombre: 'Pepsi personal', imagen: '/img/b10.png', descripcion: 'Bebida gaseosa Pepsi tamaño personal', precio: 3500, categoria: 'bebidas' },
    { id: 28, nombre: 'Mr tea durazno personal', imagen: '/img/b11.png', descripcion: 'Té helado Mr Tea sabor durazno personal', precio: 3500, categoria: 'bebidas' },
    { id: 29, nombre: 'Coca Cola personal', imagen: '/img/b12.png', descripcion: 'Bebida gaseosa Coca Cola tamaño personal', precio: 3500, categoria: 'bebidas' }
  ],
  
  extras: [
    { id: 30, nombre: 'Papas Fritas', imagen: '/img/e1.png', descripcion: 'Porción de papas fritas crujientes', precio: 8000, categoria: 'extras' },
    { id: 31, nombre: 'Nuggets de Pollo', imagen: '/img/e2.png', descripcion: '6 nuggets de pollo apanados', precio: 12000, categoria: 'extras' },
    { id: 32, nombre: 'Aros de Cebolla', imagen: '/img/e3.png', descripcion: 'Porción de aros de cebolla fritos', precio: 10000, categoria: 'extras' },
    { id: 33, nombre: 'Ensalada César', imagen: '/img/e4.png', descripcion: 'Ensalada César con aderezo especial', precio: 15000, categoria: 'extras' }
  ]
})

// Función para obtener todos los productos
export function obtenerTodosLosProductos() {
  return [
    ...productos.hamburguesas,
    ...productos.perros,
    ...productos.salchipapas,
    ...productos.bebidas,
    ...productos.extras
  ]
}

// Función para buscar productos
export function buscarProductos(termino) {
  if (!termino || termino.trim() === '') {
    return []
  }
  
  const todosLosProductos = obtenerTodosLosProductos()
  const terminoBusqueda = termino.toLowerCase().trim()
  
  return todosLosProductos.filter(producto => 
    producto.nombre.toLowerCase().includes(terminoBusqueda) ||
    producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
    producto.categoria.toLowerCase().includes(terminoBusqueda)
  )
}
