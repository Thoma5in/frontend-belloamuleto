import { request } from './api';

export type Category = {
  id?: number;
  id_categoria?: number;
  idCategoria?: number;
  nombre?: string;
  nombre_categoria?: string;
  name?: string;
  descripcion?: string | null;
  productCount?: number;
};

type CategoriesResponse = {
  success: boolean;
  data: Category[];
};

type CategoryResponse = {
  success: boolean;
  data: Category;
};

export function getCategoryId(category: Category): number | undefined {
  return category.id ?? category.id_categoria ?? category.idCategoria;
}

export function getCategoryName(category: Category): string {
  return category.nombre ?? category.nombre_categoria ?? category.name ?? 'Sin nombre';
}

export async function getCategories() {
  return request<CategoriesResponse>('/categories');
}

export async function getCategoriesWithCount() {
  return request<CategoriesResponse>('/categories/with-count');
}

export async function getCategoryById(idCategoria: number | string) {
  return request<CategoryResponse>(`/categories/${idCategoria}`);
}

// Endpoints privados (pendiente auth). Los dejamos listos para usar cuando tengas token.
export async function createCategory(payload: Partial<Category>) {
  return request<CategoryResponse>('/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(idCategoria: number | string, payload: Partial<Category>) {
  return request<CategoryResponse>(`/categories/${idCategoria}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(idCategoria: number | string) {
  return request<{ success: boolean }>(`/categories/${idCategoria}`, {
    method: 'DELETE',
  });
}
