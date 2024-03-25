'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SetStateAction } from 'react';

const TotalCountGoods = dynamic(() => import('./headerTotalCount'), {
  loading: () => <>0</>,
});
const TotalPriceGoods = dynamic(() => import('./headerTotalPrice'), {
  loading: () => <>$0</>,
});

interface IcartIcon {
  setShowBurgerMenu: (value: SetStateAction<boolean>) => void;
}

export default function CartIcon({ setShowBurgerMenu }: IcartIcon) {
  return (
    <Link href="/cart" className="header-cart" onClick={() => setShowBurgerMenu(false)}>
      <div className="header-cart__img"></div>
      <div className="header-cart__amount-container">
        <p className="header-cart__amount">
          <TotalCountGoods />
        </p>
      </div>
      <div className="header-cart__num">
        <TotalPriceGoods />
      </div>
    </Link>
  );
}
