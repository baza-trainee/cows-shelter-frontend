import ErrorIcon from '@/components/icons/ErrorIcon';
import HidePassword from '@/components/icons/HidePassword';
import ShowPasword from '@/components/icons/ShowPasword';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const isShowPassword = () => setShowPassword((prev) => !prev);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className="flex w-[1280px] border-2 border-green-600">
      <div className="w-[620px] pt-[60px] ">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Адміністрування сайту
        </h2>
        <h3 className=" mb-4 text-center text-[1.375rem]">
          Підтвердіть свій акаунт
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="mx-auto mb-[60px] w-[330px]"
        >
          <label htmlFor="" className="relative mb-4 block">
            Email:
            <input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Поле повинно бути заповнене'
                }
              })}
              className={` block w-[100%] border ${
                errors.email && 'border-red'
              } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
              type="email"
              placeholder="Введіть свій email"
            />
            {errors.email && (
              <div className="">
                <p className="text-red  w-[330px]  text-[0.75rem]">
                  {errors.email.message}
                </p>
                <div className="absolute right-[14px] top-[38px]">
                  <ErrorIcon />
                </div>
              </div>
            )}
          </label>

          <label htmlFor="" className="relative mb-6 block">
            Пароль:
            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Поле повинно бути заповнене'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]{6}$/,
                  message:
                    'Пароль має складатись з 6 символів і містити цифри та латинські літери'
                }
              })}
              className={`block  w-[100%] border ${
                errors.password && 'border-red'
              } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Введіть пароль "
            />
            {!errors.password && (
              <button
                className="absolute right-[14px] top-9"
                type="button"
                onClick={isShowPassword}
              >
                {showPassword ? <HidePassword /> : <ShowPasword />}
              </button>
            )}
            {errors.password && (
              <div className="relative">
                <p className="text-red text-[0.75rem]">
                  {errors.password.message}
                </p>
                <div className="absolute -top-[30px] right-[14px]">
                  <ErrorIcon />
                </div>
              </div>
            )}
          </label>

          <button
            className="mx-auto mb-[81px] block border-b border-current text-darkyellow disabled:text-disabled "
            type="button"
          >
            Не пам’ятаю пароль
          </button>
          <button
            className=" mx-auto inline-block w-[330px] px-5 py-3 text-lg disabled:bg-disabled disabled:text-white"
            type="submit"
            // disabled
          >
            Увійти
          </button>
        </form>
        <div className="flex justify-center gap-2">
          <p>Не маєте акаунту? </p>
          <a href="" className="border-b border-current text-darkyellow">
            Зареєструватись
          </a>
        </div>
      </div>
      <img src="/admin/img-login.png" width="660px" alt="cow" />
    </section>
  );
};
export default Login;
