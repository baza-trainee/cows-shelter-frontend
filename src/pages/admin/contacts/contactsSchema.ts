import { z } from 'zod';

export const contactsValidation = z.object({
  email: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(2, 'Поле має містити мінімум 2 символи')
    .max(55, 'Поле має містити максимум 55 символів')
    .refine(
      (value) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value),
      {
        message: 'Введіть коректну адресу електронної пошти'
      }
    ),

  phone: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(2, 'Ім’я має містити мінімум 2 символи')
    .max(16, 'Ім’я має містити максимум 16 символів')
    .refine((value) => /^\+380\s\d{3}\s\d{3}\s\d{3}$/.test(value), {
      message: 'Формат номеру телефону +380 *** *** ***'
    })
});
