const CACHE = 'seed-v4';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './version.json',
  './icon.png',
  './icon-192.png',
  './icon-maskable.png',
  './sw.js'
];
const TRUSTED_CROSS_ORIGIN = ['https://unpkg.com'];

async function cacheAsset(request, response) {
  if (!response || response.type !== 'basic' || response.status !== 200) return;
  const cache = await caches.open(CACHE);
  await cache.put(request, response.clone());
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      await cacheAsset(request, response);
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return Response.error();
  }
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => undefined)
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.protocol === 'data:' || url.protocol === 'blob:' || url.protocol === 'chrome-extension:') return;

  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('/version.json')) {
      event.respondWith(networkFirst(request));
      return;
    }

    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          const live = fetch(request).then(res => {
            if (res && res.ok) cacheAsset(request, res).catch(() => undefined);
            return res;
          }).catch(() => cached);
          return live;
        }
        return fetch(request).catch(() => caches.match(request));
      })
    );
    return;
  }

  if (TRUSTED_CROSS_ORIGIN.includes(url.origin)) {
    event.respondWith(networkFirst(request));
    return;
  }
});

self.addEventListener('message', event => {
  if (event.data === 'seed-update' || event.data === 'seed-refresh') {
    caches.delete(CACHE).then(() => self.registration.update());
  }
});
