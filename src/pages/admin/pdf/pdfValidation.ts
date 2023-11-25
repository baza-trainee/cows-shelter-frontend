import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 1024 * 1024;

export const pdfValidation = {
  title: {
    required: 'Введіть назву',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 55,
      message: 'Максимальна довжина поля 55 символів'
    },
    pattern: {
      value: /^[а-яА-ЯҐґЄєІіЇїa-zA-Z\s\d'’.,-:;"()!?]+$/,
      message: 'Введіть коректну назву'
    }
  },

  pdf: {
    required: 'Додайте документ',
    validate: (value: any) => {
      if (typeof value === 'object' && 'length' in value && value.length > 0) {
        const file = value[0];

        const checkType = ['application/pdf'].includes(file.type);
        if (!checkType) return 'Документ має бути в форматі .pdf';

        const checkSize = file.size <= sizeLimit;
        if (!checkSize) {
          return `Максимальний розмір документу ${formatBytes(sizeLimit)}`;
        }

        if (file.size === 0) return true;
      } else {
        return 'Додайте документу';
      }
    }
  }
};
