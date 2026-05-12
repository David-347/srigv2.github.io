const CACHE_NAME = 'srig-v3-cache-v1';
const ASSETS = [
  "/",
  "/index.html",
  "/main/css/styles.css",
  "/main/js/app.js",
  "/main/js/websocket.js",
  "/main/js/charts.js",
  "/main/js/i18n.js",
  "/main/manifest.json",
  "/main/img/logo-srig.png",
  "/main/img/light-theme.png",
  "/main/img/dark-theme.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
