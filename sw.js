const CACHE = 'seed-v1';
const ASSETS = ['./', './index.html', './icon.png', './icon-192.png', './icon-maskable.png', './manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // version.json siempre de la red: es lo que detecta actualizaciones
  if (url.pathname.endsWith('version.json')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // el resto: caché primero, y se refresca por detrás
  e.respondWith(
    caches.match(e.request).then(hit => {
      const live = fetch(e.request).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || live;
    })
  );
});

self.addEventListener('message', e => {
  if (e.data === 'seed-update') {
    caches.delete(CACHE).then(() => self.registration.update());
  }
});
