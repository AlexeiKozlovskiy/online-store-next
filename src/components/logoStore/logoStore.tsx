'use client';
import { useMyURLContext } from '@/context/URLContext';
import './logoStore.scss';

export function LogoStore() {
  const { removeAllSelected } = useMyURLContext();

  return (
    <span data-testid="logo-store" className="logo-store" onClick={removeAllSelected}>
      <span className="logo-store__title">Christmas</span>
      <span className="logo-store__img"></span>
      <span className="logo-store__subtitle">Decorations</span>
    </span>
  );
}
