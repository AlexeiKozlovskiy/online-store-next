'use client';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="shopping-cart__empty">
      <div className="shopping-cart__empty-subtitle">
        You have no items in your shopping cart. Click
        <br />
        <Link href="/">here</Link> to continue shopping.
      </div>
    </div>
  );
}
