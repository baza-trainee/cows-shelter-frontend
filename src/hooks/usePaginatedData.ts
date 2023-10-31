import { GalleryItem } from '@/types';
import { Reviews } from '@/types';

export const usePaginatedData = (
  data: GalleryItem[],
  start: number,
  finish: number
) => {
  const slicedData = data.slice(start, finish);
  return slicedData;
};

export const usePaginatedDataReview = (
  data: Reviews[],
  start: number,
  finish: number
) => {
  const slicedData = data.slice(start, finish);
  return slicedData;
};
