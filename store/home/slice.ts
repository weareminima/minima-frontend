import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state

type Step = {
  id: string;
  x: number;
  y: number;
  rotation: number;
};
interface HomeInitialState {
  step: string;
  stepTop: string;
  stepBottom: string;
  steps: Step[];
}

// Define the initial state using that type
const initialState: HomeInitialState = {
  step: null,
  stepTop: null,
  stepBottom: null,
  steps: [],
};

export const homeSlice = createSlice({
  name: '/home',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<string>) => ({
      ...state,
      step: action.payload,
    }),
    setStepTop: (state, action: PayloadAction<string>) => ({
      ...state,
      stepTop: action.payload,
    }),
    setStepBottom: (state, action: PayloadAction<string>) => ({
      ...state,
      stepBottom: action.payload,
    }),
    setSteps: (state, action: PayloadAction<Step[]>) => ({
      ...state,
      steps: action.payload,
    }),
  },
});

export const {
  setStep,
  setStepTop,
  setStepBottom,
  setSteps,
} = homeSlice.actions;

export default homeSlice.reducer;
