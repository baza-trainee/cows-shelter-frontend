import { NewsFormInput } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';

export type Image = {
  id: string;
  image_url: string;
  image_id: string;
};

type ImageState = {
  images: Image[];
  loading: boolean;
  error: string | null;
};

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null
};

export const fetchImages = createAsyncThunk('news/fetchImages', async () => {
  try {
    const response = await axios.get<Image[]>('api/gallery');
    const data = response.data;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.message;
  }
});

export const fetchImageById = createAsyncThunk(
  'news/fetchImageById',
  async (id: string) => {
    try {
      const response = await axios.get<Image>(`api/gallery/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const removeImage = createAsyncThunk(
  'news/removeImage',
  async (id: string) => {
    try {
      await axios.delete(`api/gallery/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const addNewImage = createAsyncThunk(
  'news/addnewPost',
  async (values: NewsFormInput) => {
    try {
      const file = values.image[0];
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axios.post('api/gallery/upload', formData);
      const newImage = {
        image_url: data.image_url,
        image_id: data.image_id
      };
      await axios.post('api/gallery', newImage);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images = action.payload as Image[];
        state.loading = false;
      })
      .addCase(fetchImageById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.images = [];
      })
      .addCase(fetchImageById.fulfilled, (state, action) => {
        state.images.push(action.payload as Image);
        state.loading = false;
      })
      .addCase(removeImage.fulfilled, (state, action) => {
        state.images = state.images.filter(
          (item) => item.id !== (action.meta.arg as string)
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default gallerySlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}