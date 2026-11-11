// Service worker de Astra Hik's: permite abrir la bitácora sin internet (en el gym).
// La página se pide primero a la red y, si no hay conexión, se usa la copia guardada.
const CACHE = 'astra-hiks-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'vendor/jspdf.umd.min.js'];
const FONTS = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k.startsWith('astra-hiks-') && k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        if (!url.pathname.includes('/astra-hiks/')) return;
        e.respondWith(fetch(req).then(res => {
            if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
            return res;
        }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
        return;
    }
    if (FONTS.test(req.url)) {
        e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
            const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
            return hit || net;
        })));
    }
});
