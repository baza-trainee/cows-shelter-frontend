import { ExcursionsFormInput } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';

export type Excursion = {
  id: string;
  title_ua: string;
  title_en: string;
  description_ua: string;
  description_en: string;
  amount_of_persons: string;
  time_from: string;
  time_to: string;
  image_url: string;
  image_id: string;
};

type ExcursionsState = {
  excursions: Excursion[];
  loading: boolean;
  error: string | null;
};

const initialState: ExcursionsState = {
  excursions: [],
  loading: false,
  error: null
};

export const fetchExcursion = createAsyncThunk(
  'excursions/fetchExcursion',
  async () => {
    try {
      const response = await axios.get<Excursion[]>('api/excursions');
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const fetchExcursionById = createAsyncThunk(
  'excursions/fetchExcursionById',
  async (id: string) => {
    try {
      const response = await axios.get<Excursion>(`api/excursions/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const removeExcursion = createAsyncThunk(
  'excursions/removeExcursion',
  async (id: string) => {
    try {
      await axios.delete(`api/excursions/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const addNewExcursion = createAsyncThunk(
  'excursions/addNewExcursion',
  async (values: ExcursionsFormInput) => {
    try {
      const file = values.image[0];
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axios.post('api/excursions/upload', formData);
      const newPost = {
        title_ua: values.titleUa,
        title_en: values.titleEn,
        description_ua: values.descriptionUa,
        description_en: values.descriptionEn,
        amount_of_persons: values.visitorsNumber,
        time_from: values.timeFrom,
        time_to: values.timeTill,
        image_url: data.image_url,
        image_id: data.image_id
      };
      await axios.post('api/excursions', newPost);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editExcursion = createAsyncThunk(
  'excursions/editExcursion',
  async (ExcursionsData: { id?: string; values: ExcursionsFormInput }) => {
    try {
      if (ExcursionsData.values.image[0].size > 0) {
        const file = ExcursionsData.values.image[0];
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post('api/excursions/upload', formData);
        const newExcursion = {
          title_ua: ExcursionsData.values.titleUa,
          title_en: ExcursionsData.values.titleEn,
          description_ua: ExcursionsData.values.descriptionUa,
          description_en: ExcursionsData.values.descriptionEn,
          amount_of_persons: ExcursionsData.values.visitorsNumber,
          time_from: ExcursionsData.values.timeFrom,
          time_to: ExcursionsData.values.timeTill,
          image_url: data.image_url,
          image_id: data.image_id
        };
        await axios.patch(`api/excursions/${ExcursionsData.id}`, newExcursion);
      } else {
        const newExcursion = {
          title_ua: ExcursionsData.values.titleUa,
          title_en: ExcursionsData.values.titleEn,
          description_ua: ExcursionsData.values.descriptionUa,
          description_en: ExcursionsData.values.descriptionEn,
          amount_of_persons: ExcursionsData.values.visitorsNumber,
          time_from: ExcursionsData.values.timeFrom,
          time_to: ExcursionsData.values.timeTill,
          image_url: ExcursionsData.values.image[0].name
        };
        await axios.patch(`api/excursions/${ExcursionsData.id}`, newExcursion);
      }
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

const excursionsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExcursion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExcursion.fulfilled, (state, action) => {
        state.excursions = action.payload as Excursion[];
        state.loading = false;
      })
      .addCase(fetchExcursionById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.excursions = [];
      })
      .addCase(fetchExcursionById.fulfilled, (state, action) => {
        state.excursions.push(action.payload as Excursion);
        state.loading = false;
      })
      .addCase(removeExcursion.fulfilled, (state, action) => {
        state.excursions = state.excursions.filter(
          (item) => item.id !== (action.meta.arg as string)
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

// export const { addPost, removePost } = newsSlice.actions;

export default excursionsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
