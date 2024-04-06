'use client';
import { useSelector } from 'react-redux';
import { getIsInCart } from '@/helpers/helpersFunc';
import { CartItem, RootReducerProps } from '@/types/types';

interface ICartIsInCart {
  id: string;
}

export default function IsInCart({ id }: ICartIsInCart) {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);

  const isInCart = getIsInCart(cartItemsState, id);

  const inCart = <div className="product-summary__state-in-cart">In cart</div>;

  return isInCart && inCart;
}
