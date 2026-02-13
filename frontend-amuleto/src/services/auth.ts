import { request } from './api';

export type RegisterPayload = {
  nombre: string;
  email: string;
  password: string;
  direccion?: string;
  telefono?: string;
};

export async function register(payload: RegisterPayload) {
  return request<unknown>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
