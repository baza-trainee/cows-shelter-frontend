import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 500 * 1024;

export const excursionsValidation = {
  titleUa: {
    required: 'Введіть назву екскурсії',
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

  titleEn: {
    required: 'Введіть англійською назву екскурсії',
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

  descriptionUa: {
    required: 'Введіть опис екскурсії',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 750,
      message: 'Максимальна довжина поля 750 символів'
    },
    pattern: {
      value: /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"—()!?-]+$/,
      message: 'Введіть коректний текст'
    }
  },

  descriptionEn: {
    required: 'Введіть англійською опис екскурсії',
    minLength: {
      value: 5,
      message: 'Мінімальна довжина поля 5 символів'
    },
    maxLength: {
      value: 790,
      message: 'Максимальна довжина поля 790 символів'
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

        const checkType = [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/webp',
          'for-url'
        ].includes(file.type);
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
  },

  timeFrom: {
    required: 'Введіть мінімальну кількість хвилин',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 2 символи'
    },
    maxLength: {
      value: 3,
      message: 'Максимальна довжина поля 3 символи'
    },
    pattern: {
      value: /^\s*[\d]+([,.][\d]+)?\s*$/,
      message: 'Введіть коректний текст'
    }
  },

  timeTill: {
    required: 'Введіть максимальну кількість хвилин',
    minLength: {
      value: 2,
      message: 'Мінімальна довжина поля 5 символи'
    },
    maxLength: {
      value: 3,
      message: 'Максимальна довжина поля 3 символи'
    },
    pattern: {
      value: /^\s*[\d]+([,.][\d]+)?\s*$/,
      message: 'Введіть коректний текст'
    }
  },

  visitorsNumber: {
    required: 'Введіть кількість відвідувачів',
    minLength: {
      value: 1,
      message: 'Мінімальна довжина поля 1 символ'
    },
    maxLength: {
      value: 25,
      message: 'Максимальна довжина поля 25 символів'
    },
    pattern: {
      value: /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/,
      message: 'Введіть коректний текст'
    }
  }
};
