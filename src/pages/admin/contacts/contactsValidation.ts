
export const contactsValidation = {
  email: {
    required: 'Введіть електронну пошту',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Некоректний формат електронної пошти'
    }
  },

  phone: {
    required: 'Введіть номер телефону',
    pattern: {
      value:
        /^((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/,
      message: 'Некоректний формат номера телефону'
    }
  }
};