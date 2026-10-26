/* Offline primero; en segundo plano baja la versión nueva para la próxima apertura. */
const V='pmm-v4',F=['./','index.html','style.css','app.js','manifest.json','icon.svg','icon-180.png','icon-192.png','icon-512.png','vendor/chart.umd.js','vendor/jspdf.umd.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 const key=r.mode==='navigate'?'index.html':r;
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(key,{ignoreSearch:true}),net=fetch(r).then(n=>{if(n.ok&&n.type==='basic')c.put(key,n.clone());return n}).catch(()=>hit);
  if(hit){e.waitUntil(net.catch(()=>{}));return hit}return net.then(n=>n||c.match('index.html'))}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow('./#home')))});
