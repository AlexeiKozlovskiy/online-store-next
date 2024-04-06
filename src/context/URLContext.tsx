'use client';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX, SORT_OPTIONS, ITEMS_IN_PAGE } from '@/helpers/constant';
import { ISelect, ROUTE, SelectedFilters } from '@/types/types';
import { clearQweryParams, setQweryParams } from '@/store/controller';

interface IURLContext {
  sortindViewOption: ISelect;
  setSortindViewOption: (selectedOption: ISelect) => void;
  curPageMain: number;
  setCurPageMain: (value: number) => void;
  perMainPageOption: ISelect;
  setPerMainPageOption: (selectedOption: ISelect) => void;
  swichedView: string;
  setSwichedView: (value: string) => void;
  inputSearchURL: string | null;
  setInputSearchURL: (value: string | null) => void;
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
  removeAllSelected: () => void;
}

export const useMyURLContext = () => useContext(URLContext);

export const URLContext = createContext<IURLContext>({
  inputSearchURL: '',
  setInputSearchURL: () => null,
  sortindViewOption: SORT_OPTIONS[0],
  setSortindViewOption: () => null,
  curPageMain: 1,
  setCurPageMain: () => null,
  perMainPageOption: ITEMS_IN_PAGE[2],
  setPerMainPageOption: () => null,
  swichedView: 'block',
  setSwichedView: () => null,

  selectedFilters: {
    colorsSelected: [],
    collectionsSelected: [],
    categorySelected: [],
    priceSelected: [PRICE_MIN, PRICE_MAX],
    sizeSelected: [SIZE_MIN, SIZE_MAX],
    stockSelected: [STOCK_MIN, STOCK_MAX],
  },
  setSelectedFilters: () => null,
  removeAllSelected: () => null,
});

