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
    let message = response.statusText;
    try {
      const body = await response.json();
      message = body?.message || body?.error || message;
    } catch {
      // ignore JSON parsing errors
    }
    throw new Error(message || 'Error en la solicitud');
  }

  return response.json() as Promise<T>;
}