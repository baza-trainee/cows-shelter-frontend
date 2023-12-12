import TextInput from '@/components/admin/inputs/TextInput';
import { ContactsFormInput } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/store/hook';
import { editEmail, editPhone } from '@/store/slices/contactsSlice';
import { contactsValidation } from './contactsSchema';
import { TfiClose } from 'react-icons/tfi';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  editErrorResponseMessage,
  editSuccessResponseMessage
} from '@/utils/responseMessages';
import { useNavigate } from 'react-router-dom';

type EditContactsProps = {
  id: string;
  data: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Edit = ({ setIsModalOpen, data, id }: EditContactsProps) => {
  const dispatch = useAppDispatch();
  const [currentType, setCurrentType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty, isValid }
  } = useForm<ContactsFormInput>({
    resolver: zodResolver(contactsValidation),
    mode: 'onChange',
    defaultValues: {}
  });

  useEffect(() => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(data)) {
      setCurrentType('email');
    } else {
      setCurrentType('phone');
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<ContactsFormInput> = async (
    values: ContactsFormInput
  ) => {
    try {
      setIsProcessing(true);
      currentType === 'email'
        ? await dispatch(editEmail({ id, values }))
        : await dispatch(editPhone({ id, values }));
      setIsProcessing(false);
      setIsModalOpen(false);
      dispatch(
        openAlert(
          editSuccessResponseMessage(
            `${
              currentType === 'email' ? 'eлектронної пошти' : 'номера телефону'
            }`
          )
        )
      );
      navigate('/admin/contacts');
    } catch (error: any) {
      dispatch(
        openAlert(
          editErrorResponseMessage(
            `${currentType === 'email' ? 'eлектронну пошту' : 'номер телефону'}`
          )
        )
      );
    }
  };

  console.log(isValid);
  console.log(errors);
  const currentValues = watch();
  console.log(currentValues);

  return (
    <div className="left-1/6 fixed top-0 z-20 h-full w-5/6 bg-[rgba(0,0,0,0.6)]">
      <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[60vh] w-[50vw] -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-4 bg-white px-4 py-8 text-black">
        <button
          className="absolute right-5 top-4 text-graphite hover:text-accent"
          onClick={() => setIsModalOpen(false)}
        >
          <TfiClose size={20} />
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="max-x-[23.75rem] mx-auto my-[3.75rem] flex flex-col justify-center gap-4 p-4 text-base"
        >
          <h4 className="text-2xl font-bold">
            {`Зміна 
            ${
              currentType === 'email' ? 'електронної пошти' : 'номера телефону'
            }`}
          </h4>
          <p className="text-graphite">
            {`Ваш ${
              currentType === 'email' ? 'електронна пошта' : 'номер телефону'
            }: `}
            <span className="text-[17px]">{data}</span>
          </p>
          <Controller
            name={currentType === 'email' ? 'email' : 'phone'}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                errorText={
                  currentType === 'email'
                    ? errors.email?.message
                    : errors.phone?.message
                }
                placeholder={
                  currentType === 'email'
                    ? 'Введіть електронну пошту'
                    : 'Введіть номер телефону'
                }
                title={
                  currentType === 'email'
                    ? 'Оновлена електронна пошта:'
                    : 'Оновлений номер телефону:'
                }
              />
            )}
          />
          <p
            className={`text-[17px] ${
              isDirty && isValid ? 'text-black' : 'text-disabled'
            }`}
          >{`Змінити ${
            currentType === 'email' ? 'електронну пошту' : 'номер телефону'
          }?`}</p>
          <div className="flex w-full gap-4">
            <button
              className={`w-[13.5rem] px-6 py-2 font-medium ${
                isDirty && !Object.keys(errors).length
                  ? 'cursor-pointer bg-accent text-black'
                  : 'cursor-not-allowed bg-disabled text-white'
              } mt-4 `}
              disabled={!isDirty || !!Object.keys(errors).length}
            >
              {isProcessing ? 'Обробка запиту...' : 'Змінити'}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-[13.5rem] border border-black bg-white p-2  hover:border-accent focus:border-lightgrey"
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
