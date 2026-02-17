/// <reference types="astro/client" />

interface Window {
    cambiarCantidad: (idx: number, delta: number) => void;
    eliminarDelCarrito: (idx: number) => void;
}


