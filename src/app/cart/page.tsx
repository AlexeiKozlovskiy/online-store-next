import './cartPage.scss';
import { ArrowBack } from '@/components/arrowBack/arrowBack';
import Cart from '@/components/cartPage/cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Store | Cart',
  description: 'Buy Christmas decorations to create a festive atmosphere at your home',
};

export default function CartPage() {
  return (
    <main className="shopping-cart wrapper">
      <h2 className="shopping-cart__header">SHOPPING CART</h2>
      <ArrowBack />
      <Cart />
    </main>
  );
}
