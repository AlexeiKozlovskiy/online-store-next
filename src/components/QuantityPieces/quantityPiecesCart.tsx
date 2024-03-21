'use client';
import { useEffect, useState } from 'react';
import { addProductToCart, removeProductFromCart, setProductsQuantityInCart } from '@/store/controller';
import { QuantityPieces } from './quantityPieces';
import { Product } from '@/types/types';

interface IQuantity {
  id: string;
  quantity: number;
  stock: number;
  product: Product;
}

export function QuantityPiecesCart({ id, quantity, stock, product }: IQuantity) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  function handelArrowAppClick() {
    addProductToCart(product);
  }

  function handelArrowDownClick() {
    removeProductFromCart(id);
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (value.match(/[^0-9]/g)) {
      setInputValue('1');
      addProductToCart(product);
    } else if (+value >= stock) {
      setInputValue(stock.toString());
      setProductsQuantityInCart(product, stock);
    } else {
      setInputValue(value);
      setProductsQuantityInCart(product, +value);
    }
  }

  return (
    <QuantityPieces
      inputValue={inputValue.toString()}
      handelInput={handelInput}
      handelArrowAppClick={handelArrowAppClick}
      handelArrowDownClick={handelArrowDownClick}
    />
  );
}
