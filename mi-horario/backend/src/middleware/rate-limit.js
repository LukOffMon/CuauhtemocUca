import { rateLimit } from 'express-rate-limit';
import { config } from '../config.js';

const common = {
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => config.isTest && process.env.RATE_LIMIT_IN_TESTS !== '1'
};

// Login, registro y cambios de contraseña: frena ataques de fuerza bruta por IP.
export const authLimiter = rateLimit({
  ...common,
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { error: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.' }
});

// Límite general de la API.
export const apiLimiter = rateLimit({
  ...common,
  windowMs: 60 * 1000,
  limit: 300,
  message: { error: 'Demasiadas peticiones. Espera un momento.' }
});
