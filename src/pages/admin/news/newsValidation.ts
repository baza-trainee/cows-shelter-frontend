import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 500 * 1024;

export const newsValidation = {
  titleUa: {
    required: 'Введіть назву',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина поля 55 символів'
    },
    pattern: {
      value: /^[а-яА-ЯҐґЄєІіЇї\s\d'’-]+$/,
      message: 'Введіть коректну назву'
    }
  },

  titleEn: {
    required: 'Введіть назву',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина поля 55 символів'
    },
    pattern: {
      value: /^[a-zA-Z\s\d'’-]+$/,
      message: 'Введіть коректну назву'
    }
  },

  contentUa: {
    required: 'Введіть текст новини',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 300,
      message: 'Максимальна довжина поля 300 символів'
    },
    pattern: {
      value: /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/,
      message: 'Введіть коректний текст'
    }
  },

  contentEn: {
    required: 'Введіть текст відгуку',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 300,
      message: 'Максимальна довжина поля 300 символів'
    },
    pattern: {
      value: /^[a-zA-Z\s\d'’.,:;"()!?-]+$/,
      message: 'Введіть коректний текст'
    }
  },

  image: {
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