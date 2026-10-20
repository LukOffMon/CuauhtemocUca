import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config, ROOT_DIR } from './config.js';
import { loadSession, requireAuth, csrfProtection } from './security/sessions.js';
import { apiLimiter } from './middleware/rate-limit.js';
import { errorHandler } from './middleware/errors.js';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import weatherRoutes from './routes/weather.js';

const PUBLIC_DIR = path.join(ROOT_DIR, 'frontend', 'public');
const NM = path.join(ROOT_DIR, 'node_modules');

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);

  // Cabeceras de seguridad. CSP estricta: nada de scripts en línea ni de terceros.
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          // Permite style="--color: #hex" en elementos (solo atributos, no <style> en línea).
          styleSrcAttr: ["'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          fontSrc: ["'self'"],
          connectSrc: ["'self'"],
          manifestSrc: ["'self'"],
          workerSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          ...(config.isProduction ? { upgradeInsecureRequests: [] } : {})
        }
      },
      strictTransportSecurity: config.isProduction ? { maxAge: 63072000, includeSubDomains: true, preload: false } : false,
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    })
  );
  app.use((req, res, next) => {
    res.set('Permissions-Policy', 'camera=(), microphone=(), payment=(), usb=(), geolocation=(self)');
    next();
  });

  if (config.logRequests && !config.isTest) {
    app.use((req, res, next) => {
      const t = Date.now();
      res.on('finish', () => console.log(`${req.method} ${req.originalUrl.split('?')[0]} ${res.statusCode} ${Date.now() - t}ms`));
      next();
    });
  }

  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  // ----- API -----
  const api = express.Router();
  api.use(express.json({ limit: '512kb', strict: true }));
  api.use(cookieParser());
  api.use(apiLimiter);
  api.use(loadSession);
  api.use(csrfProtection);
  api.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  api.use('/auth', authRoutes);
  api.use('/weather', requireAuth, weatherRoutes);
  api.use('/', requireAuth, dataRoutes);
  api.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada.' }));
  app.use('/api', api);

  // ----- Archivos estáticos (fuentes e íconos servidos localmente, sin CDN) -----
  const staticOpts = { maxAge: config.isProduction ? '7d' : 0, fallthrough: false, index: false };
  app.use('/vendor/fontawesome/css', express.static(path.join(NM, '@fortawesome/fontawesome-free/css'), staticOpts));
  app.use('/vendor/fontawesome/webfonts', express.static(path.join(NM, '@fortawesome/fontawesome-free/webfonts'), staticOpts));
  app.use('/vendor/inter', express.static(path.join(NM, '@fontsource-variable/inter'), staticOpts));
  app.use('/vendor/bricolage', express.static(path.join(NM, '@fontsource-variable/bricolage-grotesque'), staticOpts));
  app.use(express.static(PUBLIC_DIR, { maxAge: config.isProduction ? '1h' : 0, index: 'index.html' }));

  // SPA: cualquier otra ruta GET devuelve la app.
  app.get(/^\/(?!api\/|vendor\/).*/, (_req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')));

  app.use(errorHandler);
  return app;
}
