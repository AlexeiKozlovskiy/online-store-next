'use client';
import '../Header.scss';
import Link from 'next/link';
import { useState } from 'react';
import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';
import { bodyNotScroll } from '@/helpers/helpersFunc';
import HeaderAuth from '@/components/Header/HeaderAuth/HeaderAuth';

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
          <HeaderLogo />
        </Link>
        <div className="header-nav-contents">
          <HeaderAuth handelClick={modalsUdater} />
        </div>
        <Link href="/cart" className="header-cart" onClick={() => setShowBurgerMenu(false)}>
          <div className="header-cart__img"></div>
          <div className="header-cart__amount-container">
            <p className="header-cart__amount">{0}</p>
          </div>
          <div className="header-cart__num">${0}</div>
        </Link>
      </div>
      <div className="header-nav__icon" onClick={handleShowBurgerMenu}></div>
    </>
  );
}
