'use client';
import './preloader.scss';

interface IPreloader {
  additionalClassname?: string;
}

export function Preloader({ additionalClassname }: IPreloader) {
  return (
    <div className={`preloader-cart ${additionalClassname}`}>
      <div data-testid="loading-spinner" className="loading-spinner"></div>
    </div>
  );
}
