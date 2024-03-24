import { createSlice } from '@reduxjs/toolkit';

interface IviewSideFilters {
  showFilters: boolean;
}

const initialState: IviewSideFilters = {
  showFilters: false,
};

const viewSideFiltersSlice = createSlice({
  name: 'viewSideFilters',
  initialState,
  reducers: {
    toggleViewFilters: (state) => {
      if (state.showFilters) {
        state.showFilters = false;
      } else {
        state.showFilters = true;
      }
    },
  },
});

export const { toggleViewFilters } = viewSideFiltersSlice.actions;
export default viewSideFiltersSlice.reducer;
