'use client';
import './logoStore.scss';
import { ROUTE } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useMyURLContext } from '@/context/URLContext';
import { ruluko, rugeBoogie } from '@/styles/nextFonts';

interface ILogoStore {
  onClickBurger?: () => void;
}

export function LogoStore({ onClickBurger }: ILogoStore) {
  const { removeAllSelected } = useMyURLContext();
  const router = useRouter();

  function handleClick() {
    removeAllSelected();
    onClickBurger && onClickBurger();
    router.push(ROUTE.MAIN);
  }

  return (
    <div className="logo-store" onClick={handleClick}>
      <p className={ruluko.className + ' logo-store__title'}>Christmas</p>
      <span className="logo-store__img"></span>
      <span className={rugeBoogie.className + ' logo-store__subtitle'}>Decorations</span>
    </div>
  );
}
