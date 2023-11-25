export const contactsValidation = {
  email: {
    required: 'Введіть електронну пошту',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 55,
      message: 'Максимальна довжина поля 55 символів'
    },
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Введіть коректну назву'
    }
  },
  phone: {
    required: 'Введіть номер телефону',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 13 символів'
    },
    maxLength: {
      value: 55,
      message: 'Максимальна довжина поля 15 символів'
    },
    pattern: {
      value: /^\+380\s\d{3}\s\d{3}\s\d{3}$/,
      message: 'Формат номеру +380 *** *** ***'
    }
  }
};
