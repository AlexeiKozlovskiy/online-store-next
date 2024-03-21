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
