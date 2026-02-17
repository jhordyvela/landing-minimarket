import { addToCarrito } from './carrito.js';

export function initProductos() {
  const searchInput = document.querySelector('.filtro-buscar');
  const checkboxes = document.querySelectorAll('.filtro-categorias input[type="checkbox"]');
  const productosList = document.querySelector('.productos-list');
  const productos = Array.from(document.querySelectorAll('.producto-card'));
  const btnFiltrar = document.querySelector('.filtro-btn');

  function filtrar() {
    const texto = searchInput.value.toLowerCase();
    const categoriasSeleccionadas = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.parentElement.textContent.trim().toLowerCase());

    productos.forEach(card => {
      const nombre = card.querySelector('h3').textContent.toLowerCase();
      const categoria = nombre; // Asumiendo que el nombre del producto es su categoría principal en este diseño simple
      
      const coincideTexto = nombre.includes(texto);
      // En este caso simple, el nombre del producto es la categoría, así que verificamos si está en la lista seleccionada
      // o si el texto del checkbox coincide parcialmente con el nombre del producto
      const coincideCategoria = categoriasSeleccionadas.some(cat => nombre.includes(cat));

      if (coincideTexto && coincideCategoria) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Event listeners
  if (btnFiltrar) btnFiltrar.addEventListener('click', filtrar);
  if (searchInput) searchInput.addEventListener('input', filtrar);
  checkboxes.forEach(cb => cb.addEventListener('change', filtrar));

  // Inicializar addToCarrito buttons
  const btnsAgregar = document.querySelectorAll('.producto-btn');
  btnsAgregar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.producto-card');
      const nombre = card.querySelector('h3').textContent;
      const precioTexto = card.querySelector('.producto-precio').textContent.replace('S/ ', '');
      const precio = parseFloat(precioTexto);

      addToCarrito({ nombre, precio });
      
      // Feedback visual
      const originalText = e.target.textContent;
      e.target.textContent = '¡Añadido!';
      e.target.style.backgroundColor = '#16a34a'; // verde
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = '';
      }, 1000);
      
      // Disparar evento para actualizar badge si es necesario
      window.dispatchEvent(new Event('storage'));
    });
  });
}
