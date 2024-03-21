'use client';
import { CartItemList } from '@/components/cartPage/cartItemList';
import { Summary } from '@/components/cartPage/cartSummary';
import { CartItem, RootReducerProps } from '@/types/types';
import { useSelector } from 'react-redux';

export default function TakenCart() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;

  return (
    <div className="shopping-cart__container">
      <div className="shopping-cart__pagination-table-container">
        <div className="shopping-cart__pagination-container"></div>
        <table className="shopping-cart__table">
          <thead className="cart-table__header-container">
            <tr className="cart-table__content">
              <th className="cart-table__number">№</th>
              <th className="cart-table__item">Item</th>
              <th className="cart-table__info">Info</th>
              <th className="cart-table__price">Price</th>
              <th className="cart-table__amount">Amount</th>
              <th className="cart-table__subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {countCartItem && cartItemsState.map((cartItem: CartItem) => <CartItemList key={cartItem.cartID} {...cartItem} />)}
          </tbody>
        </table>
      </div>
      <Summary />
    </div>
  );
}
