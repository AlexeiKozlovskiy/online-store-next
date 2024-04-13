'use client';
import './navigation.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTE } from '@/types/types';
import { useEffect, useState } from 'react';
import { SxProps, Theme, useMediaQuery } from '@mui/material';
import CartIcon from '../header/cartIcon';
import { useCheckScrollHook } from '@/hooks/checkScrollHook';

export default function Navigation() {
  const [viewCartIcon, setViewCartIcon] = useState(false);
  const mediaMatches = useMediaQuery('(max-width:600px)');
  const pathname = usePathname();
  const router = useRouter();
  const color = '#2e8b57';
  const hasScroll = useCheckScrollHook(130);

  useEffect(() => {
    if (hasScroll) {
      setViewCartIcon(true);
    } else {
      hideCartIcon();
    }
  }, [hasScroll]);

  function hideCartIcon() {
    const cartIcon = document.querySelector('.cartIcon-animation-container') as HTMLDivElement;
    if (cartIcon) {
      cartIcon.classList.add('cartIcon-hide');
      setTimeout(() => {
        setViewCartIcon(false);
      }, 200);
    }
  }

  useEffect(() => {
    const currentTab = getCurrentTab();
    setValue(currentTab);
  }, [pathname]);

  function getCurrentTab() {
    const extractPath = `/${pathname.split('/').filter(Boolean)[0]}`;

    switch (extractPath) {
      case ROUTE.MAIN:
        return 0;
      case ROUTE.PRODUCTS:
        return 1;
      case ROUTE.NEWS:
        return 2;
      case ROUTE.ABOUT:
        return 3;
      case ROUTE.CONTACTS:
        return 4;
      default:
        return 0;
    }
  }

  const currentTab = getCurrentTab();
  const [value, setValue] = useState(currentTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push(ROUTE.MAIN);
        break;
      case 1:
        router.push(ROUTE.PRODUCTS);
        break;
      case 2:
        router.push(ROUTE.NEWS);
        break;
      case 3:
        router.push(ROUTE.ABOUT);
        break;
      case 4:
        router.push(ROUTE.CONTACTS);
        break;
      default:
        router.push(ROUTE.MAIN);
        break;
    }
  };

  function checkStylesTab(): SxProps<Theme> {
    if (mediaMatches) {
      return { '&.Mui-selected': { color }, '&.MuiButtonBase-root': { fontSize: '0.6rem', minWidth: 'auto' } };
    } else {
      return { '&.Mui-selected': { color } };
    }
  }

  function checkStylesPanel(): SxProps<Theme> {
    if (mediaMatches) {
      return { '& .MuiTabs-indicator': { background: color }, '& .MuiTabs-scrollButtons': { display: 'flex' } };
    } else {
      return { '& .MuiTabs-indicator': { background: color } };
    }
  }

  const stylesTab = checkStylesTab();
  const stylesPanel = checkStylesPanel();

  return (
    <div className="header-navigation-wrapper">
      <nav className="header-navigation">
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box> */}
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          aria-label="scrollable prevent tabs example"
          sx={stylesPanel}
        >
          <Tab sx={stylesTab} label="main" />
          <Tab sx={stylesTab} label="products" />
          <Tab sx={stylesTab} label="news" />
          <Tab sx={stylesTab} label="about project" />
          <Tab sx={stylesTab} label="contacts" />
        </Tabs>
      </nav>
      <div className="cartIcon-nav-container">
        {viewCartIcon && (
          <div className="cartIcon-animation-container">
            <CartIcon fontSize={20} additionStyles={'small'} />
          </div>
        )}
      </div>
    </div>
  );
}
