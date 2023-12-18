import ErrorIcon from '@/components/icons/ErrorIcon';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '../newPassword/schema/passwordSchema';
import { errorHandling } from '@/utils/errorHandling';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../fetchin/fetchin';
import { useState } from 'react';
import LoaderSmoll from '@/components/admin/LoaderSmoll';

type FormValuesPassword = {
  password: string;
  confirmpassword: string;
};

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<FormValuesPassword>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange'
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
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

  const onSubmit: SubmitHandler<FormValuesPassword> = async ({ password }) => {
    setIsLoader(true);
    try {
      const body = { token, password };
      await resetPassword(body);
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      setError('confirmpassword', {
        type: 'manual',
        message: errorHandling(error.response.status)
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
        Новий пароль:
        <input
          {...register('password')}
          className={`block  w-[100%] border ${
            errors.password && 'border-red'
          } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
          type="text"
          onBlur={onPasswordChange}
          placeholder="Введіть новий пароль "
        />
        <div className="relative">
          {!errors.password && (
            <p className="text-[0.875rem] text-darkgray">
              Пароль має складатись з 6-12 символів і містити цифри та латинські
              літери
            </p>
          )}
          {errors.password && (
            <div className="relative">
              <p className="text-[0.75rem] text-red">
                {errors.password.message}
              </p>
              <div className="absolute -top-[30px] right-[14px]">
                <ErrorIcon />
              </div>
            </div>
          )}
        </div>
      </label>
      <label
        htmlFor=""
        className={`${
          !isPasswordField || !!errors.password ? 'text-disabled' : 'text-black'
        } relative mb-10 block`}
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
      {isLoader ? (
        <LoaderSmoll />
      ) : (
        <button
          type="submit"
          disabled={!isValid}
          className=" mx-auto mt-16 inline-block w-[330px] bg-accent px-5 py-3 text-lg transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow  disabled:bg-disabled  disabled:text-white "
        >
          Змінити
        </button>
      )}
    </form>
  );
};

export default NewPassword;
