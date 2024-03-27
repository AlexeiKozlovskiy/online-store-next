'use client';
import { useSelector } from 'react-redux';
import { useAnimations } from '@/hooks/animationsHook';
import { IProductPageQty, RootReducerProps } from '@/types/types';

interface IshakeField {
  stock: number;
  children: React.ReactNode;
}

export default function ShakeField({ children, stock }: IshakeField) {
  const { countProducts } = useSelector<RootReducerProps, IProductPageQty>((state) => state.productPageQty);

  const isShake = useAnimations({ quantity: countProducts, stock });

  return <p className={`${isShake && 'shake-product'}`}>{children}</p>;
}
