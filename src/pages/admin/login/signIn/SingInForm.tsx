import ErrorIcon from '@/components/icons/ErrorIcon';
import HidePassword from '@/components/icons/HidePassword';
import ShowPasword from '@/components/icons/ShowPasword';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { singInSchema } from './schema/sindInSchema';
import PopUpForgotPassword from './PopUrForgotPassword';
import { FormValuesSignIn } from '@/types';
import { forgotPassword, login } from '../fetchin/fetchin';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '@/utils/errorHandling';
import LoaderSmoll from '@/components/admin/LoaderSmoll';

const SingInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isValid, touchedFields }
  } = useForm<FormValuesSignIn>({
    resolver: zodResolver(singInSchema),
    mode: 'onChange'
  });

  const isEmailField = Boolean(watch().email);
  const isShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<FormValuesSignIn> = async (data) => {
    setIsLoader(true);
    try {
      const result: any = await login(data);
      localStorage.setItem('user', JSON.stringify(result.data));
      navigate('/admin');
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError('email', {
          type: 'manual',
          message: errorHandling(error.response.status)
        });
      } else {
        setError('password', {
          type: 'manual',
          message: errorHandling(
            error.response
              ? error.response.status
              : 'Щось пішло не так. Спробуйте ще.'
          )
        });
      }
    } finally {
      setIsLoader(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoader(true);
    const body = { email: getValues('email') };
    try {
      await forgotPassword(body);
      console.log('success');
      setShowPopUp((prev) => !prev);
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Сервер не відповідає. Спробуйте ще.'
      });
    } finally {
      setIsLoader(false);
    }
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
      {!isLoader && (
        <button
          onClick={handleForgotPassword}
          className="mx-auto mb-[77px] block border-b border-current text-darkyellow disabled:text-disabled"
          disabled={!isEmailField || !!errors.email}
        >
          Не пам’ятаю пароль
        </button>
      )}

      {showPopUp && (
        <PopUpForgotPassword
          email={getValues('email')}
          closePopup={() => setShowPopUp(false)}
        />
      )}
      {isLoader ? (
        <LoaderSmoll />
      ) : (
        <button
          className=" mx-auto inline-block w-[330px]  bg-accent px-5 py-3 text-lg transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow  disabled:bg-disabled  disabled:text-white "
          type="submit"
          disabled={!isValid}
        >
          Увійти
        </button>
      )}
    </form>
  );
};

export default SingInForm;
