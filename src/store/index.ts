import { configureStore, combineReducers } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import modalReducer from './slices/modalSlice';
import observationReducer from './slices/observationSlice';
import gallerySlice from './slices/gallerySlice';
import excursionsReducer from './slices/excursionsSlice';
import pdfSlice from './slices/pdfSlice';
import partnersSlice from './slices/partnersSlice';
import contactsSlice from './slices/contactsSlice';

const rootReducer = combineReducers({
  posts: newsReducer,
  modals: modalReducer,
  gallery: gallerySlice,
  pdf: pdfSlice,
  observer: observationReducer,
  excursions: excursionsReducer,
  partners: partnersSlice,
  contacts: contactsSlice
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
