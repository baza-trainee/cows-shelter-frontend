import { configureStore, combineReducers } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';

const rootReducer = combineReducers({
  posts: newsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
