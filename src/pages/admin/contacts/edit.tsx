import {  useEffect, useState } from 'react';
import cross from '@/assets/icons/icon_close.svg'
import { Link, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {contacts} from "@/data/contacts";
import { defaultValues } from './defaultValues';
import TextInput from '@/components/admin/inputs/TextInput';
import { Contacts } from '@/types';
import { contactsValidation } from './contactsValidation';

const EditContacts = () => {
  const [currentType, setCurrentType] = useState<string>('');
  const { contact } = useParams();
  const possessiveCaseText = getText(currentType, 'possessive');
  const subjectiveCaseText = getText(currentType, 'subjective');
  const accusativeCaseText = getText(currentType, 'accusative');
  
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid }
  } = useForm<Contacts>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  useEffect(() => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (contact) {
      if (emailRegex.test(contact)) {
        setCurrentType('email');
      } else {
        setCurrentType('phone');
      }
    }
  }, [contact]);

  useEffect(() => {
    if (!currentType) return;
    const contactObject = contacts;
    if (currentType === "email") {
      setValue('email', contactObject?.email || '');
    } else {
      setValue('phone', contactObject?.phone || '');
    }
  }, [currentType, setValue])
  
  const onSubmit: SubmitHandler<Contacts> = (data) => {
    console.log(data)
  };

  function getText(curType: string, caseContact: string) {
    let resultedText = '';
    if (curType === "email") {
        switch(caseContact) {
          case "subjective" :
            resultedText += " електронна пошта";
          break;
          case "possessive" : 
            resultedText += ' електронної пошти';
          break;
          case "accusative": 
            resultedText += ' електронну пошту';
          break;
        }
    } else {
        switch (caseContact) {
          case 'subjective':
            resultedText += ' номер телефону';
            break;
          case 'possessive':
            resultedText += ' номера телефону';
            break;
          case 'accusative':
            resultedText += ' номер телефону';
            break;
        }
    }
    return resultedText;
  };

  return (
    <div className="flex justify-center pt-[3.75rem]">
      <Link to="/admin/contacts">
        <img src={cross} className="absolute right-5 top-5" />
      </Link>
      <div className="max-w-[25rem]">
        <form
          className="flex flex-1 flex-col gap-4 text-base"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-2xl font-bold">
            {`Зміна ${possessiveCaseText}`}
          </h4>
          <p className="tracking-tight text-graphite">
            {`${
              currentType === 'email' ? 'Ваша' : 'Ваш'
            } ${subjectiveCaseText}: `}
            <span className="text-[1.06rem]">{contact}</span>
          </p>
          <label>
            {`
            ${
              currentType === 'email' ? 'Оновлена' : 'Оновлений'
            } ${subjectiveCaseText}:`}
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
                  placeholder={`Введіть ${
                    currentType === 'email' ? 'нову адресу' : 'номер телефону'
                  }`}
                />
              )}
            />
          </label>
        <p className={`text-[17px] ${ isValid ?"text-black" :"text-disabled"} `}>{`Змінити ${accusativeCaseText}?`}</p>
          <div className="flex w-full gap-5">
            <button
              type="submit"
              className={`mt-4 w-[12rem] ${
                isValid ? 'bg-accent' : 'bg-disabled'
              } py-2 text-white`}
            >
              Змінити
            </button>
            <Link to="/admin/contacts">
              <button className="hover:bg-red-300 mt-4 w-[12rem] border bg-white py-2">
                Скасувати
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContacts;