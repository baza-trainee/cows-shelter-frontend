import { z } from 'zod';
import { formatBytes } from '@/utils/formatBytes';

const MAX_FILE_SIZE = 1024 * 1024 * 3;

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'for-url'
];

export const excursionsValidation = z.object({
  titleUa: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(40, 'Заголовок має містити максимум 40 символів')
    .refine(
      (value) => /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/.test(value),
      {
        message: 'Введіть коректний заголовок'
      }
    ),

  titleEn: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(40, 'Заголовок має містити максимум 40 символів')
    .refine((value) => /^[a-zA-Z\s\d'’.,-:;"()!?-]+$/.test(value), {
      message: 'Введіть коректний заголовок англійською мовою'
    }),

  descriptionUa: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(750, 'Заголовок має містити максимум 750 символів')
    .refine(
      (value) => /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/.test(value),
      {
        message: 'Введіть коректний текст'
      }
    ),

  descriptionEn: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(750, 'Заголовок має містити максимум 750 символів')
    .refine((value) => /^[a-zA-Z\s\d'’.,:;"()!?-]+$/.test(value), {
      message: 'Введіть коректний текст англійською мовою'
    }),

  timeFrom: z
    .string({ required_error: 'Введіть мінімальну кількість хвилин' })
    .min(2, 'Мінімальна довжина поля 2 символи')
    .max(3, 'Максимальна довжина поля 3 символи')
    .refine((value) => /^\s*[\d]+([,.][\d]+)?\s*$/.test(value), {
      message: 'Введіть коректний текст англійською мовою'
    }),

  timeTill: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(2, 'Мінімальна довжина поля 2 символи')
    .max(3, 'Максимальна довжина поля 3 символи')
    .refine((value) => /^\s*[\d]+([,.][\d]+)?\s*$/.test(value), {
      message: 'Введіть коректний текст англійською мовою'
    }),

  visitorsNumber: z
    .string({ required_error: 'Введіть кількість відвідувачів' })
    .min(1, 'Мінімальна довжина поля 1 символ')
    .max(10, 'Максимальна довжина поля 10 символів')
    .refine(
      (value) => /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/.test(value),
      {
        message: 'Введіть коректний текст англійською мовою'
      }
    ),

  image: z
    .any()
    .refine((value) => value?.length > 0, 'Додайте зображення')
    .refine((value) => {
      value && value?.[0]?.size === 0 && value?.[0]?.type === 'for-url';
      return true;
    })
    .refine(
      (value) => value?.[0]?.size <= MAX_FILE_SIZE,
      `Максимальний розмір зображення ${formatBytes(MAX_FILE_SIZE)}`
    )
    .refine(
      (value) => ACCEPTED_IMAGE_TYPES.includes(value?.[0]?.type),
      'Оберіть фото в форматі .jpg, .jpeg, .png або .webp.'
    )
});
