import { Product } from '@/types/types';

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
    const res = await fetch(`https://online-store-api-7fyt.onrender.com/products/${id}`, { cache: 'force-cache' });
    return await res.json();
  } catch (error) {
    console.log('Error', error);
    return null;
  }
}
