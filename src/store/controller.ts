import store from '@/store/store';
import { Authentication, Balancers, Product } from '@/types/types';
import { clearAuthUser, setAuthUser } from './auth';
import { toggleViewFilters } from './viewSideFilters';
import { changeCount, resetCount } from './productPageQty';
import { addQweryParams, resetQweryParams } from './productsQweryParams';
import { addAppliedPromocode, removeAppliedPromocode } from './promocode';
import { resetBalansersFilters, updateBalancerProperty } from './balansersFilters';
import { addToCart, removeItemFromCart, removeAllItemsFromCart, setQuantityItemInCart, removeCart } from './cart';

export function addProductToCart(product: Product, quantity: number = 1) {
  store.dispatch(addToCart({ product, quantity }));
}

export function setProductsQuantityInCart(product: Product, quantity: number) {
  store.dispatch(setQuantityItemInCart({ product, quantity }));
}
export function removeProductFromCart(id: string) {
  store.dispatch(removeItemFromCart(id));
}

export function removeAllProductsFromCart(id: string) {
  store.dispatch(removeAllItemsFromCart(id));
}

export function removeAllCart() {
  store.dispatch(removeCart());
}

export function changeCountProducts(count: string) {
  store.dispatch(changeCount(count));
}

export function resetCountProducts() {
  store.dispatch(resetCount());
}

export function applyPromocode(name: string): void {
  const promo = store.getState().promocode.available.find((code) => code.name === name);
  if (promo) {
    store.dispatch(addAppliedPromocode(promo.id));
  }
}

export function removePromocode(id: number): void {
  const promo = store.getState().promocode.applied.find((code) => code.id === id);
  if (promo) {
    store.dispatch(removeAppliedPromocode(promo.id));
  }
}

export function isPromocodeAvailable(name: string): boolean {
  return store.getState().promocode.available.some((code) => code.name === name);
}

export function updateBalancersPropertys<T extends keyof Balancers>(property: T, value: Balancers[T]) {
  store.dispatch(updateBalancerProperty({ property, value }));
}

export function clearBalansersFilters() {
  store.dispatch(resetBalansersFilters());
}

export function setQweryParams(qweryParams: string) {
  store.dispatch(addQweryParams(qweryParams));
}

export function clearQweryParams() {
  store.dispatch(resetQweryParams());
}

export function toggleShowFilters() {
  store.dispatch(toggleViewFilters());
}

export function setAuthParams(authParams: Authentication): void {
  store.dispatch(setAuthUser(authParams));
}

export function clearAuthParams() {
  store.dispatch(clearAuthUser());
}
