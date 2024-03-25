'use client';
import { useSelector } from 'react-redux';
import { ProductCard } from './productCard';
import { useEffect, useState } from 'react';
import { getProductsQwery } from '@/helpers/api';
import { ISelect, Product, ProductsQweryParams, RootReducerProps } from '@/types/types';
import { updateBalancersPropertys } from '@/store/controller';
import {
  categoryBalancer,
  collectionBalancer,
  colorBalancer,
  dualRangesBalancer,
  sortByFavorite,
  sortByKey,
  sortByName,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByStockAsc,
  sortByStockDesc,
  sortCollectionBalancer,
  sortColorBalancer,
} from '@/helpers/helpersFunc';
import { BALANCERS, CATEGORIES_STOCK, PRICE, SIZE, SORTING_SELECT, STOCK } from '@/helpers/constant';
import { useMyURLContext } from '@/context/URLContext';
import SortedViewPanel from '@/components/sortedViewPanel/sortedViewPanel';
import { useMainPagination } from '@/hooks/mainPaginationHook';
import { Pagination } from '@/components/pagination/pagination';

interface IProductListDoble {
  productsFromServer: Product[];
}

export function ProductList({ productsFromServer }: IProductListDoble) {
  const { swichedView, sortindViewOption, selectedFilters } = useMyURLContext();
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>((state) => state.productsQweryParams);
  const [productsByQwery, setProductsByQwery] = useState<Product[]>(sortByFavorite(productsFromServer));

  const { colorsSelected, collectionsSelected, categorySelected } = selectedFilters;
  const { BALANCER_COLOR, BALANCER_COLLECTION, BALANCER_CATEGORY, BALANCER_PRICE, BALANCER_SIZE, BALANCER_STOCK } = BALANCERS;

  useEffect(() => {
    if (productsByQwery.length) {
      refreshBalanser();
    }
  }, [productsByQwery.length]);

  useEffect(() => {
    sortingView(sortindViewOption);
  }, [sortindViewOption]);

  useEffect(() => {
    if (qweryParams) {
      fetchProductsByQwery();
    } else {
      setProductsByQwery(sortByFavorite(productsFromServer));
    }
  }, [qweryParams]);

  const { countPages, curPageMain, currentItems, handlePageClick } = useMainPagination({ productsByQwery });

  async function fetchProductsByQwery() {
    const data = await getProductsQwery(qweryParams);
    const products = sortByFavorite(data);
    setProductsByQwery(products);
  }

  function sortingView(viewOption: ISelect) {
    const { value } = viewOption;
    const { NAME, PRICE_ASC, PRICE_DESC, STOCK_ASC, STOCK_DESC } = SORTING_SELECT;

    switch (value) {
      case NAME:
        const sortName = sortByName(productsByQwery);
        setProductsByQwery(sortName);
        break;
      case PRICE_ASC:
        const priceAsc = sortByKey(productsByQwery, sortByPriceAsc);
        setProductsByQwery(priceAsc);
        break;
      case PRICE_DESC:
        const priceDesc = sortByKey(productsByQwery, sortByPriceDesc);
        setProductsByQwery(priceDesc);
        break;
      case STOCK_ASC:
        const stockAsc = sortByKey(productsByQwery, sortByStockAsc);
        setProductsByQwery(stockAsc);
        break;
      case STOCK_DESC:
        const stockDesc = sortByKey(productsByQwery, sortByStockDesc);
        setProductsByQwery(stockDesc);
        break;
      case '':
        const recomend = sortByFavorite(productsByQwery);
        setProductsByQwery(recomend);
        break;
    }
  }

  function refreshBalanser() {
    if (productsByQwery.length) {
      if (!colorsSelected.length) {
        const colorsValues = sortColorBalancer(colorBalancer(productsByQwery));
        updateBalancersPropertys(BALANCER_COLOR, colorsValues);
      }
      if (!collectionsSelected.length) {
        const collectionsValues = sortCollectionBalancer(collectionBalancer(productsByQwery));
        updateBalancersPropertys(BALANCER_COLLECTION, collectionsValues);
      }
      if (!categorySelected.length) {
        const categoryValues = categoryBalancer(productsByQwery, CATEGORIES_STOCK);
        updateBalancersPropertys(BALANCER_CATEGORY, categoryValues);
      }
      const priseValues = dualRangesBalancer(productsByQwery, PRICE);
      updateBalancersPropertys(BALANCER_PRICE, priseValues);
      const sizeValues = dualRangesBalancer(productsByQwery, SIZE);
      updateBalancersPropertys(BALANCER_SIZE, sizeValues);
      const stockValues = dualRangesBalancer(productsByQwery, STOCK);
      updateBalancersPropertys(BALANCER_STOCK, stockValues);
    }
  }

  const noItemsFound = (
    <section className="empty-catalog" data-testid="empty-catalog">
      No items found
    </section>
  );

  const productItems = currentItems.map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <>
      <SortedViewPanel countProducts={productsByQwery.length} />
      <div className={`main-catalog__products ${swichedView === 'row' && 'row-view'}`} data-testid="main-catalog">
        {productsByQwery.length ? productItems : noItemsFound}
      </div>
      {productsByQwery.length ? (
        <Pagination curPage={curPageMain} countPages={countPages} handlePageClick={handlePageClick} />
      ) : null}
    </>
  );
}
