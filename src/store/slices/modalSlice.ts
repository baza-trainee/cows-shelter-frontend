import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType =
  | 'order'
  | 'excursions'
  | 'news'
  | 'burgerMenu'
  | 'partners'
  | 'donation'
  | 'lightbox';

type ModalData = Record<string, any>;

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
      document.getElementById('root')!.style.overflow = 'hidden';
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.data = null;
      state.type = null;
      document.getElementById('root')!.style.overflow = 'auto';
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
