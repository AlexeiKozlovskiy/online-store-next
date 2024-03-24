import { Balancers, ProductDualRangesFilters, ProductFilters, SortingsValue } from '@/types/types';

export const PRICE_MIN = 1.99;
export const PRICE_MAX = 34.99;
export const SIZE_MIN = 1;
export const SIZE_MAX = 700;
export const STOCK_MIN = 1;
export const STOCK_MAX = 50;

export const COLOR_STOCK = [
  { color: 'black' },
  { color: 'blue' },
  { color: 'brown' },
  { color: 'green' },
  { color: 'pink' },
  { color: 'purple' },
  { color: 'red' },
  { color: 'silver' },
  { color: 'white' },
  { color: 'yellow' },
];

export const MAX_PAGES = 12;

export const CATEGORIES_STOCK = [
  { category: 'Christmas decorations', count: 0 },
  { category: 'Garland & Wreath', count: 0 },
  { category: 'Do It Yourself', count: 0 },
  { category: 'Tree decorations', count: 0 },
  { category: 'Christmas lights', count: 0 },
];

export const COLLECTION_STOCK = [{ collection: 2021 }, { collection: 2022 }, { collection: 2023 }];

export const PRODUCT_FILTER_FIELDS: Record<string, keyof ProductFilters> = {
  COLOR: 'color',
  COLLECTION: 'collection',
  CATEGORY: 'category',
};

export const PRODUCT_DUAL_RANGE_FILTER_FIELDS: Record<string, keyof ProductDualRangesFilters> = {
  PRICE: 'price',
  SIZE: 'size',
  STOCK: 'stock',
};

export const { COLOR, COLLECTION, CATEGORY, PRICE, SIZE, STOCK } = Object.assign(
  PRODUCT_FILTER_FIELDS,
  PRODUCT_DUAL_RANGE_FILTER_FIELDS
);

export const PROMOCODES = [
  {
    id: 1,
    name: 'NEW-YEAR-2024',
    discount: 7,
  },
  {
    id: 2,
    name: 'JOLLY-XMAS',
    discount: 10,
  },
];

export const BALANCERS: Record<string, keyof Balancers> = {
  BALANCER_COLOR: 'balancerColor',
  BALANCER_COLLECTION: 'balancerCollection',
  BALANCER_CATEGORY: 'balancerCategory',
  BALANCER_PRICE: 'balancerPrise',
  BALANCER_SIZE: 'balancerSize',
  BALANCER_STOCK: 'balancerStock',
};

export const ITEMS_IN_PAGE = [
  { value: '5', label: 'Show items: 5' },
  { value: '10', label: 'Show items: 10' },
  { value: '20', label: 'Show items: 20' },
  { value: '30', label: 'Show items: 30' },
  { value: 'all', label: 'All' },
];

export const ITEMS_IN_PAGE_CART = [
  { value: '1', label: 'Show items: 1' },
  { value: '3', label: 'Show items: 3' },
  { value: '5', label: 'Show items: 5' },
  { value: '10', label: 'Show items: 10' },
  { value: 'all', label: 'All' },
];

export const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'name', label: 'Name' },
  { value: 'price-asc', label: 'Price ascending' },
  { value: 'price-desc', label: 'Price descending' },
  { value: 'stock-asc', label: 'Stock ascending' },
  { value: 'stock-desc', label: 'Stock descending' },
];

export const SORTING_SELECT: Record<string, SortingsValue> = {
  NAME: 'name',
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  STOCK_ASC: 'stock-asc',
  STOCK_DESC: 'stock-desc',
};
