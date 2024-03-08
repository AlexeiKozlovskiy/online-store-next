import './Header.scss';
import Link from 'next/link';
import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import HeaderNav from './HeaderNav/HeaderNav';

export default function Header() {
  return (
    <header data-testid="header" className="header wrapper">
      <div className="header__container">
        <Link href="/" className="header-link">
          <HeaderLogo />
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
