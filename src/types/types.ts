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
