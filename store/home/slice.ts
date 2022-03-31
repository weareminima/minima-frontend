import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UIState {
  filters: {
    categories: string[]
  };
}

// Define the initial state using that type
const initialState: UIState = {
  filters: {
    categories: [],
  },
};

export const applicationSlice = createSlice({
  name: '/home',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Record<string, any>>) => ({
      ...state,
      filters: {
        ...state.filters,
        ...action.payload,
      },
    }),
  },
});

export const { setFilters } = applicationSlice.actions;

export default applicationSlice.reducer;
