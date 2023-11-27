export const addSuccessResponseMessage = (item: string) => {
  return `${item} успішно додано`;
};
export const deleteSuccessResponseMessage = (item: string) => {
  return `${item} успішно видалено`;
};
export const editSuccessResponseMessage = (item: string) => {
  return `Зміни до ${item} успішно застосовано`;
};

export const addErrorResponseMessage = (item: string) => {
  return `Не вдалося додати ${item}. Спробуйте пізніше`;
};
export const editErrorResponseMessage = (item: string) => {
  return `Не вдалося редагувати ${item}. Спробуйте пізніше`;
};
export const deleteErrorResponseMessage = (item: string) => {
  return `Не вдалося видалити ${item}. Спробуйте пізніше`;
};
