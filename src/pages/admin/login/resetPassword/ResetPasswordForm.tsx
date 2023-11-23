import ErrorIcon from '@/components/icons/ErrorIcon';
import HidePassword from '@/components/icons/HidePassword';
import ShowPasword from '@/components/icons/ShowPasword';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema } from './schema/schema';
import { FormValuesSignIn } from '@/types';
// import { forgotPassword, login, resetPassword } from '../fetchin/fetchin';
// import { useNavigate } from 'react-router-dom';

type ResetPasswordValue = {
  email: string;
  password: string;
  confirmpassword: string;
};

const ReserPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors, isValid, touchedFields }
  } = useForm<ResetPasswordValue>({
    resolver: zodResolver(resetSchema),
    mode: 'onChange'
  });

  const isPasswordField = Boolean(watch().password);

  const onPasswordChange = () => {
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmpassword');

    if (
      passwordValue &&
      confirmPasswordValue &&
      passwordValue !== confirmPasswordValue
    ) {
      setError('confirmpassword', {
        type: 'manual',
        message: 'Паролі не збігаються. Спробуйте ще'
      });
    } else {
      clearErrors('confirmpassword');
    }
  };

  const isShowPassword = () => setShowPassword((prev) => !prev);
  const isShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const onSubmit: SubmitHandler<FormValuesSignIn> = async ({
    email,
    password
  }) => {
    const body = { email, password };
    console.log(body);
    // try {
    //   await resetPassword(body);
    //   console.log('success');
    //   navigate('/signin');
    // } catch (error: any) {
    //   console.log(error);
    //   setError('password', {
    //     type: 'manual',
    //     message: error.response.data.message
    //   });
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="mx-auto mb-[60px] w-[330px]"
    >
      <label htmlFor="" className="relative mb-4 block">
        Email:
        <input
          {...register('email')}
          className={` block w-[100%] border ${
            errors.email && 'border-red'
          } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
          placeholder="Введіть свій email"
        />
        {touchedFields.email && errors.email && (
          <div className="">
            <p className="w-[330px]  text-[0.75rem]  text-red">
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
          {...register('password')}
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
        {touchedFields.password && errors.password && (
          <div className="relative">
            <p className="text-[0.75rem] text-red">{errors.password.message}</p>
            <div className="absolute -top-[30px] right-[14px]">
              <ErrorIcon />
            </div>
          </div>
        )}
      </label>
      <label htmlFor="" className="relative mb-6 block">
        Підтвердження нового пароля:
        <input
          {...register('confirmpassword')}
          className={`block  w-[100%] border ${
            errors.confirmpassword && 'border-red'
          } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Введіть новий пароль ще раз"
          onBlur={onPasswordChange}
          disabled={!isPasswordField || !!errors.password}
        />
        {!errors.confirmpassword && (
          <button
            className="absolute right-[14px] top-9"
            type="button"
            onClick={isShowConfirmPassword}
          >
            {showConfirmPassword ? <HidePassword /> : <ShowPasword />}
          </button>
        )}
        {errors.confirmpassword && (
          <div className="relative">
            <p className="text-[0.75rem]  text-red">
              {errors.confirmpassword.message}
            </p>
            <div className="absolute -top-[30px] right-[14px]">
              <ErrorIcon />
            </div>
          </div>
        )}
      </label>
      <button
        className=" mx-auto mt-16 inline-block w-[330px] bg-accent px-5 py-3 text-lg transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow  disabled:bg-disabled  disabled:text-white "
        type="submit"
        disabled={!isValid}
      >
        Увійти
      </button>
    </form>
  );
};

export default ReserPasswordForm;
