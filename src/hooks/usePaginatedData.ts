export const usePaginatedData = <T>(
  data: Array<T>,
  start: number,
  finish: number
): Array<T> => {
  const slicedData = data.slice(start, finish);
  return slicedData;
};
