import { configureStore, combineReducers } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import modalReducer from './slices/modalSlice';
import observationReducer from './slices/observationSlice';
import gallerySlice from './slices/gallerySlice';
import excursionsReducer from './slices/excursionsSlice';

const rootReducer = combineReducers({
  posts: newsReducer,
  modals: modalReducer,
  gallery: gallerySlice,
  observer: observationReducer,
  excursions: excursionsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
