'use client';
import './searchPanel.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/debouncedHook';
import { useMyURLContext } from '@/context/URLContext';
import Snow from '../snow/snow';

export function SearchPanel() {
  const [inputValue, setInputValue] = useState<string>('');
  const { inputSearchURL, setInputSearchURL } = useMyURLContext();
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    function setFromURL() {
      setInputValue(inputSearchURL ?? '');
    }
    setFromURL();
  }, [inputSearchURL]);

  useEffect(() => {
    setInputSearchURL(debouncedValue);
  }, [debouncedValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Snow>
      <div className="find-input-wrapper">
        <input
          className="find-input"
          type="search"
          placeholder="Search..."
          id="find-input"
          value={inputValue}
          onChange={handleChange}
        />
        <div className="find-input-img_search"></div>
      </div>
    </Snow>
  );
}
