import { NewsFormInput } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';

export type Post = {
  id: string;
  title_ua: string;
  title_en: string;
  content_ua: string;
  content_en: string;
  image_url: string;
  image_id: string;
};

type NewsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  posts: [],
  loading: false,
  error: null
};

export const fetchPosts = createAsyncThunk('news/fetchPosts', async () => {
  try {
    const response = await axios.get<Post[]>('api/news');
    const data = response.data;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.message;
  }
});

export const fetchPostById = createAsyncThunk(
  'news/fetchPostById',
  async (id: string) => {
    try {
      const response = await axios.get<Post>(`api/news/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const removePost = createAsyncThunk(
  'news/removePost',
  async (id: string) => {
    try {
      await axios.delete(`api/news/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const addNewPost = createAsyncThunk(
  'news/addnewPost',
  async (values: NewsFormInput) => {
    try {
      const file = values.image[0];
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axios.post('api/news/upload', formData);
      const newPost = {
        title_ua: values.titleUa,
        title_en: values.titleEn,
        content_ua: values.contentUa,
        content_en: values.contentEn,
        image_url: data.image_url,
        image_id: data.image_id
      };
      await axios.post('api/news', newPost);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editPost = createAsyncThunk(
  'news/editPost',
  async (newsData: { id?: string; values: NewsFormInput }) => {
    try {
      if (newsData.values.image[0].size > 0) {
        const file = newsData.values.image[0];
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post('api/news/upload', formData);
        const newPost = {
          title_ua: newsData.values.titleUa,
          title_en: newsData.values.titleEn,
          content_ua: newsData.values.contentUa,
          content_en: newsData.values.contentEn,
          image_url: data.image_url,
          image_id: data.image_id
        };
        await axios.patch(`api/news/${newsData.id}`, newPost);
      } else {
        const newPost = {
          title_ua: newsData.values.titleUa,
          title_en: newsData.values.titleEn,
          content_ua: newsData.values.contentUa,
          content_en: newsData.values.contentEn,
          image_url: newsData.values.image[0].name
        };
        await axios.patch(`api/news/${newsData.id}`, newPost);
      }
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

const newsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload as Post[];
        state.loading = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.posts = [];
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.posts.push(action.payload as Post);
        state.loading = false;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
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

export default newsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
