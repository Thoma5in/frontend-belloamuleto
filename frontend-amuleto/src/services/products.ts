import { request } from './api';

export type Product = {
  id: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  stock: number;
  id_categoria?: number | null;
  formattedPrice?: string;
  isLowStock?: boolean;
  isOutOfStock?: boolean;
  stockStatus?: string;
};

type ProductsResponse = {
  success: boolean;
  data: Product[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

type ProductResponse = {
  success: boolean;
  data: Product;
};

export type ProductsQuery = {
  page?: number;
  limit?: number;
  idCategoria?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export async function getProducts(query: ProductsQuery = {}) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.set(key, String(value));
  });

  const queryString = params.toString();
  const path = queryString ? `/products?${queryString}` : '/products';

  return request<ProductsResponse>(path);
}

export async function getProductById(id: number | string) {
  return request<ProductResponse>(`/products/${id}`);
}