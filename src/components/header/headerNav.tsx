'use client';
import './header.scss';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { LogoStore } from '@/components/logoStore/logoStore';
import { ButtonCross } from '@/components/buttonCross/buttonCross';
import { bodyNotScroll } from '@/helpers/helpersFunc';
import { SignUPModal } from '@/components/modalWindow/signUP/signUPModal';
import { Authentication, RootReducerProps } from '@/types/types';
import { SignINModal } from '@/components/modalWindow/signIN/signINModal';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useSelector } from 'react-redux';
import { UserModal } from '@/components/modalWindow/user/userModal';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { Preloader } from '../preloader/preloader';

const CartIcon = dynamic(() => import('./cartIcon'));
const UserIcon = dynamic(() => import('@/components/userIcon/userIcon'));
const HeaderAuth = dynamic(() => import('./headerAuth'), {
  loading: () => <Preloader additionalClassname="preloader-header" />,
  ssr: false,
});

export default function HeaderNav() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const { handelCloseModal, closeAnimationModal, openModals, setOpenModals } = useCloseOpenModalsContext();
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { isFetching } = useMyUserAuthContext();

  const { modalSignUP, modalSignIN, modalUser } = openModals;

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

    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [key]: true,
    }));
    setShowBurgerMenu(false);
  }

  const userIcon = <UserIcon handleClick={modalsUdater} />;
  const headerPreloader = <Preloader additionalClassname="preloader-header" />;
  const authBar = <HeaderAuth handelClick={modalsUdater} />;

  return (
    <>
      {modalSignUP && <SignUPModal handelCloseModal={handelCloseModal} />}
      {modalSignIN && <SignINModal handelCloseModal={handelCloseModal} />}
      {modalUser && <UserModal handelCloseModal={handelCloseModal} closeAnimationModal={closeAnimationModal} />}
      <div className="header-nav" data-show={showBurgerMenu}>
        <ButtonCross onClickCross={handleShowBurgerMenu} adittionClassName="close-burger-cross" />
        <LogoStore onClickBurger={logoClickBurger} />
        <div className="header-nav-contents">
          {!authenticated && !isFetching && authBar}
          {isFetching ? headerPreloader : authenticated && userIcon}
        </div>
        <CartIcon setShowBurgerMenu={setShowBurgerMenu} />
      </div>
      <div className="header-nav__icon" onClick={handleShowBurgerMenu}></div>
    </>
  );
}
