'use client';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { CartItem, RootReducerProps } from '@/types/types';
import { Preloader } from '@/components/preloader/preloader';

const EmptyCart = dynamic(() => import('./emptyCart'), {
  loading: () => <Preloader additionalClassname="preloader-cart" />,
  ssr: false,
});
const CartList = dynamic(() => import('./cartList'));

export default function Cart() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;

  return countCartItem ? <CartList /> : <EmptyCart />;
}
