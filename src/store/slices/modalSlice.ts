import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//external from types/index.ts
interface NewsData {}
interface ExcursionsData {}

export type ModalType = 'excursions' | 'news';

type ModalData = NewsData | ExcursionsData;

interface ModalState {
  data: ModalData | null;
  type?: ModalType | null;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  data: null,
  isOpen: false
};

const modalSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ data: ModalData; type: ModalType }>
    ) {
      //useAppDispatch(openModal({ data:your_data, type:type of section (news or excursions)}))
      state.isOpen = true;
      state.data = action.payload.data;
      state.type = action.payload.type;
    },
    closeModal(state) {
      state.isOpen = false;
      state.data = null;
      state.type = null;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
