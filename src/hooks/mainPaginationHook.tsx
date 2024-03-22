import { useMyURLContext } from '@/context/URLContext';
import { MAX_PAGES } from '@/helpers/constant';
import { handlerScrollUp } from '@/helpers/helpersFunc';
import { PageClickEvent, Product, ProductsQweryParams, RootReducerProps } from '@/types/types';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

interface MainPagination {
  productsByQwery: Product[];
}

export function useMainPagination({ productsByQwery: products }: MainPagination) {
  const { curPageMain, setCurPageMain, perMainPageOption, inputSearchURL } = useMyURLContext();
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>((state) => state.productsQweryParams);
  const [currentItems, setCurrentItems] = useState<Product[]>(products);
  const countProducts = products.length;
  const [countPages, setCountPages] = useState(MAX_PAGES);
  const [itemsPerPage, setItemsPerPage] = useState(+perMainPageOption.value);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (perMainPageOption.value === 'all' && countProducts) {
      setItemsPerPage(countProducts);
    } else if (countProducts) {
      setItemsPerPage(+perMainPageOption.value);
    }
  }, [perMainPageOption, countProducts]);

  useEffect(() => {
    const newOffset = ((curPageMain - 1) * itemsPerPage) % countProducts;
    if (newOffset) {
      setItemOffset(newOffset);
    }
    if (curPageMain === 1) {
      handlePageClick({ selected: 0 });
    }
  }, [curPageMain, itemsPerPage, products]);

  useLayoutEffect(() => {
    if (countProducts && itemsPerPage) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setCountPages(Math.ceil(countProducts / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, products]);

  useEffect(() => {
    inputSearchURL && resetOnFirstPage();
  }, [inputSearchURL, products]);

  useEffect(() => {
    qweryParams && handlePageClick({ selected: 0 });
  }, [qweryParams]);

  useEffect(() => {
    if (countProducts && countPages !== 1) {
      if (curPageMain > countPages) {
        resetOnFirstPage();
      }
    }
  }, [curPageMain, countProducts]);

  function resetOnFirstPage() {
    handlePageClick({ selected: 0 });
  }

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countProducts;
    setItemOffset(newOffset);
    setCurPageMain(event.selected + 1);
    handlerScrollUp();
  };

  return { countPages, curPageMain, currentItems, handlePageClick };
}
