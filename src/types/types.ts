export interface Product {
  id: string;
  name: string;
  price: number;
  collection: number;
  stock: number;
  color: string;
  size: number;
  favorite?: boolean;
  category: string;
  images: string[];
}

export type DualRange = [number | null, number | null];

export interface SelectedFilter {
  (values: DualRange): void;
}
export interface SelectedFilters {
  colorsSelected: string[];
  collectionsSelected: number[];
  categorySelected: string[];
  priceSelected: DualRange;
  sizeSelected: DualRange;
  stockSelected: DualRange;
}

export interface CartItemArg {
  product: Product;
  quantity: number;
}
export interface RootReducerProps {
  cart: CartItem[];
  productPageQty: IProductPageQty;
  promocode: PromocodeData;
  balansersFilters: Balancers;
  productsQweryParams: ProductsQweryParams;
  viewSideFilters: IviewSideFilters;
}

export interface IProductPageQty {
  countProducts: number;
  resetCount: boolean;
}

export interface CartItem extends CartItemArg {
  cartID: string;
  itemNumber: number;
}

export interface PromocodeData {
  applied: Promocode[];
  available: Promocode[];
}

export interface Promocode {
  id: number;
  name: string;
  discount: number;
}

export interface SelectedFilters {
  colorsSelected: string[];
  collectionsSelected: number[];
  categorySelected: string[];
  priceSelected: DualRange;
  sizeSelected: DualRange;
  stockSelected: DualRange;
}

export interface BalancerColor {
  color: string;
}

export interface BalancerCollection {
  collection: number;
}

export interface BalancerCategory {
  category: string;
  count: number;
}

export interface Balancers {
  balancerColor: BalancerColor[];
  balancerCollection: BalancerCollection[];
  balancerCategory: BalancerCategory[];
  balancerPrise: DualRange;
  balancerSize: DualRange;
  balancerStock: DualRange;
}

export interface ProductsQweryParams {
  qweryParams: string;
}

export type ProductFilters = Omit<Product, 'id' | 'name' | 'favorite' | 'images'>;

export type ProductDualRangesFilters = Pick<ProductFilters, 'price' | 'size' | 'stock'>;

export type SortingsValue = 'name' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc';

export interface InputSearch {
  inputSearchURL: string | null;
  setInputSearchURL: (value: string | null) => void;
}

export interface ISelect {
  value: string;
  label: string;
}

export interface IviewSideFilters {
  showFilters: boolean;
}

export interface PageClickEvent {
  selected: number;
}
