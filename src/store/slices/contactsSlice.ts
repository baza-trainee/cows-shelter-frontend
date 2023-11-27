import { ContactsFormInput } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';

export type Contact = {
  id: string;
  email: string;
  phone: string;
};

type ContactState = {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
};

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get<Contact[]>('api/contacts');
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editEmail = createAsyncThunk(
  'contacts/editEmail',
  async (newsData: { id?: string; values: ContactsFormInput }) => {
    try {
      const newPost = {
        email: newsData.values.email
      };
      await axios.patch(`api/contacts/${newsData.id}`, newPost);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editPhone = createAsyncThunk(
  'contacts/editPhone',
  async (newsData: { id?: string; values: ContactsFormInput }) => {
    try {
      const newPost = {
        phone: newsData.values.phone
      };
      await axios.patch(`api/contacts/${newsData.id}`, newPost);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload as Contact[];
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default contactsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
