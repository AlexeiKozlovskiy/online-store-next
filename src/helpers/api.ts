import { Product } from '@/types/types';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { replaceUnderscore } from './helpersFunc';

export async function getData(): Promise<Product[]> {
  try {
    const res = await fetch(`https://online-store-api-7fyt.onrender.com/products`, { cache: 'force-cache' });
    return await res.json();
  } catch (error) {
    console.log('Error', error);
    return [];
  }
}

export async function getProductByID({ id }: { id: string }): Promise<Product | null> {
  try {
    const res = await fetch(`https://online-store-api-7fyt.onrender.com/products/${id}`, { cache: 'no-cache' });
    return await res.json();
  } catch (error) {
    console.log('Error', error);
    return null;
  }
}

export async function getProductIDByName(nameSlug: string): Promise<string> {
  const clikedId = getCookie('clikedId', { cookies });
  if (clikedId) return clikedId;
  const products = await getData();
  const findProduct = products.find(({ name }) => name === replaceUnderscore(nameSlug));
  return findProduct?.id ?? '';
}
