import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../services/slices/user-slice';
import orderReducer  from '../services/slices/order-slice';
import feedReducer  from '../services/slices/feed-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  user: userReducer,
  order: orderReducer,
  feed: feedReducer
}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
