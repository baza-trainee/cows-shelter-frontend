import { PostRequest } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

type Post = {
  id: string;
  title: string;
  text: string;
};

type NewsState = {
  list: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  list: [],
  loading: false,
  error: null
};

export const fetchPosts = createAsyncThunk<
  Post[],
  undefined,
  { rejectValue: string }
>('todos/fetchPosts', async function (_, { rejectWithValue }) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  console.log(data);

  return data;
});

export const addNewPost = createAsyncThunk<
  Post,
  PostRequest,
  { rejectValue: string }
>('todos/addNewPost', async function (post, { rejectWithValue }) {
  const newPost = {
    title: post.title,
    text: post.text
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  });

  if (!response.ok) {
    return rejectWithValue("Can't add task. Server error.");
  }

  return (await response.json()) as Post;
});

const newsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostRequest>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload.title,
        text: action.payload.text
      });
    },
    removePost(state, action: PayloadAction<string>) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { addPost, removePost } = newsSlice.actions;

export default newsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
