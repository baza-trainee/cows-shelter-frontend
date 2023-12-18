import { z } from 'zod';

export const passwordSchema = z.object({
  password: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(value), {
      message:
        'Пароль має складатись з 6-12 символів і містити цифри та латинські літери'
    }),
  confirmpassword: z
    .string({ required_error: 'Поле повинно бути заповнене' })
    .refine((value) => value.length > 0, {
      message: 'Поле повинно бути заповнене'
    })
});
