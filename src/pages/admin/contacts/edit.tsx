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
        <form className="flex flex-1 flex-col gap-4 p-4">
          <label>
            Оновіть телефон або емейл
            <input
              type="text"
              placeholder="edit contact"
              value={data}
              className="my-2 w-full rounded-md border-2 border-black p-2"
              onChange={(e) =>
                currentType === 'email'
                  ? setEmail(e.target.value)
                  : setPhone(e.target.value)
              }
            />
          </label>
          <div className="flex gap-4">
            <button className="mt-4 w-[8rem] rounded-md bg-gray-200 p-2 hover:bg-gray-300">
              Submit
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-[8rem] rounded-md bg-red-200 p-2 hover:bg-red-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
