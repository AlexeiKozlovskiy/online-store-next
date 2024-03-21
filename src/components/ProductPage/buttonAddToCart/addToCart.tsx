'use client';
import { getIsInCart } from '@/helpers/helpersFunc';
import { addProductToCart, resetCountProducts } from '@/store/controller';
import { CartItem, IProductPageQty, Product, RootReducerProps } from '@/types/types';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

const ButtonAddMore = dynamic(() => import('./buttonAddMore'), {
  loading: () => <>ADD TO CART</>,
});
const ButtonAddToCart = dynamic(() => import('./buttonAddToCart'), {
  loading: () => <>ADD TO CART</>,
});

interface IAddToCart {
  product: Product | null;
}

export function AddToCart({ product }: IAddToCart) {
  const { id } = product as Product;

  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { countProducts } = useSelector<RootReducerProps, IProductPageQty>((state) => state.productPageQty);

  function handelAddClick() {
    addProductToCart(product!, countProducts);
    resetCountProducts();
  }

  const isInCart = getIsInCart(cartItemsState, id);

  return (
    <button className="button-add-cart button" data-id={id} onClick={handelAddClick}>
      {isInCart ? <ButtonAddMore /> : <ButtonAddToCart />}
    </button>
  );
}
