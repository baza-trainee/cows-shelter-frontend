export const reviewsValidation = {
  nameUa: {
    required: 'Введіть ім’я відвідувача',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина імені 2 символи'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина імені 25 символів'
    },
    pattern: {
      value: /^[а-яА-ЯҐґЄєІіЇї\s\d'’-]+$/,
      message: 'Введіть коректние ім’я українською мовою'
    }
  },

  nameEn: {
    required: 'Введіть ім’я відвідувача англійською',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина імені 2 символи'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина імені 25 символів'
    },
    pattern: {
      value: /^[a-zA-Z\s\d'’-]+$/,
      message: 'Введіть коректние ім’я англійською мовою'
    }
  },

  reviewUa: {
    required: 'Введіть відгук',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 300,
      message: 'Максимальна довжина поля 300 символів'
    }
  },

  reviewEn: {
    required: 'Введіть відгук англійською',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 300,
      message: 'Максимальна довжина поля 300 символів'
    }
  }
};
