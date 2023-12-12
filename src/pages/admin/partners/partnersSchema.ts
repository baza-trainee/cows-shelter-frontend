import { z } from 'zod';
import { formatBytes } from '@/utils/formatBytes';

const MAX_FILE_SIZE = 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'for-url'
];

export const partnersValidation = z.object({
  name: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(2, 'Назва має містити мінімум 2 символи')
    .max(100, 'Назва має містити максимум 100 символів'),

  link: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(2, 'Лінк має містити мінімум 2 символи')
    .max(100, 'Лінк має містити максимум 100 символів')
    .url({ message: 'Введіть коректний лінк' }),

  logo: z
    .any()
    .refine((value) => value?.length > 0, 'Додайте лого партнера')
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
