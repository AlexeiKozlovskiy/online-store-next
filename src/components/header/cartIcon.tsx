'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SetStateAction } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { ROUTE } from '@/types/types';

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
    <Link href={ROUTE.CART} className="header-cart" onClick={() => setShowBurgerMenu(false)}>
      <ShoppingCartCheckoutIcon sx={{ color: '#95bea1', fontSize: 50 }} />
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
