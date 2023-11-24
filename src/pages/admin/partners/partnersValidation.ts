import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 1024 * 1024;

export const partnersValidation = {
  name: {
    required: 'Введіть назву',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 100,
      message: 'Максимальна довжина поля 55 символів'
    }
  },

  link: {
    required: 'Введіть посилання на сторінку партнера',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 100,
      message: 'Максимальна довжина поля 100 символів'
    },
    pattern: {
      value: /^[a-zA-Z\s\d'’.,-:;"()!?-]+$/,
      message: 'Введіть коректну назву'
    }
  },

  logo: {
    required: 'Додайте зображення',
    validate: (value: any) => {
      if (typeof value === 'object' && 'length' in value && value.length > 0) {
        const file = value[0];

        const checkType = ['image/jpeg', 'image/png', 'image/webp'].includes(
          file.type
        );
        if (!checkType)
          return 'Зображення має бути в форматі .jpg, .png або .webp';

        const checkSize = file.size <= sizeLimit;
        if (!checkSize) {
          return `Максимальний розмір зображення ${formatBytes(sizeLimit)}`;
        }

        if (file.size === 0) return true;
      } else {
        return 'Додайте зображення';
      }
    }
  }
};
