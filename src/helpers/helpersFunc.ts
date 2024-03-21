import {
  BalancerCategory,
  BalancerCollection,
  BalancerColor,
  CartItem,
  Product,
  ProductDualRangesFilters,
  PromocodeData,
} from '@/types/types';

export function bodyNotScroll() {
  document.body.classList.toggle('lock');
}

export function replaceSpace(name: string) {
  return name.replace(/\s+/g, '_');
}

export function replaceUnderscore(name: string) {
  return name.replace(/_/g, ' ');
}

export function formatPrice(price: number) {
  return price?.toFixed(2);
}

export function getIDProductFromURL(pathname: string) {
  return pathname
    .split('/')
    .filter((el) => el.length === 36)
    .join('/');
}

export function getTotalItems(cartItemsState: CartItem[]) {
  return cartItemsState.reduce((count, cartItem) => count + cartItem.quantity, 0);
}

export function getTotalPrice(cartItemsState: CartItem[]) {
  return cartItemsState.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
}

export function getTotalDiscount(promocodeState: PromocodeData) {
  return promocodeState.applied.reduce((acc, { discount }) => acc + discount, 0);
}

export function getTotalPriseByPromocode(cartState: CartItem[], promocodeState: PromocodeData) {
  const totalPrice = getTotalPrice(cartState);
  const totalDiscount = getTotalDiscount(promocodeState);

  if (totalDiscount) {
    return totalPrice - (totalDiscount / 100) * totalPrice;
  } else return totalPrice;
}

export function getIsInCart(state: CartItem[], id: string) {
  return state.some(({ product }) => product.id === id);
}

export function sortColorBalancer(arr: BalancerColor[]): BalancerColor[] {
  return [...arr].sort((a, b) => {
    const colorA = a.color;
    const colorB = b.color;
    if (colorA < colorB) {
      return -1;
    }
    if (colorA > colorB) {
      return 1;
    }
    return 0;
  });
}

export function sortCategoryBalancer(arr: BalancerCategory[]): BalancerCategory[] {
  return [...arr].sort((a, b) => {
    const colorA = a.category.toLowerCase();
    const colorB = b.category.toLowerCase();
    if (colorA < colorB) {
      return -1;
    }
    if (colorA > colorB) {
      return 1;
    }
    return 0;
  });
}

export function sortCollectionBalancer(arr: BalancerCollection[]): BalancerCollection[] {
  return [...arr].sort((a, b) => a.collection - b.collection);
}

export function dualRangesBalancer(products: Product[], key: keyof ProductDualRangesFilters): [number, number] {
  const value = products.map((el) => el[key]);
  return [Math.min(...value), Math.max(...value)];
}

export function colorBalancer(products: Product[]) {
  return products.reduce((acc: BalancerColor[], { color }) => {
    const existingColor = acc.find((item) => item.color === color);
    if (!existingColor) {
      acc = [...acc, { color }];
    }
    return acc;
  }, []);
}

export function collectionBalancer(products: Product[]) {
  return products.reduce((acc: BalancerCollection[], { collection }) => {
    const existingCollection = acc.find((item) => item.collection === collection);
    if (!existingCollection) {
      acc = [...acc, { collection }];
    }
    return acc;
  }, []);
}

export function categoryBalancer(products: Product[], categoryStock: BalancerCategory[]) {
  return categoryStock.map(({ category }) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));
}
