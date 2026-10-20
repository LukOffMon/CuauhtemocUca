// Se ejecuta antes de pintar para aplicar tema y modo oscuro sin parpadeo.
// (Archivo externo: la política CSP no permite scripts en línea.)
(function () {
  try {
    var look = JSON.parse(localStorage.getItem('mh_look') || '{}');
    var mode = look.mode || 'auto';
    var dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', look.theme || 'azul');
  } catch (e) { /* sin almacenamiento */ }
})();
