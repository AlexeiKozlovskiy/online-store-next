'use client';
import { useTotalCartInfo } from '@/hooks/totalCartInfo';

interface IHeaderCountGoods {}

export default function HeaderTotalCountGoods({}: IHeaderCountGoods) {
  const { totalItems } = useTotalCartInfo();

  return totalItems;
}
