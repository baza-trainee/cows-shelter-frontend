import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//external from types/index.ts
interface NewsData {}
interface ExcursionsData {}

type ShareData = {
  links: string;
};

export type ModalType = 'excursions' | 'news' | 'share';

type ModalData = NewsData | ExcursionsData | ShareData;

interface ModalState {
  data: ModalData | null;
  type?: ModalType | null;
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
      //useAppDispatch(openModal({ data:your_data, type:type of section (news or excursions)}))
      state.isModalOpen = true;
      state.data = action.payload.data;
      state.type = action.payload.type;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.data = null;
      state.type = null;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
