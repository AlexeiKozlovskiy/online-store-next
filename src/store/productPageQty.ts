import { IProductPageQty } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IProductPageQty = {
  countProducts: 1,
  resetCount: false,
};

const productPageQtySlice = createSlice({
  name: 'productPageQty',
  initialState,
  reducers: {
    changeCount: (state, action: PayloadAction<string>) => {
      const count = action.payload;
      state.countProducts = +count;
      state.resetCount = false;
    },
    resetCount: (state) => {
      state.resetCount = true;
      state.countProducts = 1;
    },
  },
});

export const { changeCount, resetCount } = productPageQtySlice.actions;
export default productPageQtySlice.reducer;
