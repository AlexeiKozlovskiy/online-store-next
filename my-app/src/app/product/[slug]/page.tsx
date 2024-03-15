'use client';
import { getData, getProductByID } from '@/helpers/api';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { getIDProductFromURL } from '@/helpers/helpersFunc';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/types';
// import { useRouter } from 'next/router';

export default function ProductPage() {
  //   const data = await getData();
  //   const pathname = usePathname();
  //   const idProduct = getIDProductFromURL(pathname);
  // const router = useRouter();
  // console.log(router);
  const pathname = usePathname();
  const idProduct = getIDProductFromURL(pathname);

  // const idProduct = '55041244-80e3-4601-a493-f67656f081e1';
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    collection: 0,
    stock: 0,
    color: '',
    size: 0,
    category: '',
    images: [],
  });
  useEffect(() => {
    async function getProducts() {
      if (idProduct) {
        // setIsFetching(true);
        const product = await getProductByID({ id: idProduct });
        // setIsFetching(false);
        if (product) {
          setProduct(product);
        }
      }
    }
    getProducts();
  }, [idProduct]);
  // const product = await getProductByID({ id: idProduct });

  return (
    <div className="main-catalog__products" data-testid="main-catalog">
      {product && <ProductCard product={product} />}
    </div>
  );
}
