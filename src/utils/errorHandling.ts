export const errorHandling = (errorCode: number) => {
  if (errorCode === 400) {
    return 'Невірний пароль. Спробуйте ще';
  } else if (errorCode === 404) {
    return 'Немає акаунту з цією адресою ';
  } else {
    return 'Щось пішло не так. Спробуйте ще.';
  }
};
