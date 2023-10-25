export const usePaginatedData = (
  data: string[],
  start: number,
  finish: number
) => {
  const slicedData = data.slice(start, finish);
  return slicedData;
};
