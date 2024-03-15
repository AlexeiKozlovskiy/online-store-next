import { getData, getProductByID } from '@/helpers/api';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { getIDProductFromURL } from '@/helpers/helpersFunc';
import { usePathname } from 'next/navigation';

export default async function ProductPage() {
  //   const data = await getData();
//   const pathname = usePathname();
  //   const idProduct = getIDProductFromURL(pathname);
  const idProduct = '55041244-80e3-4601-a493-f67656f081e1';
  const product = await getProductByID({ id: idProduct });

  return (
    <div className="main-catalog__products" data-testid="main-catalog">
      {product && <ProductCard product={product} />}
    </div>
  );
}
