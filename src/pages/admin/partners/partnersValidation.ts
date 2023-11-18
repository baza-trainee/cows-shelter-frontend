import { z } from 'zod';
import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 500 * 1024;

export const PartnersFormSchema = z.object({
  title: z.object({
    required: z.string().min(2, 'Мінімальна довжина поля 2 символи')
  }),

  link: z.object({
    required: z.string().min(5, 'Мінімальна довжина поля 5 символів'),
    maxLength: z.string().max(300, 'Максимальна довжина поля 300 символів'),
    pattern: z
      .string()
      .refine((value) => /^[a-zA-Z\s\d'’.,:;"()!?-]+$/.test(value), {
        message: 'Введіть URL адресу'
      })
  }),

  image: z.object({
    required: z
      .any()
      .refine((value) => {
        if (
          typeof value === 'object' &&
          'length' in value &&
          value.length > 0
        ) {
          const file = value[0];
          return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
        }
        return false;
      }, 'Зображення має бути в форматі .jpg, .png або .webp')
      .refine(
        (value) => {
          if (
            typeof value === 'object' &&
            'length' in value &&
            value.length > 0
          ) {
            const file = value[0];
            return file.size <= sizeLimit;
          }
          return false;
        },
        `Максимальний розмір зображення ${formatBytes(sizeLimit)}`
      )
  })
});
