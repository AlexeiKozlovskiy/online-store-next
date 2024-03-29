import './header.scss';
import { LogoStore } from '@/components/logoStore/logoStore';
import HeaderAuthNav from './headerAuthNav';

export default function Header() {
  return (
    <header data-testid="header" className="header wrapper">
      <div className="header__container">
        <LogoStore />
        <HeaderAuthNav />
      </div>
    </header>
  );
}
