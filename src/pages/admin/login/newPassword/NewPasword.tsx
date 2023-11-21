import ErrorIcon from '@/components/icons/ErrorIcon';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from './schema/passwordSchema';

type FormValuesPassword = {
  password: string;
  confirmpassword: string;
};

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields }
  } = useForm<FormValuesPassword>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange'
  });

  const isPasswordField = Boolean(watch().password);

  const onSubmit: SubmitHandler<FormValuesPassword> = (data) => {
    console.log(data);
  };
  return (
    <div className="px-12 py-10">
      <h2 className=" mb-[59px] text-[2rem] font-semibold">Зміна пароля</h2>
      <form onSubmit={handleSubmit(onSubmit)} action="" className="">
        <label htmlFor="" className="relative mb-6 block w-[386px]">
          Новий пароль:
          <input
            {...register('password')}
            className={`mt-1 block w-[100%] border ${
              errors.password && 'border-red'
            } border-darkgray px-[14px] py-[10px] placeholder:text-disabled`}
            type="password"
            placeholder="Введіть новий пароль "
          />
          <div className="relative">
            <p
              className={`text-[0.875rem] ${
                touchedFields.password && errors.password
                  ? 'text-red'
                  : ' text-darkgray'
              } `}
            >
              Пароль має складатись з 6-12 символів і містити цифри та латинські
              літери
            </p>
            {touchedFields.password && errors.password && (
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
            type="password"
            placeholder="Введіть новий пароль ще раз"
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
        <div className="flex gap-5 text-lg font-medium">
          <button
            type="button"
            disabled={!isValid}
            className="w-[183px] bg-accent px-5 py-3 transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow  disabled:bg-disabled  disabled:text-white"
          >
            Змінити
          </button>
          <button
            type="button"
            className="w-[183px] border border-black px-5 py-3 transition-all duration-300 hover:border-transparent hover:bg-lemon  focus:bg-lemon  active:bg-darkyellow "
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
