# Seguridad de Mi Horario

## Qué protegemos y de quién

| Amenaza | Protección |
|---|---|
| Alguien roba el archivo de la base de datos o un respaldo | El archivo completo está cifrado con SQLCipher (AES-256). Aunque se descifrara, los campos sensibles están cifrados otra vez con AES-256-GCM y una clave distinta. Las contraseñas son hashes bcrypt y las sesiones se guardan como SHA-256 del token. |
| Un alumno intenta ver o cambiar datos de otro | Cada consulta filtra por `user_id`. Los datos cifrados llevan el usuario en el AAD: copiar un valor a otra cuenta hace fallar el descifrado. |
| Inyección SQL | Solo sentencias preparadas con parámetros. Los identificadores de ruta se validan como enteros. |
| XSS (código malicioso en un título, nota o enlace) | Plantillas que escapan todo por defecto; CSP `script-src 'self'` sin scripts en línea; los enlaces solo aceptan `http(s)`; los colores solo `#rrggbb`. |
| CSRF (otro sitio envía peticiones con tu sesión) | Token por sesión en `X-CSRF-Token`, verificación de `Origin` y `Sec-Fetch-Site`, `Content-Type: application/json` obligatorio, cookie `SameSite=Lax`. |
| Robo de la cookie de sesión | Cookie `HttpOnly` (JavaScript no la puede leer), `Secure`, prefijo `__Host-`, HSTS. Expira por inactividad (7 días) y como máximo a los 30 días. |
| Fuerza bruta de contraseñas | bcrypt costo 12, límite de 20 intentos cada 15 min por IP y bloqueo de 15 min de la cuenta tras 5 fallos. |
| Saber si un correo está registrado | Login responde igual y tarda lo mismo (se ejecuta bcrypt con un hash de relleno). El correo se busca por HMAC, no en claro. |
| Fijación de sesión | Se crea una sesión nueva en cada login y al cambiar la contraseña (las demás se invalidan). |
| Clickjacking | `frame-ancestors 'none'` y `X-Frame-Options: SAMEORIGIN`. |
| Fugas por errores | El cliente recibe mensajes genéricos; los detalles solo van al registro del servidor. |

## Qué NO cubre (límites honestos)

- **No es cifrado de extremo a extremo.** El servidor tiene las claves para descifrar, así que quien administre el servidor y tenga el `.env` puede leer los datos. Protege el `.env` como protegerías la base.
- Se guardan en claro (pero dentro del archivo cifrado por SQLCipher) las fechas de tareas y exámenes, el día y la hora de las clases y si una tarea está entregada, porque se necesitan para ordenar.
- El respaldo que descarga el alumno (JSON) **no** va cifrado.
- Las notificaciones del navegador solo funcionan con la página abierta; para avisos con la página cerrada se usa la exportación `.ics`.

## Claves

- `DB_ENCRYPTION_KEY`: cifra el archivo SQLite.
- `DATA_ENCRYPTION_KEY`: cifra cada campo. Se puede rotar con `npm run rotate-key`.
- `BLIND_INDEX_KEY`: índice de correos. Cambiarla deja inaccesibles las cuentas existentes.

Genera claves con `npm run keys`. No las subas a GitHub, no las mandes por chat y guarda una copia en un gestor de contraseñas.

## Reportar una vulnerabilidad

Si encuentras un problema de seguridad, no abras un issue público: escribe al responsable del repositorio con los pasos para reproducirlo.
