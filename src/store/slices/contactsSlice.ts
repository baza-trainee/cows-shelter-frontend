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
      const response = await axios.get<Contact[]>(`api/contacts`);
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async (values: ContactsFormInput) => {
    try {
      const newData = {
        email: values.email,
        phone: values.phone
      };
      await axios.post(`api/contacts`, newData);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editEmail = createAsyncThunk(
  'contacts/editEmail',
  async (data: { id?: string; values: ContactsFormInput }) => {
    try {
      const newData = {
        email: data.values.email
      };
      await axios.patch(`api/contacts/${data.id}`, newData);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editPhone = createAsyncThunk(
  'contacts/editPhone',
  async (data: { id?: string; values: ContactsFormInput }) => {
    try {
      const newData = {
        phone: data.values.phone
      };
      await axios.patch(`api/contacts/${data.id}`, newData);
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
