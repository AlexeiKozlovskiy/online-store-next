'use client';
import { useSelector } from 'react-redux';
import { Product, ProductsQweryParams, RootReducerProps } from '@/types/types';
import { ProductCard } from './productCard';
import { useEffect, useState } from 'react';
import { getProductsQwery } from '@/helpers/api';
import { updateBalancersPropertys } from '@/store/controller';
import {
  categoryBalancer,
  collectionBalancer,
  colorBalancer,
  dualRangesBalancer,
  sortCollectionBalancer,
  sortColorBalancer,
} from '@/helpers/helpersFunc';
import { BALANCERS, CATEGORIES_STOCK, PRICE, SIZE, STOCK } from '@/helpers/constant';
import { useMyURLContext } from '@/context/URLContext';

interface IProductListDoble {
  productsFromServer: Product[];
}

export function ProductList({ productsFromServer }: IProductListDoble) {
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>((state) => state.productsQweryParams);
  const [productsByQwery, setProductsByQwery] = useState<Product[]>(productsFromServer);
  const { selectedFilters, setSelectedFilters } = useMyURLContext();

  const { colorsSelected, collectionsSelected, categorySelected } = selectedFilters;
  const { BALANCER_COLOR, BALANCER_COLLECTION, BALANCER_CATEGORY, BALANCER_PRICE, BALANCER_SIZE, BALANCER_STOCK } = BALANCERS;

  useEffect(() => {
    if (qweryParams) {
      fetchProductsByQwery();
    } else {
      setProductsByQwery(productsFromServer);
    }
  }, [qweryParams]);

  useEffect(() => {
    if (productsByQwery.length) {
      refreshBalanser();
    }
  }, [productsByQwery.length]);

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

  async function fetchProductsByQwery() {
    const data = await getProductsQwery(qweryParams);
    setProductsByQwery(data);
  }

  const noItemsFound = (
    <section className="empty-catalog" data-testid="empty-catalog">
      No items found
    </section>
  );

  const productItems = productsByQwery.map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <div className="main-catalog__products" data-testid="main-catalog">
      {productsByQwery.length ? productItems : noItemsFound}
    </div>
  );
}
