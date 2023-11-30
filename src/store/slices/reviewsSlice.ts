import { ReviewsFormInput } from '@/types';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';

export type Review = {
  id: string;
  name_ua: string;
  name_en: string;
  review_ua: string;
  review_en: string;
};

type ResponseWithPagination = {
  reviews: Review[];
  totalLength: number;
};

type ReviewsState = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  paginatedData: ResponseWithPagination;
};

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
  paginatedData: {
    reviews: [],
    totalLength: 0
  }
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    try {
      const response = await axios.get<Review[]>('api/reviews');
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id: string) => {
    try {
      const response = await axios.get<Review>(`api/reviews/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const fetchReviewsWithPagination = createAsyncThunk(
  'reviews/fetchReviewsWithPagination',
  async (query: { page: number; limit: number }) => {
    try {
      const response = await axios.get<ResponseWithPagination>(
        `api/reviews/pagination?page=${query.page}&limit=${query.limit}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const removeReview = createAsyncThunk(
  'reviews/removeReview',
  async (id: string) => {
    try {
      await axios.delete(`api/reviews/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const addNewReview = createAsyncThunk(
  'reviews/addNewReview',
  async (values: ReviewsFormInput) => {
    try {
      const newReview = {
        name_ua: values.nameUa,
        name_en: values.nameEn,
        review_ua: values.reviewUa,
        review_en: values.reviewEn
      };
      await axios.post('api/reviews', newReview);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

export const editReview = createAsyncThunk(
  'reviews/editReview',
  async (reviewData: { id?: string; values: ReviewsFormInput }) => {
    try {
      const newReview = {
        name_ua: reviewData.values.nameUa,
        name_en: reviewData.values.nameEn,
        review_ua: reviewData.values.reviewUa,
        review_en: reviewData.values.reviewEn
      };
      await axios.patch(`api/reviews/${reviewData.id}`, newReview);
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload as Review[];
        state.loading = false;
      })
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviews = [];
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.reviews.push(action.payload as Review);
        state.loading = false;
      })
      .addCase(fetchReviewsWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.paginatedData = action.payload as ResponseWithPagination;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (item) => item.id !== (action.meta.arg as string)
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default reviewsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
