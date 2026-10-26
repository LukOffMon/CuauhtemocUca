# Porte-Monnaie Malin 4.0

Monedero inteligente: finanzas personales 100% locales, privadas y offline. Se publica con GitHub Pages tal cual (sin compilar).

- **Anotar en segundos**: «45 café», «$320 gasolina ayer». Detecta monto, fecha y categoría, y aprende de tus correcciones.
- **Movimientos**: editar, duplicar, eliminar con «Deshacer», filtros por mes/tipo/categoría, búsqueda y CSV.
- **Análisis**: mapa de calor, categorías, ritmo de gasto contra el mes anterior y el presupuesto, 6 meses, top de gastos, suscripciones.
- **Planear**: presupuesto mensual (con sugerencia 50/30/20), tarjetas, metas con fecha, gastos e ingresos fijos, simuladores.
- **Respaldo** .json (también para pasar datos a otro dispositivo), CSV y estado de cuenta en PDF.

Chart.js y jsPDF están en `vendor/`. Los datos viven solo en el navegador (localStorage + IndexedDB, clave `pmm_v3`; los datos de versiones anteriores se migran solos).
Atajos de teclado: `N` nuevo movimiento, `/` buscar.
