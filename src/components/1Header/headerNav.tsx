'use client';
import './header.scss';
import Link from 'next/link';
import { useState } from 'react';
import { LogoStore } from '@/components/logoStore/logoStore';
import { ButtonCross } from '@/components/buttonCross/buttonCross';
import { bodyNotScroll } from '@/helpers/helpersFunc';
import { HeaderAuth } from '@/components/header/headerAuth';
import dynamic from 'next/dynamic';

const TotalCountGoods = dynamic(() => import('./headerTotalCount'), {
  loading: () => <>0</>,
});
const TotalPriceGoods = dynamic(() => import('./headerTotalPrice'), {
  loading: () => <>$0</>,
});

export default function HeaderNav() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  function handleShowBurgerMenu() {
    setShowBurgerMenu((prev) => !prev);
    bodyNotScroll();
  }

  function logoClickBurger() {
    setShowBurgerMenu(false);
  }

  function modalsUdater(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    const key = dataset.id!;
    console.log(key);
    setShowBurgerMenu(false);
  }

  return (
    <>
      <div className="header-nav" data-show={showBurgerMenu}>
        <ButtonCross onClickCross={handleShowBurgerMenu} adittionClassName="close-burger-cross" />
        <Link href="/" className="header-link" onClick={logoClickBurger}>
          <LogoStore />
        </Link>
        <div className="header-nav-contents">
          <HeaderAuth handelClick={modalsUdater} />
        </div>
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
      </div>
      <div className="header-nav__icon" onClick={handleShowBurgerMenu}></div>
    </>
  );
}
