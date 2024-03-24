'use client';
import './qweryPanel.scss';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  PRODUCT_FILTER_FIELDS,
  PRODUCT_DUAL_RANGE_FILTER_FIELDS,
} from '@/helpers/constant';
import { useState } from 'react';
import { useMyURLContext } from '@/context/URLContext';
import { useSelector } from 'react-redux';
import { ProductsQweryParams, RootReducerProps } from '@/types/types';

export default function QweryPanel() {
  const [copedLink, setCopedLink] = useState(false);
  const { selectedFilters, removeAllSelected, setSelectedFilters } = useMyURLContext();
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>((state) => state.productsQweryParams);

  const { colorsSelected, collectionsSelected, categorySelected, priceSelected, sizeSelected, stockSelected } = selectedFilters;

  const [minPrice, maxPrice] = priceSelected;
  const [minSize, maxSize] = sizeSelected;
  const [minStock, maxStock] = stockSelected;

  function handelCopyLink() {
    setCopedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setCopedLink(false);
    }, 1000);
  }
  const { COLOR, COLLECTION, CATEGORY, PRICE, SIZE, STOCK } = Object.assign(
    PRODUCT_FILTER_FIELDS,
    PRODUCT_DUAL_RANGE_FILTER_FIELDS
  );

  function removeItemFilterClick(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    const { value, params } = dataset;
    switch (params) {
      case COLOR:
        setSelectedFilters({ ...selectedFilters, colorsSelected: colorsSelected.filter((el) => el !== value) });
        break;
      case COLLECTION:
        setSelectedFilters({ ...selectedFilters, collectionsSelected: collectionsSelected.filter((el) => el !== Number(value)) });
        break;
      case CATEGORY:
        setSelectedFilters({ ...selectedFilters, categorySelected: categorySelected.filter((el) => el !== value) });
        break;
      case PRICE:
        setSelectedFilters({ ...selectedFilters, priceSelected: [PRICE_MIN, PRICE_MAX] });
        break;
      case SIZE:
        setSelectedFilters({ ...selectedFilters, sizeSelected: [SIZE_MIN, SIZE_MAX] });
        break;
      case STOCK:
        setSelectedFilters({ ...selectedFilters, stockSelected: [STOCK_MIN, STOCK_MAX] });
        break;
    }
  }

  const colorFilter = colorsSelected.map((color) => {
    return (
      <div key={color} className="selected-filters__item selected-item">
        <div className="selected-item__name">{color}</div>
        <div className="selected-item__remove-btn" data-params="color" data-value={color} onClick={removeItemFilterClick}></div>
      </div>
    );
  });

  const collectionFilter = collectionsSelected.map((collection) => {
    return (
      <div key={collection} className="selected-filters__item selected-item">
        <div className="selected-item__name">{collection}</div>
        <div
          className="selected-item__remove-btn"
          data-params="collection"
          data-value={collection}
          onClick={removeItemFilterClick}
        ></div>
      </div>
    );
  });

  const categoryFilter = categorySelected.map((category) => {
    return (
      <div key={category} className="selected-filters__item selected-item">
        <div className="selected-item__name">{category}</div>
        <div
          className="selected-item__remove-btn"
          data-params="category"
          data-value={category}
          onClick={removeItemFilterClick}
        ></div>
      </div>
    );
  });

  const priceFilter = () => {
    if (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX) {
      return (
        <div key={minPrice} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Price: ${minPrice} - ${maxPrice}
          </div>
          <div className="selected-item__remove-btn" data-params="price" onClick={removeItemFilterClick}></div>
        </div>
      );
    }
  };

  const sizeFilter = () => {
    if (minSize !== SIZE_MIN || maxSize !== SIZE_MAX) {
      return (
        <div key={minSize} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Size: {minSize}cm - {maxSize}cm
          </div>
          <div className="selected-item__remove-btn" data-params="size" onClick={removeItemFilterClick}></div>
        </div>
      );
    }
  };

  const stockFilter = () => {
    if (minStock !== STOCK_MIN || maxStock !== STOCK_MAX) {
      return (
        <div key={minStock} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Stock: {minStock} - {maxStock}
          </div>
          <div className="selected-item__remove-btn" data-params="stock" onClick={removeItemFilterClick}></div>
        </div>
      );
    }
  };

  const allSelectedFilters = [colorFilter, collectionFilter, categoryFilter, priceFilter(), sizeFilter(), stockFilter()];

  const copied = <div className="selected-filters__copy-link">Copied</div>;

  const copyLink = (
    <div className="selected-filters__copy-link" onClick={handelCopyLink}>
      Copy link
    </div>
  );

  const panel = (
    <div className="selected-section__filters selected-filters">
      <div className="selected-filters__title">Selected filters:</div>
      {allSelectedFilters}
      <div className="selected-filters__remove-filters" onClick={removeAllSelected}>
        Clear all
      </div>
      {copedLink ? copied : copyLink}
    </div>
  );

  return qweryParams && panel;
}
