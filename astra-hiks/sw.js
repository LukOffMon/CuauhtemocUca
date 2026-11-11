// Service worker de Astra Hik's.
// La app se abre al instante desde la copia guardada en el teléfono (funciona sin internet).
// Cuando hay internet, el navegador revisa si hay una versión nueva de este archivo; si la hay,
// la descarga completa en segundo plano y la app avisa para aplicarla (o se aplica sola al reabrir).
// Cambia VERSION en cada actualización para que los teléfonos la reciban.
const VERSION = '2.0.0';
const CACHE = 'astra-hiks-' + VERSION;
const CORE = [
    './', 'index.html', 'manifest.webmanifest',
    'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png',
    'vendor/jspdf.umd.min.js',
    'fonts/display-800.woff2', 'fonts/archivo-400.woff2', 'fonts/archivo-500.woff2',
    'fonts/archivo-600.woff2', 'fonts/archivo-700.woff2', 'fonts/mono-500.woff2', 'fonts/mono-700.woff2'
];

self.addEventListener('install', e => {
    // cache: 'reload' evita copiar archivos viejos de la caché HTTP del navegador
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k.startsWith('astra-hiks-') && k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener('message', e => {
    if (e.data === 'apply-update') self.skipWaiting();
    if (e.data === 'version' && e.source) e.source.postMessage({ version: VERSION });
});
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== location.origin || !url.pathname.includes('/astra-hiks/')) return;
    // Primero la copia guardada (carga instantánea); si no está, la red, y se guarda para la próxima.
    e.respondWith(caches.open(CACHE).then(async c => {
        const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await c.match('index.html') : null);
        if (hit) return hit;
        try {
            const res = await fetch(req);
            if (res.ok) c.put(req, res.clone());
            return res;
        } catch (err) {
            return (await c.match('index.html')) || Response.error();
        }
    }));
});
