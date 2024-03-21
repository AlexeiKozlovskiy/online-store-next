'use client';
import { useTotalCartInfo } from '@/hooks/totalCartInfo';

interface IHeaderTotalPriceGoods {}

export default function HeaderTotalPriceGoods({}: IHeaderTotalPriceGoods) {
  const { totalPriseByPromocode } = useTotalCartInfo();

  return <>${totalPriseByPromocode.toFixed(2)}</>;
}
