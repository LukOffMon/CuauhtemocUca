# Mi Horario Escolar

Plataforma web para estudiantes de prepa: horario de clases, semana de exámenes, entregas de **Moodle** y **ALEKS** con cuenta regresiva en vivo, Pomodoro, calculadora de promedios, contador de faltas, notas por materia y exportación a calendario (`.ics`).

Versión 3.0: cuentas de usuario, servidor propio y **datos cifrados**.

| | |
|---|---|
| Backend | Node.js 22 + Express 5 |
| Base de datos | SQLite cifrado con **SQLCipher** (AES-256) + cifrado por campo **AES-256-GCM** |
| Autenticación | bcrypt (costo 12) + sesiones del lado del servidor en cookie **HttpOnly / Secure / SameSite** |
| Frontend | JavaScript modular (ES modules) sin paso de compilación, CSS propio, íconos y fuentes servidos localmente |
| Despliegue | Docker + Caddy (HTTPS automático) o cualquier hosting de Node |

---

## Contenido

- [Funciones](#funciones)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación local](#instalación-local)
- [Variables de entorno](#variables-de-entorno)
- [Subirlo a GitHub](#subirlo-a-github)
- [Despliegue en producción](#despliegue-en-producción)
- [Seguridad](#seguridad)
- [Respaldos y rotación de claves](#respaldos-y-rotación-de-claves)
- [API](#api)
- [Pruebas](#pruebas)

---

## Funciones

- **Hoy**: qué clase toca ahorita, cuánto falta para que termine y qué sigue; el día completo en un riel con la línea de la hora actual. El receso (10:40–11:30 por defecto) tiene prioridad sobre la clase programada.
- **Semana**: horario proporcional por hora (escritorio) o lista por día (móvil). Toca una clase para editarla. Imprimible.
- **Pendientes**: Moodle, ALEKS y otras entregas agrupadas por urgencia (vencidas, < 24 h, esta semana…), cuenta regresiva al segundo, barra de avance del plazo, plazo extra de ALEKS, filtros por plataforma, materia y estado.
- **Alertas**: aviso en pantalla y notificación del navegador 24 h, 3 h, 1 h y 15 min antes de cada entrega. Exporta a `.ics` para que tu teléfono avise aunque la página esté cerrada.
- **Exámenes**: próximo examen con cuenta regresiva, lista por día, exportación a `.ics`. En días de examen, “Hoy” muestra los exámenes en lugar de las clases.
- **Herramientas**: Pomodoro (25/5 y 50/10), promedios con “cuánto necesito para pasar”, contador de faltas con límite, notas por materia, enlaces útiles, calendario y respaldo.
- **Ajustes**: modo claro/oscuro/automático, 12 temas de color, enlace de Moodle, receso, cambiar contraseña, cerrar sesión en todos los dispositivos, descargar/restaurar respaldo y eliminar la cuenta.
- Al registrarte puedes empezar con el **horario de 5A INF** (semestre ago–dic 2026) ya cargado y editarlo después.

## Estructura del proyecto

```
mi-horario/
├── backend/
│   ├── src/
│   │   ├── server.js              # Arranque, apagado ordenado, limpieza de sesiones
│   │   ├── app.js                 # Express: Helmet/CSP, rutas, estáticos
│   │   ├── config.js              # Variables de entorno validadas
│   │   ├── db/
│   │   │   ├── schema.sql         # Tablas
│   │   │   ├── index.js           # Conexión SQLCipher
│   │   │   ├── repo.js            # Acceso a datos (consultas preparadas + cifrado)
│   │   │   └── seed-data.js       # Horario de ejemplo 5A INF
│   │   ├── security/
│   │   │   ├── crypto.js          # AES-256-GCM, índice ciego HMAC, tokens
│   │   │   ├── sessions.js        # Sesiones, cookies, CSRF
│   │   │   └── validate.js        # Esquemas zod de toda la API
│   │   ├── middleware/            # Rate limiting y manejo de errores
│   │   └── routes/                # auth, data, weather
│   └── test/                      # Pruebas (node:test)
├── frontend/public/
│   ├── index.html
│   ├── css/app.css
│   └── js/
│       ├── main.js                # Navegación, estructura, reloj
│       ├── api.js  store.js  ui.js  alerts.js  ics.js  theme.js  preload.js
│       ├── lib/                   # html.js (plantillas seguras), time.js, schedule.js
│       └── views/                 # auth, today, week, tasks, exams, tools, settings, editors
├── scripts/
│   ├── generate-keys.js           # Crea .env con claves aleatorias
│   ├── backup-db.js               # Respaldo cifrado de la base
│   └── rotate-data-key.js         # Rotación de la clave de campos
├── deploy/Caddyfile  deploy/nginx.conf.example
├── Dockerfile  docker-compose.yml
├── .github/workflows/ci.yml       # Pruebas + auditoría + build Docker
├── .env.example  .gitignore  SECURITY.md  LICENSE
└── package.json
```

## Instalación local

Requisitos: **Node.js 22.5 o más nuevo** y npm.

```bash
git clone https://github.com/TU-USUARIO/mi-horario.git
cd mi-horario
npm install
npm run keys        # crea .env con claves aleatorias (no las compartas)
npm run dev         # http://localhost:3000
```

Abre `http://localhost:3000`, crea tu cuenta y listo. `npm run dev` reinicia el servidor al guardar cambios; `npm start` lo arranca normal.

> **Guarda una copia de tu `.env` en un lugar seguro** (gestor de contraseñas). Sin esas claves la base de datos no se puede descifrar: perderías todo.

## Variables de entorno

Copia `.env.example` a `.env` (o usa `npm run keys`, que lo hace por ti).

| Variable | Obligatoria | Descripción |
|---|---|---|
| `NODE_ENV` | | `development` o `production`. En producción las cookies exigen HTTPS. |
| `PORT` / `HOST` | | Puerto y dirección (por defecto `3000` / `0.0.0.0`). |
| `APP_ORIGIN` | ✔ en prod. | URL pública exacta, sin `/` final (ej. `https://horario.midominio.mx`). Se usa para bloquear peticiones de otros sitios. |
| `TRUST_PROXY` | | Número de proxies delante (Caddy, Nginx, Render, Railway = `1`). |
| `DATABASE_PATH` | | Archivo SQLite (por defecto `data/mi-horario.db`). |
| `DB_ENCRYPTION_KEY` | ✔ | 64 caracteres hex. Cifra el archivo completo (SQLCipher). |
| `DATA_ENCRYPTION_KEY` | ✔ | 32 bytes en base64. Cifra cada campo sensible (AES-256-GCM). |
| `DATA_ENCRYPTION_KEY_ID` | | Nombre de la clave actual (por defecto `k1`). |
| `DATA_ENCRYPTION_KEYS_OLD` | | Claves anteriores para rotación: `k0:base64,…` |
| `BLIND_INDEX_KEY` | ✔ | 32 bytes en base64. Permite buscar correos sin guardarlos en claro. **No la cambies** después de crear cuentas. |
| `BCRYPT_ROUNDS` | | Costo de bcrypt (10–15, por defecto 12). |
| `SESSION_IDLE_HOURS` | | Horas de inactividad antes de cerrar sesión (168 = 7 días). |
| `SESSION_ABSOLUTE_DAYS` | | Duración máxima de una sesión (30 días). |
| `MAX_FAILED_LOGINS` / `LOCKOUT_MINUTES` | | Bloqueo temporal tras intentos fallidos (5 / 15 min). |
| `ALLOW_REGISTRATION` | | `false` para cerrar el registro de cuentas nuevas. |
| `WEATHER_ENABLED` | | Clima en “Hoy” (Open-Meteo, sin clave). |
| `SEED_TZ_OFFSET` | | Zona horaria del horario de ejemplo (`-06:00`). |

Para generar claves sueltas (por ejemplo, para pegarlas en el panel de tu hosting): `npm run keys -- --print`.

## Subirlo a GitHub

```bash
cd mi-horario
git init
git add .
git commit -m "Mi Horario 3.0"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mi-horario.git
git push -u origin main
```

`.gitignore` ya excluye `.env`, `node_modules/` y la carpeta `data/`. Antes del primer `push`, confirma con `git status` que **`.env` no aparece**. Si alguna vez subes una clave por error, genera claves nuevas: borrarla del historial no basta.

El flujo de GitHub Actions (`.github/workflows/ci.yml`) ejecuta las pruebas, `npm audit` y construye la imagen Docker en cada push y pull request. Dependabot revisa dependencias cada semana.

## Despliegue en producción

### Opción A: VPS con Docker y HTTPS automático (recomendada)

Sirve para cualquier servidor Linux (DigitalOcean, Hetzner, Oracle Cloud, Linode…).

1. Instala Docker y apunta tu dominio (registro **A**) a la IP del servidor.
2. En el servidor:
   ```bash
   git clone https://github.com/TU-USUARIO/mi-horario.git && cd mi-horario
   cp .env.example .env
   docker run --rm -v "$PWD":/app -w /app node:22-slim node scripts/generate-keys.js
   ```
3. Edita `.env`: `NODE_ENV=production`, `APP_ORIGIN=https://horario.midominio.mx`, `TRUST_PROXY=1`.
4. Arranca:
   ```bash
   DOMAIN=horario.midominio.mx docker compose up -d --build
   ```
   Caddy obtiene el certificado de Let's Encrypt y redirige HTTP → HTTPS. La base vive en el volumen `app-data`.

Actualizar: `git pull && DOMAIN=horario.midominio.mx docker compose up -d --build`.

### Opción B: Render, Railway o Fly.io

1. Crea un servicio web desde tu repositorio de GitHub (detectan el `Dockerfile`).
2. Agrega un **disco persistente** montado en `/app/data` (sin él, la base se borra en cada despliegue).
3. Variables de entorno: `NODE_ENV=production`, `APP_ORIGIN=https://<tu-app>.onrender.com` (o tu dominio), `TRUST_PROXY=1` y las tres claves de `npm run keys -- --print`.
4. Health check: `/api/health`. El hosting pone el HTTPS.

### Opción C: Node directo con Nginx

`npm ci --omit=dev && NODE_ENV=production npm start` detrás de Nginx con Certbot. Hay un ejemplo en `deploy/nginx.conf.example`. Usa `systemd` o `pm2` para mantenerlo encendido.

## Seguridad

Resumen de las medidas (detalle y modelo de amenazas en [SECURITY.md](SECURITY.md)):

- **Contraseñas** con bcrypt (costo 12, re-hash automático si subes el costo), mínimo 10 caracteres.
- **Sesiones** del lado del servidor: el navegador guarda solo un token aleatorio de 256 bits en cookie `HttpOnly`, `Secure`, `SameSite=Lax` y prefijo `__Host-`; la base guarda su SHA-256. Expiración por inactividad y absoluta, rotación al iniciar sesión y al cambiar contraseña.
- **Cifrado en reposo** en dos capas: archivo completo con SQLCipher (AES-256) y cada campo sensible (correo, nombre, materias, títulos de tareas, notas, calificaciones, faltas, enlaces, preferencias) con AES-256-GCM ligado a su usuario. El correo se busca con un índice ciego HMAC-SHA256.
- **Cifrado en tránsito**: HTTPS obligatorio en producción (Caddy/Let's Encrypt), HSTS de 2 años.
- **Inyección SQL**: solo consultas preparadas con parámetros; cada consulta filtra por `user_id`.
- **XSS**: plantillas que escapan todo por defecto, CSP estricta (`script-src 'self'`, sin scripts en línea ni CDNs), colores y URLs validados.
- **CSRF**: token por sesión en `X-CSRF-Token`, verificación de `Origin`/`Sec-Fetch-Site`, `Content-Type: application/json` obligatorio y cookie SameSite.
- **Fuerza bruta**: límite por IP en login/registro y bloqueo temporal de la cuenta tras 5 intentos; mismas respuestas y tiempos si el correo no existe.
- **Validación** estricta con zod en cada endpoint (campos extra se rechazan), límite de 512 KB por petición.
- Cabeceras con Helmet, `Permissions-Policy`, `frame-ancestors 'none'`; errores sin detalles internos; contenedor sin privilegios y de solo lectura.

## Respaldos y rotación de claves

**Respaldo del servidor** (sigue cifrado con la misma clave):

```bash
npm run backup-db                     # → data/backups/mi-horario-AAAAMMDD-HHMM.db
# con Docker:
docker compose exec app node scripts/backup-db.js
```

Guarda los respaldos junto con una copia segura del `.env`; uno sin el otro no sirve.

**Respaldo de cada alumno**: en Ajustes → Tus datos → *Descargar respaldo* (archivo JSON sin cifrar; trátalo como información privada).

**Rotar la clave de campos** (`DATA_ENCRYPTION_KEY`):

1. `npm run backup-db`
2. En `.env`: pasa la clave actual a `DATA_ENCRYPTION_KEYS_OLD=k1:<clave-vieja>`, pon una nueva en `DATA_ENCRYPTION_KEY` y cambia `DATA_ENCRYPTION_KEY_ID=k2`.
3. Detén la app y ejecuta `npm run rotate-key`.
4. Arranca la app y, cuando confirmes que todo funciona, borra la clave vieja de `.env`.

## API

Todas las rutas están bajo `/api`, reciben y devuelven JSON. Las que modifican datos requieren `Content-Type: application/json` y el encabezado `X-CSRF-Token` (lo devuelven `/auth/login`, `/auth/register` y `/auth/me`).

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | `{name, email, password, seedDefaults}` |
| POST | `/auth/login` | `{email, password}` |
| GET | `/auth/me` | Usuario actual y token CSRF (`user: null` si no hay sesión) |
| POST | `/auth/logout` · `/auth/logout-all` | Cerrar esta sesión / todas |
| PUT | `/auth/profile` | `{name}` |
| POST | `/auth/password` | `{currentPassword, newPassword}` |
| POST | `/auth/delete-account` | `{password}` |
| GET | `/bootstrap` | Todo lo necesario para pintar la app |
| GET/POST | `/classes` · `/exams` · `/tasks` | Listar / crear |
| PUT/DELETE | `/classes/:id` · `/exams/:id` · `/tasks/:id` | Editar / eliminar |
| PATCH | `/tasks/:id/complete` | `{completed}` |
| GET/PUT | `/data/:key` | `prefs`, `grades`, `absences`, `notes`, `links`, `pomodoro` |
| GET | `/export` · POST `/import` | Respaldo del alumno |
| POST | `/seed-defaults` · `/reset` | Cargar horario 5A INF / vaciar contenido |
| GET | `/weather?lat&lon` | Clima (proxy de Open-Meteo) |
| GET | `/health` | Estado del servidor |

## Pruebas

```bash
npm test
```

Cubren cifrado (IV únicos, AAD, alteraciones, rotación), registro y login, enumeración de correos, CSRF, aislamiento entre usuarios, validación, inyección en parámetros, que la base no contenga datos en claro, que el archivo esté cifrado, cambio de contraseña, bloqueo por intentos, cabeceras de seguridad y borrado de cuenta.

## Licencia

MIT. Ver [LICENSE](LICENSE).
