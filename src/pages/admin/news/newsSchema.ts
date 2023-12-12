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

export const newsValidation = z.object({
  titleUa: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(55, 'Заголовок має містити максимум 55 символів')
    .refine(
      (value) => /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/.test(value),
      {
        message: 'Введіть коректний заголовок'
      }
    ),

  titleEn: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(55, 'Заголовок має містити максимум 55 символів')
    .refine((value) => /^[a-zA-Z\s\d'’.,-:;"()!?-]+$/.test(value), {
      message: 'Введіть коректний заголовок англійською мовою'
    }),

  subTitleUa: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(150, 'Заголовок має містити максимум 150 символів')
    .refine(
      (value) => /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,-:;"()!?]+$/.test(value),
      {
        message: 'Введіть коректний текст'
      }
    ),

  subTitleEn: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(150, 'Заголовок має містити максимум 150 символів')
    .refine((value) => /^[a-zA-Z\s\d'’.,-:;"()!?-]+$/.test(value), {
      message: 'Введіть коректний текст англійською мовою'
    }),

  contentUa: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(2000, 'Заголовок має містити максимум 2000 символів')
    .refine(
      (value) => /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/.test(value),
      {
        message: 'Введіть коректний текст'
      }
    ),

  contentEn: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(3, 'Заголовок має містити мінімум 3 символи')
    .max(2000, 'Заголовок має містити максимум 2000 символів')
    .refine((value) => /^[a-zA-Z\s\d'’.,:;"()!?-]+$/.test(value), {
      message: 'Введіть коректний текст англійською мовою'
    }),

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
