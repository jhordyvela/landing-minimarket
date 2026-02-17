// src/lib/carrito.js
// Maneja el carrito en localStorage y navegación

export function getCarrito() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  } catch {
    return [];
  }
}

export function addToCarrito(producto) {
  const carrito = getCarrito();
  // Verificar si ya existe para sumar cantidad en vez de duplicar fila
  // Asumimos que el producto tiene un 'nombre' único, o un 'id'. Usaremos 'nombre' por ahora basado en tu código anterior.
  const existingIdx = carrito.findIndex(p => p.nombre === producto.nombre);

  if (existingIdx >= 0) {
    carrito[existingIdx].cantidad = (carrito[existingIdx].cantidad || 1) + 1;
  } else {
    // Aseguramos que tenga cantidad inicial
    if (!producto.cantidad) producto.cantidad = 1;
    carrito.push(producto);
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function updateCantidad(index, delta) {
  const carrito = getCarrito();
  if (!carrito[index]) return;

  let nuevaCantidad = (carrito[index].cantidad || 1) + delta;
  if (nuevaCantidad < 1) {
    nuevaCantidad = 1;
  }
  
  carrito[index].cantidad = nuevaCantidad;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function removeFromCarrito(index) {
  const carrito = getCarrito();
  // Validamos índice
  if (index >= 0 && index < carrito.length) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}

export function clearCarrito() {
  localStorage.removeItem('carrito');
}
