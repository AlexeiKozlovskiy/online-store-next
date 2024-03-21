'use client';
import './preloader.scss';

export function Preloader() {
  return (
    <div className="loading-spinner-container">
      <div data-testid="loading-spinner" className="loading-spinner"></div>
    </div>
  );
}
