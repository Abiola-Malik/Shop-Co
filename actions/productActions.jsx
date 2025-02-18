import { BASE_URL } from '@/constants';

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = await response.json();
  return data;
};
