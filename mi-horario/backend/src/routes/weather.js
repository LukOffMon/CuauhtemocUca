// Proxy de clima (Open-Meteo, sin clave). El navegador solo habla con nuestro servidor,
// así la política CSP queda en 'self' y la ubicación exacta no sale del servidor:
// se redondea a ~1 km antes de consultar.
import { Router } from 'express';
import { z } from 'zod';
import { config } from '../config.js';

const router = Router();
const cache = new Map(); // "lat,lon" -> { at, data }
const TTL = 10 * 60 * 1000;

const q = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180)
});

router.get('/', async (req, res) => {
  if (!config.weatherEnabled) return res.status(404).json({ error: 'Clima desactivado.' });
  const p = q.safeParse(req.query);
  if (!p.success) return res.status(400).json({ error: 'Coordenadas inválidas.' });
  const lat = Math.round(p.data.lat * 100) / 100;
  const lon = Math.round(p.data.lon * 100) / 100;
  const key = `${lat},${lon}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return res.json(hit.data);

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: String(lat), longitude: String(lon),
    current: 'temperature_2m,weather_code',
    hourly: 'precipitation_probability',
    timezone: 'auto', forecast_days: '2'
  }).toString();
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    const data = {
      temperature: Number(j.current?.temperature_2m),
      code: Number(j.current?.weather_code),
      hourly: (j.hourly?.time || []).slice(0, 48).map((t, i) => ({
        t: Date.parse(t + (j.utc_offset_seconds !== undefined ? offset(j.utc_offset_seconds) : 'Z')),
        p: Number(j.hourly.precipitation_probability?.[i] ?? 0)
      }))
    };
    cache.set(key, { at: Date.now(), data });
    if (cache.size > 500) cache.delete(cache.keys().next().value);
    res.set('Cache-Control', 'private, max-age=600');
    res.json(data);
  } catch {
    res.status(502).json({ error: 'El servicio de clima no respondió.' });
  }
});

function offset(sec) {
  const sign = sec < 0 ? '-' : '+';
  const a = Math.abs(sec);
  return `${sign}${String(Math.floor(a / 3600)).padStart(2, '0')}:${String(Math.floor((a % 3600) / 60)).padStart(2, '0')}`;
}

export default router;
