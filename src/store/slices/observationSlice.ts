import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ObservationState {
  activeLink: string;
}
const initialState: ObservationState = {
  activeLink: ''
};

const observationSlice = createSlice({
  name: 'observation',
  initialState,
  reducers: {
    setActiveLink(state, action: PayloadAction<string>) {
      state.activeLink = action.payload;
    }
  }
});

export const { setActiveLink } = observationSlice.actions;

export default observationSlice.reducer;
