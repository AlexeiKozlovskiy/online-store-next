'use client';
import './cartIcon.scss';
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
  setShowBurgerMenu?: (value: SetStateAction<boolean>) => void;
  fontSize?: number;
  additionStyles?: string;
}

export default function CartIcon({ fontSize, setShowBurgerMenu, additionStyles }: IcartIcon) {
  return (
    <Link href={ROUTE.CART} className="cart-icon" onClick={() => setShowBurgerMenu && setShowBurgerMenu(false)}>
      <ShoppingCartCheckoutIcon sx={{ color: '#95bea1', fontSize: fontSize || 50 }} />
      <div className={`${additionStyles === 'small' && 'small-amount-container'} cart-icon__amount-container`}>
        <p className={`${additionStyles === 'small' && 'small-amount'} cart-icon__amount`}>
          <TotalCountGoods />
        </p>
      </div>
      <div className={`${additionStyles === 'small' && 'small-cart-num'} cart-icon__num`}>
        <TotalPriceGoods />
      </div>
    </Link>
  );
}
