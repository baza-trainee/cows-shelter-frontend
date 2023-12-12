import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@/components/admin/inputs/TextInput';
import { ContactsFormInput } from '@/types';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/store/hook';
import { addContacts } from '@/store/slices/contactsSlice';
import { contactsValidation } from './contactsSchema';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  addErrorResponseMessage,
  addSuccessResponseMessage
} from '@/utils/responseMessages';

const AddContacts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<ContactsFormInput>({
    resolver: zodResolver(contactsValidation),
    mode: 'onChange',
    defaultValues: { email: '', phone: '' }
  });

  const currentValues = watch();

  const onSubmit: SubmitHandler<ContactsFormInput> = async (
    values: ContactsFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(addContacts(values));
      setIsProcessing(false);
      dispatch(openAlert(addSuccessResponseMessage('контакти')));
      navigate(-1);
    } catch (error: any) {
      dispatch(openAlert(addErrorResponseMessage('контакти')));
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-9 mt-12">
        <h1 className="text-3xl font-bold">Додавання контактів</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-1 flex-col gap-4 p-4 text-base"
        >
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                errorText={errors.email?.message}
                placeholder={'Введіть електронну пошту'}
                title={'Електронна пошта'}
                value={currentValues.email}
              />
            )}
          />
          <Controller
            name={'phone'}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                errorText={errors.phone?.message}
                placeholder={'Введіть номер телефону'}
                title={'Номер телефону'}
                value={currentValues.phone}
              />
            )}
          />
          <p className="text-[17px] text-disabled">{`Додати нові контакти`}</p>
          <div className="flex items-center gap-4">
            <button className=" w-[13.5rem] bg-gray-200 px-6 py-2 transition-all hover:bg-accent">
              {isProcessing ? 'Обробка запиту...' : 'Додати'}
            </button>
            <Link to="/admin/contacts">
              <button className="w-[13.5rem] border-2 border-lightgrey bg-white px-6 py-2 transition-all hover:bg-lightgrey">
                Скасувати
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContacts;
