'use client';
import { useEffect, useState } from 'react';
import { QuantityPieces } from './quantityPieces';
import { changeCountProducts } from '@/store/controller';
import { useSelector } from 'react-redux';
import { IProductPageQty, RootReducerProps } from '@/types/types';

interface IQuantity {
  stock: number;
}

export function QuantityPiecesProduct({ stock }: IQuantity) {
  const [inputValue, setInputValue] = useState('1');
  const { resetCount } = useSelector<RootReducerProps, IProductPageQty>((state) => state.productPageQty);

  useEffect(() => {
    changeCountProducts(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setInputValue('1');
  }, [resetCount]);

  function handelArrowAppClick() {
    if (inputValue && stock && +inputValue < stock) {
      setInputValue((el) => (+el + 1).toString());
    }
  }

  function handelArrowDownClick() {
    if (inputValue && +inputValue > 1) {
      setInputValue((el) => (+el - 1).toString());
    } else {
      setInputValue('1');
    }
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;
    if (value.match(/[^0-9]/g)) {
      setInputValue('1');
    } else if (+value >= stock) {
      setInputValue(stock.toString());
    } else {
      setInputValue(value);
    }
  }

  return (
    <QuantityPieces
      inputValue={inputValue}
      handelInput={handelInput}
      handelArrowAppClick={handelArrowAppClick}
      handelArrowDownClick={handelArrowDownClick}
    />
  );
}
