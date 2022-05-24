import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state

type Step = {
  id: string;
  x: number;
  y: number;
  rotation: number;
};
interface HomeInitialState {
  open: boolean;
  ready: boolean;
  step: string;
  steps: Step[];
}

// Define the initial state using that type
const initialState: HomeInitialState = {
  open: false,
  ready: false,
  step: null,
  steps: [],
};

export const homeSlice = createSlice({
  name: '/home',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => ({
      ...state,
      open: action.payload,
    }),
    setReady: (state, action: PayloadAction<boolean>) => ({
      ...state,
      ready: action.payload,
    }),
    setStep: (state, action: PayloadAction<string>) => ({
      ...state,
      step: action.payload,
    }),
    setSteps: (state, action: PayloadAction<Step[]>) => ({
      ...state,
      steps: action.payload,
    }),
    setState: (state, action: PayloadAction<Partial<HomeInitialState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  setOpen,
  setReady,
  setStep,
  setSteps,
  setState,
} = homeSlice.actions;

export default homeSlice.reducer;
