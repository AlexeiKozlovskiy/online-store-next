'use client';
import { useRouter } from 'next/navigation';
import { addProductToCart } from '@/store/controller';
import { IProductPageQty, Product, ROUTE, RootReducerProps } from '@/types/types';
import { useSelector } from 'react-redux';

interface IBuyNow {
  product: Product | null;
}

export default function ButtonBuyNow({ product }: IBuyNow) {
  const router = useRouter();
  const { countProducts } = useSelector<RootReducerProps, IProductPageQty>((state) => state.productPageQty);

  function handelBuyNowBtn() {
    addProductToCart(product!, countProducts);
    router.push(ROUTE.CART);
  }

  return (
    <button className="button-buy-now button" onClick={handelBuyNowBtn} data-testid="button-buy-now">
      BUY NOW
    </button>
  );
}
