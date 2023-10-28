import { GalleryItem } from '@/types';

export const usePaginatedData = (
  data: GalleryItem[],
  start: number,
  finish: number
) => {
  const slicedData = data.slice(start, finish);
  return slicedData;
};
