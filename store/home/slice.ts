import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UIState {
  selected: string
}

// Define the initial state using that type
const initialState: UIState = {
  selected: null,
};

export const homeSlice = createSlice({
  name: '/home',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => ({
      ...state,
      selected: action.payload,
    }),
  },
});

export const { setSelected } = homeSlice.actions;

export default homeSlice.reducer;
