import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UIState {
  cache: number;
}

// Define the initial state using that type
const initialState: UIState = {
  cache: new Date().getTime(),
};

export const applicationSlice = createSlice({
  name: '/application',
  initialState,
  reducers: {
    setCache: (state, action: PayloadAction<number>) => ({
      ...state,
      cache: action.payload,
    }),
  },
});

export const { setCache } = applicationSlice.actions;

export default applicationSlice.reducer;
