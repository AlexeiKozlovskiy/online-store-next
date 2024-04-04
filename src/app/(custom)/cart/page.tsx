import './cartPage.scss';
import type { Metadata } from 'next';
import Cart from './cart';
import { roboto } from '@/styles/nextFonts';
import { ArrowBack } from '@/components/arrowBack/arrowBack';

export const metadata: Metadata = {
  title: 'Online Store | Cart',
  description: 'Buy Christmas decorations to create a festive atmosphere at your home',
};

export default function CartPage() {
  return (
    <main className={roboto.className + ' shopping-cart wrapper'}>
      <h2 className="shopping-cart__header">SHOPPING CART</h2>
      <ArrowBack />
      <Cart />
    </main>
  );
}
