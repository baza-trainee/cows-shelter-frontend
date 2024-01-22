import { PartnersFormInput } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';

export type Partner = {
  id: string;
  name: 'string';
  link: 'string';
  logo: string;
  image_id: 'string';
};

type ResponseWithPagination = {
  partners: Partner[];
  totalLength: number;
};

type PartnersState = {
  partners: Partner[];
  loading: boolean;
  error: string | null;
  paginatedData: ResponseWithPagination;
};

const initialState: PartnersState = {
  partners: [],
  loading: false,
  error: null,
  paginatedData: {
    partners: [],
    totalLength: 0
  }
};

export const fetchPartners = createAsyncThunk(
  'partners/fetchPartners',
  async () => {
    try {
      const response = await axios.get<Partner[]>('api/partners');
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const fetchPartnersWithPagination = createAsyncThunk(
  'partners/fetchPartnersWithPagination',
  async (query: { page: number; limit: number }) => {
    try {
      const response = await axios.get<ResponseWithPagination>(
        `api/partners/pagination?page=${query.page}&limit=${query.limit}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const removePartner = createAsyncThunk(
  'partners/removePartner',
  async (id: string) => {
    try {
      await axios.delete(`api/partners/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const addNewPartner = createAsyncThunk(
  'partners/addNewPartner',
  async (values: PartnersFormInput) => {
    try {
      const file = values.logo[0];
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axios.post('api/partners/upload', formData);
      const newPartner = {
        name: values.name,
        link: values.link,
        logo: data.image_url,
        image_id: data.image_id
      };
      await axios.post('api/partners', newPartner);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editPartner = createAsyncThunk(
  'news/editPost',
  async (partnersData: { id?: string; values: PartnersFormInput }) => {
    try {
      if (partnersData.values.logo[0].size > 0) {
        const file = partnersData.values.logo[0];
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post('api/partners/upload', formData);
        const newPartner = {
          name: partnersData.values.name,
          link: partnersData.values.link,
          logo: data.image_url,
          image_id: data.image_id
        };
        await axios.patch(`api/partners/${partnersData.id}`, newPartner);
      } else {
        const newPartner = {
          name: partnersData.values.name,
          link: partnersData.values.link,
          logo: partnersData.values.logo[0].name
        };
        await axios.patch(`api/partners/${partnersData.id}`, newPartner);
      }
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.partners = action.payload as Partner[];
        console.log(state.partners);
        state.loading = false;
      })
      .addCase(fetchPartnersWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartnersWithPagination.fulfilled, (state, action) => {
        state.paginatedData = action.payload as ResponseWithPagination;
        state.loading = false;
      })
      .addCase(removePartner.fulfilled, (state, action) => {
        state.partners = state.partners.filter(
          (item) => item.id !== (action.meta.arg as string)
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default partnersSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
