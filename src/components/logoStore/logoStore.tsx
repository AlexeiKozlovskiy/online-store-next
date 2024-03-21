'use client';
import './logoStore.scss';

export function LogoStore() {
  return (
    <span data-testid="logo-store" className="logo-store">
      <span className="logo-store__title">Christmas</span>
      <span className="logo-store__img"></span>
      <span className="logo-store__subtitle">Decorations</span>
    </span>
  );
}
