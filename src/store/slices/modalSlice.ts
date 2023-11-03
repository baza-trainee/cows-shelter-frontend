import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewsData } from '@/types';

//external from types/index.ts

interface ExcursionsData {}
interface BurgerMenu {}
interface Partners {}
interface Donation {}
interface LightBox {}

export type ModalType =
  | 'excursions'
  | 'news'
  | 'burgerMenu'
  | 'partners'
  | 'donation'
  | 'lightbox';

type ModalData =
  | NewsData
  | ExcursionsData
  | BurgerMenu
  | Partners
  | Donation
  | LightBox;

interface ModalState {
  data: ModalData | null;
  type: ModalType | null;
  isModalOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  data: null,
  isModalOpen: false
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ data: ModalData; type: ModalType }>
    ) {
      state.isModalOpen = true;
      state.data = action.payload.data;
      state.type = action.payload.type;
      document.body.classList.add('overflow-hidden');
      // document.body.classList.remove('slideOut');
      // document.body.classList.add('slideIn');
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.data = null;
      state.type = null;
      document.body.classList.remove('overflow-hidden');
      // document.body.classList.remove('slideIn');
      // document.body.classList.add('slideOut');
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