export const URLContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    colorsSelected: [],
    collectionsSelected: [],
    categorySelected: [],
    priceSelected: [PRICE_MIN, PRICE_MAX],
    sizeSelected: [SIZE_MIN, SIZE_MAX],
    stockSelected: [STOCK_MIN, STOCK_MAX],
  });
  const [inputSearchURL, setInputSearchURL] = useState<string | null>('');
  const [sortindViewOption, setSortindViewOption] = useState<ISelect>(SORT_OPTIONS[0]);
  const [curPageMain, setCurPageMain] = useState<number>(1);
  const [perMainPageOption, setPerMainPageOption] = useState<ISelect>(ITEMS_IN_PAGE[2]);
  const [swichedView, setSwichedView] = useState('block');
  const { colorsSelected, collectionsSelected, categorySelected, priceSelected, sizeSelected, stockSelected } = selectedFilters;

  const router = useRouter();
  const pathname = usePathname();

  const [minPrice, maxPrice] = priceSelected;
  const [minSize, maxSize] = sizeSelected;
  const [minStock, maxStock] = stockSelected;

  useEffect(() => {
    function setDataFromUrl() {
      const queryParams = new URLSearchParams(location.search);
      const getQueryParam = (paramName: string) => queryParams.getAll(paramName);
      const [colors] = getQueryParam('colors');
      const [collections] = getQueryParam('collections');
      const [categories] = getQueryParam('categories');
      const valMinPrice = getQueryParam('minPrice');
      const valMaxPrice = getQueryParam('maxPrice');
      const valMinSize = getQueryParam('minSize');
      const valMaxSize = getQueryParam('maxSize');
      const valMinStock = getQueryParam('minStock');
      const valMaxStock = getQueryParam('maxStock');
      const [search] = getQueryParam('q');
      const [viewOption] = getQueryParam('sortBy');
      const [curPageMain] = getQueryParam('page');
      const [perMainOption] = getQueryParam('perPage');
      const [swichedViews] = getQueryParam('switchView');

      updatedFilters(colors, collections, categories, valMinPrice, valMaxPrice, valMinSize, valMaxSize, valMinStock, valMaxStock);
      updatedRowBlockView(viewOption);
      updatedPagination(curPageMain, perMainOption);
      search && setInputSearchURL(search);
      swichedViews && setSwichedView(swichedViews);
    }
    setDataFromUrl();
  }, [pathname]);

  useEffect(() => {
    function setDataInURL() {
      const params = new URLSearchParams();

      setFiltersQweryInParams(params);
      setPagesQweryInParams(params);

      if (pathname === ROUTE.PRODUCTS) {
        router.push(`${pathname}?${params.toString()}`);
      }
    }
    setDataInURL();
  }, [
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
    inputSearchURL,
    sortindViewOption.value,
    curPageMain,
    perMainPageOption,
    swichedView,
    pathname,
  ]);

  useEffect(() => {
    function setDataInReduxState() {
      const queryString = new URLSearchParams();
      setFiltersQweryInParams(queryString);
      setQweryParams(queryString.toString());
    }
    setDataInReduxState();
  }, [colorsSelected, collectionsSelected, categorySelected, priceSelected, sizeSelected, stockSelected, inputSearchURL]);

  const setFiltersQweryInParams = (params: URLSearchParams) => {
    if (colorsSelected.length) {
      params.set('colors', colorsSelected.join(','));
    }
    if (collectionsSelected.length) {
      params.set('collections', collectionsSelected.join(','));
    }
    if (categorySelected.length) {
      params.set('categories', categorySelected.join(','));
    }
    if (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX) {
      if (minPrice && maxPrice) {
        params.set('minPrice', minPrice!.toString());
        params.set('maxPrice', maxPrice!.toString());
      }
    }
    if (minSize !== SIZE_MIN || maxSize !== SIZE_MAX) {
      if (minSize && maxSize) {
        params.set('minSize', minSize!.toString());
        params.set('maxSize', maxSize!.toString());
      }
    }
    if (minStock !== STOCK_MIN || maxStock !== STOCK_MAX) {
      if (minStock && maxStock) {
        params.set('minStock', minStock!.toString());
        params.set('maxStock', maxStock!.toString());
      }
    }
    if (inputSearchURL) {
      params.set('q', inputSearchURL);
    }
  };

  const setPagesQweryInParams = (params: URLSearchParams) => {
    if (sortindViewOption.value.length) {
      params.set('sortBy', sortindViewOption.value);
    }
    if (curPageMain > 1 && location.pathname === ROUTE.PRODUCTS) {
      params.set('page', curPageMain.toString());
    }
    if (+perMainPageOption.value !== 20 && location.pathname === ROUTE.PRODUCTS) {
      params.set('perPage', perMainPageOption.value);
    }
    if (swichedView === 'row') {
      params.set('switchView', swichedView);
    }
  };

  function updatedFilters(
    colors: string,
    collections: string,
    categories: string,
    valMinPrice: string[],
    valMaxPrice: string[],
    valMinSize: string[],
    valMaxSize: string[],
    valMinStock: string[],
    valMaxStock: string[]
  ) {
    let filters = { ...selectedFilters };

    if (colors) {
      filters = { ...filters, colorsSelected: colors.split(',') };
    }
    if (collections) {
      filters = { ...filters, collectionsSelected: collections.split(',').map(Number) };
    }
    if (categories) {
      filters = { ...filters, categorySelected: categories.split(',') };
    }
    if (valMinPrice.length || valMaxPrice.length) {
      filters = { ...filters, priceSelected: [+valMinPrice, +valMaxPrice] };
    }
    if (valMinSize.length || valMaxSize.length) {
      filters = { ...filters, sizeSelected: [+valMinSize, +valMaxSize] };
    }
    if (valMinStock.length || valMaxStock.length) {
      filters = { ...filters, stockSelected: [+valMinStock, +valMaxStock] };
    }
    setSelectedFilters(filters);
  }

  function updatedPagination(curPageMain: string, perMainOption: string) {
    if (curPageMain && location.pathname === ROUTE.PRODUCTS) {
      setCurPageMain(+curPageMain);
    }

    if (perMainOption && location.pathname === ROUTE.PRODUCTS) {
      setPerMainPageOption({
        value: perMainOption,
        label: ITEMS_IN_PAGE.filter(({ value, label }) => {
          if (value === perMainOption) {
            return label;
          }
        })[0].label,
      });
    }
  }

  function updatedRowBlockView(viewOption: string) {
    viewOption &&
      setSortindViewOption({
        value: viewOption,
        label: SORT_OPTIONS.filter(({ value, label }) => {
          if (value === viewOption) {
            return label;
          }
        })[0].label,
      });
  }

  function removeAllSelected() {
    setSelectedFilters({
      colorsSelected: [],
      collectionsSelected: [],
      categorySelected: [],
      priceSelected: [PRICE_MIN, PRICE_MAX],
      sizeSelected: [SIZE_MIN, SIZE_MAX],
      stockSelected: [STOCK_MIN, STOCK_MAX],
    });
    setInputSearchURL('');
    setSortindViewOption(SORT_OPTIONS[0]);
    setCurPageMain(1);
    setPerMainPageOption(ITEMS_IN_PAGE[2]);
    clearQweryParams();
    setSwichedView('block');
  }

  return (
    <URLContext.Provider
      value={{
        sortindViewOption,
        setSortindViewOption,
        inputSearchURL,
        setInputSearchURL,
        curPageMain,
        setCurPageMain,
        perMainPageOption,
        setPerMainPageOption,
        swichedView,
        setSwichedView,
        selectedFilters,
        setSelectedFilters,
        removeAllSelected,
      }}
    >
      {children}
    </URLContext.Provider>
  );
};
