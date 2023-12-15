import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ContactState = {
  message: string;
  isAlertOpen: boolean;
};

const initialState: ContactState = {
  message: '',
  isAlertOpen: false
};

const responseAlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlert(state, action: PayloadAction<string>) {
      state.isAlertOpen = true;
      state.message = action.payload;
    },
    closeAlert(state) {
      state.isAlertOpen = false;
      state.message = '';
    }
  }
});

export const { openAlert, closeAlert } = responseAlertSlice.actions;

export default responseAlertSlice.reducer;
