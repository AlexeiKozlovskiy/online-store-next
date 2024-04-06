'use client';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { roboto } from '@/styles/nextFonts';
import { getIsInCart } from '@/helpers/helpersFunc';
import { addProductToCart, resetCountProducts } from '@/store/controller';
import { CartItem, IProductPageQty, Product, RootReducerProps } from '@/types/types';

const ButtonAddMore = dynamic(() => import('./buttonAddMore'));
const ButtonAddToCart = dynamic(() => import('./buttonAddToCart'));

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
    <button className={roboto.className + ' button-add-cart button'} data-id={id} onClick={handelAddClick}>
      {isInCart ? <ButtonAddMore /> : <ButtonAddToCart />}
    </button>
  );
}
