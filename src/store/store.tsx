import cartSlice from './cart';
import productPageQtySlice from './productPageQty';
import promocodeSlice from './promocode';
import balansersFiltersSlise from './balansersFilters';
import productsQweryParamsSlise from './productsQweryParams';
import viewSideFiltersSlice from './viewSideFilters';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const rootReduser = combineReducers({
  cart: cartSlice,
  productPageQty: productPageQtySlice,
  promocode: promocodeSlice,
  balansersFilters: balansersFiltersSlise,
  productsQweryParams: productsQweryParamsSlise,
  viewSideFilters: viewSideFiltersSlice,
});

export function createPersistStorage() {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage('local');
}

const persistConfig = {
  key: 'root',
  storage: createPersistStorage(),
  blacklist: ['productPageQty'],
};

const persistedReducer = persistReducer(persistConfig, rootReduser);

export const rootState = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(rootState);

export default rootState;
