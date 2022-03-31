import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '.';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// https://redux.js.org/recipes/usage-with-typescript#define-typed-hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
