import { Balancers, CardImg, ModalsValue, ProductDualRangesFilters, ProductFilters, SortingsValue } from '@/types/types';

export const NEST_SERVICE_URL = process.env.NEXT_PUBLIC_URL_NEST_SERVICE;
// export const NEST_SERVICE_URL = 'http://localhost:4000';

export const API_ROUTES = {
  SIGN_UP: `${NEST_SERVICE_URL}/auth/register`,
  SIGN_IN: `${NEST_SERVICE_URL}/auth/login`,
  SIGN_IN_GOOGLE: `${NEST_SERVICE_URL}/auth/login/google`,
  GET_USER: `${NEST_SERVICE_URL}/user/`,
  REFRESH: `${NEST_SERVICE_URL}/auth/refresh/`,
  PROFILE: `${NEST_SERVICE_URL}/profile/`,
  PROFILE_CREATE: `${NEST_SERVICE_URL}/profile/create`,
  PROFILE_UPDATE: `${NEST_SERVICE_URL}/profile/update`,
  FAVORITES: `${NEST_SERVICE_URL}/favorites/`,
  PODUCTS: `${NEST_SERVICE_URL}/products`,
};

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

export const MODAL_WINDOWS: Record<string, ModalsValue> = {
  SIGN_UP: 'modalSignUP',
  SIGN_IN: 'modalSignIN',
  USER: 'modalUser',
  PAYMENT: 'modalPayment',
};

export const TEST_USER_DATA = {
  name: 'Rubi Rhod',
  address: 'United States, New-York, Times Square',
  phone: '+37533123456789',
  nameCard: 'RUBI RHOD',
  numberCard: '5555 4444 3333 2222',
  dateCard: '05/25',
  cvvCard: '123',
};

export const CARD_IMAGES: Record<string, CardImg> = {
  '3': 'cards__img-express',
  '4': 'cards__img-visa',
  '5': 'cards__img-mastercard',
};

export const CATEGORIES_MAIN_PAGE = [
  {
    title: 'Christmas lights',
    pathRedirect: '/products?categories=Christmas+lights',
    image: '/assets/products/50-led-light-chain-warm-white-battery-operated-indoor-use(1).jpg',
    altImage: 'Christmas lights',
  },
  {
    title: 'Garland & Wreath',
    pathRedirect: '/products?categories=Garland+%26+Wreath',
    image: '/assets/products/garland-with-snow-20-x-270cm.jpg',
    altImage: 'Garland & Wreath',
  },
  {
    title: 'Christmas decorations',
    pathRedirect: '/products?categories=Christmas+decorations',
    image: '/assets/products/snowman-with-lantern-magnesia-48cm.jpg',
    altImage: 'Christmas decorations',
  },
  {
    title: 'Do It Yourself',
    pathRedirect: '/products?categories=Do+It+Yourself',
    image: '/assets/products/3-diy-silver-christmas-baubles-8-cm-with-markers(1).jpg',
    altImage: 'Do It Yourself',
  },
  {
    title: 'Tree decorations',
    pathRedirect: '/products?categories=Tree+decorations',
    image: '/assets/products/jellyfish-glass-hanging-figurine-12cm-blue(1).jpg',
    altImage: 'Tree decorations',
  },
  {
    title: 'Black decorations',
    pathRedirect: '/products?colors=black',
    image: '/assets/products/black-bauble-with-ruches-8-cm(1).jpg',
    altImage: 'Black decorations',
  },
  {
    title: 'NEW decorations',
    pathRedirect: '/products?collections=2023',
    image: '/assets/products/blowfish-glass-hanging-figurine-9cm-blue.jpg',
    altImage: 'NEW decorations',
  },
];

export const NEWS = [
  {
    date: '5 march 2024',
    title: '8 March',
    image: '/assets/news/8march.jpg',
    description:
      'Dear customers, we inform you about the opening hours of our store during the holidays. Due to International Womens Day, March 8, the store is closed. We apologize for any inconvenience and look forward to seeing you on March 11th',
  },
  {
    date: '21 december 2023',
    title: 'Christmas discounts',
    image: '/assets/news/kartinka-v-novosti.jpg',
    description:
      'We wish you a Merry Christmas and invite you to our store! In honor of this bright holiday, we have prepared a special offer for you - discounts of up to 20% on artificial Christmas trees and pine trees!',
  },
  {
    date: '30 november 2023',
    title: 'Winter Mode',
    image: '/assets/news/winter-rezhim-raboty.webp',
    description:
      'Dear friends! Our store is switching to winter operating hours. If you have any questions, please call and clarify the information you are interested in. From 01.12.2023 the store is open: Mon - Fri 9:00 - 19:00. Sat 10:00 - 18:00. Sun 10:00 - 17:00.',
  },
];

export interface FavoritesData {
  userId: string;
  favorites: string[];
}
