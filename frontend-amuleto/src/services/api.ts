const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

type RequestOptions = RequestInit & {
  signal?: AbortSignal;
};

export const buildUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = response.statusText || 'Error en la solicitud';
    try {
      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const body = await response.json();
        message =
          body?.message ||
          body?.error ||
          body?.errors?.[0]?.message ||
          (typeof body === 'string' ? body : JSON.stringify(body)) ||
          message;
      } else {
        const text = await response.text();
        if (text) message = text;
      }
    } catch {
      // ignore body parsing errors
    }
    throw new Error(`${response.status} ${message}`.trim());
  }

  return response.json() as Promise<T>;
}