'use client';
import './cartPage.scss';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { PROMOCODES } from '@/helpers/constant';
import { formatPrice } from '@/helpers/helpersFunc';
import { useTotalCartInfo } from '@/hooks/totalCartInfo';
import { ButtonCross } from '@/components/buttonCross/buttonCross';
import { Authentication, PromocodeData, RootReducerProps } from '@/types/types';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { applyPromocode, isPromocodeAvailable, removePromocode } from '@/store/controller';

export function Summary() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<string | null>(null);
  const { setOpenModals } = useCloseOpenModalsContext();
  const promocodeState = useSelector<RootReducerProps, PromocodeData>((state) => state.promocode);
  const { totalItems, totalPrice, totalPriseByPromocode } = useTotalCartInfo();
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);

  function handelClickBTN() {
    setInputValue('');
    applyPromocode(inputRef.current!);
  }

  function handelClickPromoCode(name: string) {
    setInputValue(name);
    inputRef.current = name;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    inputRef.current = e.target.value;
  }

  function proceedClick() {
    if (authenticated) {
      checkAuth('modalPayment');
    } else {
      checkAuth('modalSignIN');
    }
  }

  function checkAuth(key: string) {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [key]: true,
    }));
  }

  const isAvailablePromos = !isPromocodeAvailable(inputRef.current!);

  const testPromos = (
    <div className="promo-test">
      Promo for test:{' '}
      {PROMOCODES.map(({ name, id }) => (
        <span key={id}>
          <div data-testid={name} className="promo-test__name" onClick={() => handelClickPromoCode(name)}>
            {name}
          </div>{' '}
        </span>
      ))}
    </div>
  );

  const promosList = (
    <div className="promocode-order__list">
      {promocodeState.applied.map(({ id, name, discount }) => {
        return (
          <div key={id} className="promocode-order__item">
            <div className="promocode-order__name">
              {name}-{discount}% OFF
              <br></br>($-{formatPrice(totalPrice * (discount / 100))})
            </div>
            <ButtonCross onClickCross={() => removePromocode(id)} adittionClassName="summary-cross" />
          </div>
        );
      })}
    </div>
  );

  return (
    <aside className="shopping-cart__summary">
      <div className="summery-info">
        <h3 className="summery-info__header">SUMMARY</h3>
        <div className="summery-info__order-container">
          <div className="order-container__content">
            <div className="order-container__items-count items-count">
              <div className="items-count__title">Items Total</div>
              <div className="items-count__count">{totalItems}</div>
            </div>
            <div className="order-container__total-count total-count">
              <div className="total-count__text">Order Total</div>
              <div className={`total-count__total-value ${promocodeState.applied.length && 'discount'}`}>
                ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="order-container__promocode promocode-order">
            {promosList}
            <div className="promocode-order__total-value">
              {promocodeState.applied.length ? `$${formatPrice(totalPriseByPromocode)}` : ''}
            </div>
          </div>
          <div className="order-container-button">
            <button className="button-order" onClick={proceedClick} data-testid="button-order">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <div className="shopping-promo">
        <div className="shopping-promo__container">
          <input className="input-promo" type="text" placeholder="Enter promo code" onChange={handleChange} value={inputValue} />
          <button className="button-apply" onClick={handelClickBTN} disabled={isAvailablePromos}>
            Apply
          </button>
        </div>
        {testPromos}
      </div>
    </aside>
  );
}
