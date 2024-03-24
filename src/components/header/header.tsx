import './header.scss';
import { LogoStore } from '@/components/logoStore/logoStore';
import HeaderNav from './headerNav';

export default function Header() {
  return (
    <header data-testid="header" className="header wrapper">
      <div className="header__container">
        <LogoStore />
        <HeaderNav />
      </div>
    </header>
  );
}
