// Cliente HTTP: misma origen, cookie HttpOnly (el JS nunca la ve) y token CSRF en cada cambio.
let csrfToken = '';
let onUnauthorized = () => {};

export const setCsrf = (t) => { csrfToken = t || ''; };
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

export class ApiError extends Error {
  constructor(message, status, field, data = {}) {
    super(message);
    this.status = status;
    this.field = field;
    this.data = data;
  }
}

export async function api(method, path, body) {
  const headers = { Accept: 'application/json' };
  const unsafe = !['GET', 'HEAD'].includes(method);
  if (unsafe) {
    headers['Content-Type'] = 'application/json';
    if (csrfToken) headers['X-CSRF-Token'] = csrfToken;
  }
  let res;
  try {
    res = await fetch('/api' + path, {
      method,
      headers,
      credentials: 'same-origin',
      cache: 'no-store',
      body: unsafe ? JSON.stringify(body ?? {}) : undefined
    });
  } catch {
    throw new ApiError('No hay conexión con el servidor. Revisa tu internet.', 0);
  }
  const data = res.headers.get('content-type')?.includes('application/json') ? await res.json().catch(() => ({})) : {};
  if (data && typeof data.csrfToken === 'string') setCsrf(data.csrfToken);
  if (!res.ok) {
    if (res.status === 401 && !path.startsWith('/auth/')) onUnauthorized();
    throw new ApiError(data.error || `Error ${res.status}`, res.status, data.field, data);
  }
  return data;
}

export const get = (p) => api('GET', p);
export const post = (p, b) => api('POST', p, b);
export const put = (p, b) => api('PUT', p, b);
export const patch = (p, b) => api('PATCH', p, b);
export const del = (p) => api('DELETE', p, {});
