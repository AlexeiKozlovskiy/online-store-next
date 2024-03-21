import { CartItem, PromocodeData } from '@/types/types';

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
