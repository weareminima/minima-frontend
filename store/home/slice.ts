import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state

type Step = {
  id: string;
  x: number;
  y: number;
  rotation: number;
};
interface UIState {
  step: Step;
}

// Define the initial state using that type
const initialState: UIState = {
  step: null,
};

export const homeSlice = createSlice({
  name: '/home',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<Step>) => ({
      ...state,
      step: action.payload,
    }),
  },
});

export const { setStep } = homeSlice.actions;

export default homeSlice.reducer;
