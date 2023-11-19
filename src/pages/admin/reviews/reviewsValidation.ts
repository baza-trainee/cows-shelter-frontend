export const reviewsValidation = {
  nameUa: {
    required: 'Введіть ім’я відвідувача',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина поля 25 символів'
    },
    pattern: {
      value: /^[а-яА-ЯҐґЄєІіЇї\s\d'’-]+$/,
      message: 'Введіть коректну назву'
    }
  },

  nameEn: {
    required: 'Введіть ім’я відвідувача англійською',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина поля 25 символів'
    },
    pattern: {
      value: /^[a-zA-Z\s\d'’-]+$/,
      message: 'Введіть коректну назву'
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
      message: 'Максимальна довжина поля 750 символів'
    },
    pattern: {
      value: /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/,
      message: 'Введіть коректний текст'
    }
  },

  reviewEn: {
    required: 'Введіть відгук англійською',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 750,
      message: 'Максимальна довжина поля 200 символів'
    },
    pattern: {
      value: /^[a-zA-Z\s\d'’.,:;"()!?-]+$/,
      message: 'Введіть коректний текст'
    }
  }
};
