'use client';
import { useMyURLContext } from '@/context/URLContext';
import './logoStore.scss';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/types/types';

interface ILogoStore {
  onClickBurger?: () => void;
}

export function LogoStore({ onClickBurger }: ILogoStore) {
  const { removeAllSelected } = useMyURLContext();
  const router = useRouter();

  function handleClick() {
    removeAllSelected();
    router.push(ROUTE.MAIN);
    onClickBurger && onClickBurger();
  }

  return (
    <div className="logo-store" onClick={handleClick}>
      <p className="logo-store__title">Christmas</p>
      <span className="logo-store__img"></span>
      <span className="logo-store__subtitle">Decorations</span>
    </div>
  );
}
