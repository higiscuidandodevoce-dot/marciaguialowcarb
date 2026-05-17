const CACHE = 'marcia-lowcarb-v1';
const FILES = [
  '/marciaguialowcarb/',
  '/marciaguialowcarb/index.html',
  '/marciaguialowcarb/manifest.json',
  '/marciaguialowcarb/icon-192.png',
  '/marciaguialowcarb/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/marciaguialowcarb/index.html')))
  );
});
