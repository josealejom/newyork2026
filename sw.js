// Service worker temporalmente en modo "passthrough" (sin cache) mientras
// el diseno y contenido todavia estan en iteracion. Esto evita que el
// celular quede sirviendo versiones viejas de la app tras cada actualizacion.
// Se puede activar el cacheo real (para uso offline) mas adelante, una vez
// el contenido este definitivo, cambiando este archivo de vuelta a una
// estrategia cache-first con un CACHE_NAME versionado.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', () => {
  // No-op: deja pasar todas las peticiones directo a la red, sin cachear.
});
