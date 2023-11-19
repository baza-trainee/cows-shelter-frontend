import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import cross from '@/assets/icons/icon_close.svg'
import { Link, useParams } from 'react-router-dom';

//type EditContactsProps = {
//  data?: string;
  //setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
//};

const EditContacts = () => {
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentType, setCurrentType] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const { contact } = useParams();
  const possessiveCaseText = getText(currentType, 'possessive');
  const subjectiveCaseText = getText(currentType, 'subjective');
  const accusativeCaseText = getText(currentType, 'accusative');
  
  useEffect(() => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (contact) {
      if (emailRegex.test(contact)) {
        setEmail(contact);
        setCurrentType('email');
      } else {
        setPhone(contact);
        setCurrentType('phone');
      }
    }
  }, [contact]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (currentType === 'email') {
      setEmail(e.target.value);
    } else {
      setPhone(e.target.value);
    }
    if (isValidEmail(email) || isValidPhone(phone)) {
      setError(false);
      setDisable(false);
    } else {
      setError(true);
      setDisable(true);
    }
  };

  function isValidEmail(email: string) {
    let isValid = /\S+@\S+\.\S+/.test(email);
    return isValid;
  };

  function isValidPhone(phone: string) {
    let isValid =
      /^((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/.test(
        phone
      );
    return isValid;
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
  console.log(currentType === 'email' ? email : phone);

  return (
    <div className="flex justify-center pt-[3.75rem]">
      <Link to="/admin/contacts">
        <img src={cross} className="absolute right-5 top-5" />
      </Link>
      <div className="max-w-[25rem]">
        <form className="flex flex-1 flex-col gap-4 text-base">
          <h4 className="text-2xl font-bold">
            {`Зміна ${possessiveCaseText}`}
          </h4>
          <p className="tracking-tight text-graphite">
            {`${
              currentType === 'email' ? 'Ваша' : 'Ваш'
            } ${subjectiveCaseText}:`}
            <span className="text-[1.06rem]"> {contact}</span>
          </p>
          <label>
            {`
            ${
              currentType === 'email' ? 'Оновлена' : 'Оновлений'
            } ${subjectiveCaseText}:`}
            <input
              type="text"
              placeholder={`Введіть ${
                currentType === 'email' ? 'нову адресу' : 'номер телефону'
              }`}
              className={`${
                error
                  ? "border-red focus: border bg-[url('/src/assets/icons/icon_alert_circle.svg')] bg-[98%_50%] bg-no-repeat focus:border-transparent"
                  : ''
              } my-2 mr-[2.3rem] w-full border-2 border-black p-2`}
              onChange={changeHandler}
            />
            {error ? (
              <span className="text-red">
                {`Некоректний формат ${possessiveCaseText}`}
              </span>
            ) : null}
          </label>
          <p className="text-[17px] text-disabled">{`Змінити ${accusativeCaseText}?`}</p>
          <div className="flex w-full gap-5">
            <button
              className={`mt-4 w-[12rem] ${
                disable ? 'bg-disabled' : 'bg-accent'
              } py-2 text-white`}
            >
              Змінити
            </button>
            <Link to="/admin/contacts">
              <button className="mt-4 w-[12rem] border bg-white py-2 hover:bg-red-300">
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
