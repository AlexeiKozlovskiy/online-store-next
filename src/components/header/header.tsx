import './header.scss';
import Link from 'next/link';
import { LogoStore } from '@/components/logoStore/logoStore';
import HeaderNav from './headerNav';

export default function Header() {
  return (
    <header data-testid="header" className="header wrapper">
      <div className="header__container">
        <Link href="/" className="header-link">
          <LogoStore />
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
