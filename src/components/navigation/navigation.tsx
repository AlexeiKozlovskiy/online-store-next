'use client';
import './navigation.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTE } from '@/types/types';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentTab = getCurrentTab();
    setValue(currentTab);
  }, [pathname]);

  function getCurrentTab() {
    const extractPath = `/${pathname.split('/').filter(Boolean)[0]}`;

    switch (extractPath) {
      case ROUTE.MAIN:
        return 0;
      case ROUTE.PRODUCT:
        return 1;
      case ROUTE.NEWS:
        return 2;
      case ROUTE.PAYMENT:
        return 3;
      case ROUTE.ABOUT:
        return 4;
      case ROUTE.CONTACTS:
        return 5;
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
        router.push(ROUTE.PRODUCT);
        break;
      case 2:
        router.push(ROUTE.NEWS);
        break;
      case 3:
        router.push(ROUTE.PAYMENT);
        break;
      case 4:
        router.push(ROUTE.ABOUT);
        break;
      case 5:
        router.push(ROUTE.CONTACTS);
        break;
      default:
        router.push(ROUTE.MAIN);
        break;
    }
  };

  return (
    <div className="header-navigation-wrapper">
      <nav className="header-navigation">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          aria-label="scrollable prevent tabs example"
          sx={{ '& .MuiTabs-indicator': { background: '#2e8b57' }, '& .MuiTabs-scrollButtons': { display: 'flex' } }}
        >
          {/* <Tab
            sx={{ '&.Mui-selected': { color: '#2e8b57' }, '&.MuiButtonBase-root': { fontSize: '0.7rem', minWidth: 'auto' } }}
            label="main"
          /> */}
          <Tab sx={{ '&.Mui-selected': { color: '#2e8b57' } }} label="main" />
          <Tab sx={{ '&.Mui-selected': { color: '#2e8b57' } }} label="products" />
          <Tab sx={{ '&.Mui-selected': { color: '#2e8b57' } }} label="news" />
          <Tab sx={{ '&.Mui-selected': { color: '#2e8b57' } }} label="Payment and delivery" />
          <Tab sx={{ '&.Mui-selected': { color: '#2e8b57' } }} label="about us" />
          <Tab sx={{ '&.Mui-selected': { color: '#2e8b57' } }} label="contacts" />
        </Tabs>
      </nav>
    </div>
  );
}
