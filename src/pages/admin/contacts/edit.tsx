import TextInput from '@/components/admin/inputs/TextInput';
import { ContactsFormInput } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { editEmail, editPhone } from '@/store/slices/contactsSlice';
import { contactsValidation } from './contactsValidation';
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
    setValue,
    formState: { errors, isDirty, isValid }
  } = useForm<ContactsFormInput>({
    mode: 'onChange',
    defaultValues: {}
  });

  useEffect(() => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(data)) {
      setValue('email', data);
      setCurrentType('email');
    } else {
      setValue('phone', data);
      setCurrentType('phone');
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<ContactsFormInput> = async (
    values: ContactsFormInput
  ) => {
    console.log(values);
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
            rules={
              currentType === 'email'
                ? contactsValidation.email
                : contactsValidation.phone
            }
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
              className={`${
                isDirty && isValid ? 'bg-accent' : 'bg-disabled'
              } mt-4 basis-3/6 p-2 text-white`}
              disabled={!isDirty || !isValid}
            >
              {isProcessing ? 'Обробка запиту...' : 'Змінити'}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 basis-3/6 border border-black bg-white p-2  hover:border-accent focus:border-lightgrey"
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
