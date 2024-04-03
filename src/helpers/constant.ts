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
    srcImage: '/assets/products/50-led-light-chain-warm-white-battery-operated-indoor-use(1).jpg',
    altImage: 'Christmas lights',
  },
  {
    title: 'Garland & Wreath',
    pathRedirect: '/products?categories=Garland+%26+Wreath',
    srcImage: '/assets/products/garland-with-snow-20-x-270cm.jpg',
    altImage: 'Garland & Wreath',
  },
  {
    title: 'Christmas decorations',
    pathRedirect: '/products?categories=Christmas+decorations',
    srcImage: '/assets/products/snowman-with-lantern-magnesia-48cm.jpg',
    altImage: 'Christmas decorations',
  },
  {
    title: 'Do It Yourself',
    pathRedirect: '/products?categories=Do+It+Yourself',
    srcImage: '/assets/products/3-diy-silver-christmas-baubles-8-cm-with-markers(1).jpg',
    altImage: 'Do It Yourself',
  },
  {
    title: 'Tree decorations',
    pathRedirect: '/products?categories=Tree+decorations',
    srcImage: '/assets/products/jellyfish-glass-hanging-figurine-12cm-blue(1).jpg',
    altImage: 'Tree decorations',
  },
  {
    title: 'Black decorations',
    pathRedirect: '/products?colors=black',
    srcImage: '/assets/products/black-bauble-with-ruches-8-cm(1).jpg',
    altImage: 'Black decorations',
  },
  {
    title: 'NEW decorations',
    pathRedirect: '/products?collections=2023',
    srcImage: '/assets/products/blowfish-glass-hanging-figurine-9cm-blue.jpg',
    altImage: 'NEW decorations',
  },
];
