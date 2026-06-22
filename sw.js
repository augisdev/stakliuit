const CACHE = 'stalkiai-v3';
const ASSETS = [
  '/stakliuit/',
  '/stakliuit/index.html',
  '/stakliuit/manifest.json',
  '/stakliuit/icons/icon-180.png',
  '/stakliuit/icons/icon-192.png',
  '/stakliuit/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
