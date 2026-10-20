// Service worker de Mi Horario Escolar: permite abrir la app sin internet.
// La página se pide primero a la red (así siempre ves la versión más nueva de GitHub)
// y, si no hay conexión, se usa la copia guardada.
const CACHE = 'mi-horario-v4';
const PAGE = 'Mi%20Horario%20Escolar.html';
const CORE = [PAGE, 'mi-horario.webmanifest', 'mi-horario-icon.svg', 'mi-horario-icon-192.png', 'mi-horario-icon-512.png'];
const CDN = /^https:\/\/(cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k.startsWith('mi-horario-') && k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        // Solo los archivos de Mi Horario (no toca otras apps del repo)
        if (!/Mi%20Horario%20Escolar\.html$|Mi Horario Escolar\.html$|mi-horario[^/]*$/.test(url.pathname)) return;
        e.respondWith(fetch(req).then(res => {
            if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
            return res;
        }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match(PAGE))));
        return;
    }
    if (CDN.test(req.url)) {
        // Librerías externas: copia guardada al instante y se actualiza en segundo plano
        e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
            const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
            return hit || net;
        })));
    }
});
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
        const w = list.find(c => c.url.includes('Mi%20Horario') || c.url.includes('Mi Horario'));
        return w ? w.focus() : self.clients.openWindow(PAGE + '#tareas');
    }));
});
