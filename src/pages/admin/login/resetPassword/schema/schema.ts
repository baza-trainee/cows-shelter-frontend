import { z } from 'zod';

export const resetSchema = z.object({
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
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(value), {
      message:
        'Пароль має складатись з 6-12 символів і містити цифри та латинські літери'
    }),
  confirmpassword: z.string({ required_error: 'Поле повинно бути заповнене' })
});
