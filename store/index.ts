import application from 'store/application/slice';
import home from 'store/home/slice';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';

const staticReducers = {
  '/application': application,
  '/home': home,
};

const asyncReducers = {};

const createReducer = (reducers: ReducersMapObject) =>
  combineReducers({
    ...staticReducers,
    ...reducers,
  });

const store = configureStore({
  reducer: createReducer(asyncReducers),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
