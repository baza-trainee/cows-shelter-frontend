import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type EditContactsProps = {
  data: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Edit = ({ setIsModalOpen, data }: EditContactsProps) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [currentType, setCurrentType] = useState('');

  useEffect(() => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(data)) {
      setEmail(data);
      setCurrentType('email');
    } else {
      setPhone(data);
      setCurrentType('phone');
    }
  }, [data]);

  console.log(currentType === 'email' ? email : phone);

  return (
    <div className="left-1/6 fixed top-0 z-20 h-full w-5/6 bg-[rgba(0,0,0,0.6)]">
      <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[60vh] w-[50vw] -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-4 bg-white px-4 py-8 text-black">
        <form className="flex flex-1 flex-col gap-4 p-4 text-base">
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
          <label>
            {`
            ${
              currentType === 'email'
                ? 'Оновлена електронна пошта'
                : 'Оновлений номер телефону'
            }:`}
            <input
              type="text"
              placeholder={`Введіть ${
                currentType === 'email' ? 'електронну пошту' : 'номер телефону'
              }`}
              //value={}
              className="my-2 w-full border-2 border-black p-2"
              onChange={(e) =>
                currentType === 'email'
                  ? setEmail(e.target.value)
                  : setPhone(e.target.value)
              }
            />
          </label>
          <p className="text-[17px] text-disabled">{`Змінити ${
            currentType === 'email' ? 'електронну пошту' : 'номер телефону'
          }?`}</p>
          <div className="flex gap-4">
            <button className="mt-4 w-[8rem] text-white bg-disabled p-2 hover:bg-gray-300">
              Змінити
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-[8rem] bg-white p-2 hover:bg-red-300 border"
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
