import { config } from '../config.js';

// Manejador final: nunca expone pilas de error ni detalles internos al cliente.
export function errorHandler(err, req, res, _next) {
  let status = Number(err.status || err.statusCode) || 500;
  if (err.type === 'entity.parse.failed') status = 400;
  if (err.type === 'entity.too.large') status = 413;
  if (status >= 500 && !config.isTest) console.error('[error]', req.method, req.originalUrl, err);
  const message =
    status >= 500 ? 'Ocurrió un error en el servidor. Intenta de nuevo.'
    : status === 413 ? 'Los datos enviados son demasiado grandes.'
    : err.type === 'entity.parse.failed' ? 'JSON inválido.'
    : err.message || 'Petición inválida.';
  if (res.headersSent) return;
  if (req.originalUrl.startsWith('/api')) {
    res.status(status).json({ error: message, ...(err.field ? { field: err.field } : {}) });
  } else {
    res.status(status).type('text').send(status === 404 ? 'No encontrado' : message);
  }
}
