import ErrorIcon from '@/components/icons/ErrorIcon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from './schema/passwordSchema';
import { NavLink } from 'react-router-dom';
import { changePassword } from '../fetchin/fetchin';
import { useState } from 'react';
import PopUpConfirmPassword from './PopUpConfirmPassword';
import PopUpSuccessNewPassword from './PopUpSuccessNewPassword';
import LoaderSmoll from '@/components/admin/LoaderSmoll';

type FormValuesPasswordd = {
  password: string;
  confirmpassword: string;
};

const NewPassword = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [successChangePassword, setsuccessChangePassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isValid, isDirty }
  } = useForm<FormValuesPasswordd>({
    resolver: zodResolver(passwordSchema),
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

  const closeConfirmPassword = () => setShowConfirm(false);
  const openConfirmPassword = () => setShowConfirm(true);

  const onSubmit = async () => {
    setIsLoader(true);
    try {
      const user = localStorage.getItem('user');
      const { email } = JSON.parse(user as string);
      const password = getValues('password');
      const body = {
        email,
        password
      };

      const result = await changePassword(body);
      localStorage.setItem('user', JSON.stringify(result.data));
      setsuccessChangePassword(true);
    } catch (error: any) {
      setError('confirmpassword', {
        type: 'manual',
        message: error.response.data.message
      });
    } finally {
      setIsLoader(false);
    }
  };

  console.log(isValid);

  return (
    <div className="px-12 py-10">
      <h2 className=" mb-[59px] text-[2rem] font-semibold">Зміна пароля</h2>
      <form onSubmit={handleSubmit(openConfirmPassword)} action="" className="">
        <label htmlFor="" className="relative mb-6 block w-[386px]">
          Новий пароль:
          <input
            {...register('password')}
            className={`mt-1 block w-[100%] border ${
              errors.password && 'border-red'
            } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
            type="text"
            onBlur={onPasswordChange}
            placeholder="Введіть новий пароль "
          />
          <div className="relative">
            <p
              className={`text-[0.875rem] ${
                errors.password ? 'text-red' : ' text-darkgray'
              } `}
            >
              Пароль має складатись з 6-12 символів і містити цифри та латинські
              літери
            </p>

            {errors.password && (
              <div className="absolute -top-[30px] right-[14px]">
                <ErrorIcon />
              </div>
            )}
          </div>
        </label>
        <label
          htmlFor=""
          className={`${
            !isPasswordField || !!errors.password
              ? 'text-disabled'
              : 'text-black'
          } relative mb-10 block w-[386px]`}
        >
          Підтвердження нового пароля:
          <input
            {...register('confirmpassword')}
            className={`mt-1 block w-[100%] border disabled:text-disabled ${
              errors.confirmpassword && 'border-red'
            } ${
              !isPasswordField || !!errors.password
                ? 'border-disabled'
                : 'border-darkgray'
            }  px-[14px] py-[10px] placeholder:text-disabled`}
            type="text"
            placeholder="Введіть новий пароль ще раз"
            onBlur={onPasswordChange}
            disabled={!isPasswordField || !!errors.password}
          />
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
        <p
          className={`${
            isValid ? 'text-black' : 'text-disabled'
          } mb-3 font-medium text-[1.063]`}
        >
          Змінити пароль?
        </p>
        {isLoader ? (
          <LoaderSmoll />
        ) : (
          <div className="flex gap-5 text-lg font-medium">
            <button
              className={`w-[13.5rem] px-6 py-2 font-medium ${
                isDirty && isValid
                  ? 'cursor-pointer bg-accent text-black'
                  : 'cursor-not-allowed bg-disabled text-white'
              }`}
            >
              Змінити
            </button>
            <NavLink
              to="/admin"
              className="w-[13.5rem] border border-black bg-white px-6 py-2 text-center font-medium transition-all hover:border-accent active:border-disabled"
            >
              Скасувати
            </NavLink>
          </div>
        )}
      </form>
      {showConfirm && (
        <PopUpConfirmPassword
          onSubmit={onSubmit}
          closeConfirmPassword={closeConfirmPassword}
          tittle="Ви впевнені, що хочете змінити свій пароль?"
          btn="Змінити"
        />
      )}
      {successChangePassword && (
        <PopUpSuccessNewPassword password={getValues('password')} />
      )}
    </div>
  );
};

export default NewPassword;
