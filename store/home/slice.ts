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
  scrollReady: boolean;
  step: string;
  steps: Step[];
  exit: boolean;
  menu: boolean;
  menuHover: string,
  menuClick: string,
}

// Define the initial state using that type
export const initialState: HomeInitialState = {
  open: false,
  ready: false,
  scrollReady: false,
  step: null,
  steps: [],
  exit: false,
  menu: false,
  menuHover: '',
  menuClick: '',
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
    setScrollReady: (state, action: PayloadAction<boolean>) => ({
      ...state,
      scrollReady: action.payload,
    }),
    setStep: (state, action: PayloadAction<string>) => ({
      ...state,
      step: action.payload,
    }),
    setSteps: (state, action: PayloadAction<Step[]>) => ({
      ...state,
      steps: action.payload,
    }),
    setExit: (state, action: PayloadAction<boolean>) => ({
      ...state,
      exit: action.payload,
    }),
    setMenu: (state, action: PayloadAction<boolean>) => ({
      ...state,
      menu: action.payload,
    }),
    setMenuHover: (state, action: PayloadAction<string>) => ({
      ...state,
      menuHover: action.payload,
    }),
    setMenuClick: (state, action: PayloadAction<string>) => ({
      ...state,
      menuClick: action.payload,
    }),
    setState: (state, action: PayloadAction<Partial<HomeInitialState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  // Scroller
  setOpen,
  setReady,
  setScrollReady,
  setStep,
  setSteps,
  setExit,
  // Menu
  setMenu,
  setMenuHover,
  setMenuClick,
  // All state
  setState,
} = homeSlice.actions;

export default homeSlice.reducer;
