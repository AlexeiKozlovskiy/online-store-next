'use client';
import { useSelector } from 'react-redux';
import { CartItem, RootReducerProps } from '@/types/types';
import { Summary } from './cartSummary';
import { CartItemList } from './cartItem';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { PaymentModal } from '@/components/modalWindow/payment/paymentModal';

export default function CartList() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;
  const { handelCloseModal, openModals } = useCloseOpenModalsContext();

  return (
    <>
      {openModals.modalPayment && <PaymentModal handelCloseModal={handelCloseModal} />}
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
    </>
  );
}
