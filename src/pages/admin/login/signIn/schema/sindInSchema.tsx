import { z } from 'zod';

export const singInSchema = z.object({
  email: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .refine(
      (value) =>
        /^[a-zA-Z0-9._%+-]+@(?!.*\.(ru|by))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          value
        ),
      {
        message: 'Введіть коректний email'
      }
    ),
  password: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .min(6, 'Пароль має містити мінімум 6 символів')
    .max(14, 'Пароль має містити максимум 14 символів')
});
