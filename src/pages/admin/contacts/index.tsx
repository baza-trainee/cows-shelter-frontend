import { useEffect, useState } from 'react';
import Pen from '@/components/icons/Pen';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Edit from './edit';
import { fetchContacts } from '@/store/slices/contactsSlice';
import Loader from '@/components/admin/Loader';
import ResponseAlert from '@/components/admin/ResponseAlert';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const isLoading = useAppSelector((state) => state.posts.loading);
  const isAlertOpen = useAppSelector((state) => state.alert.isAlertOpen);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch, isModalOpen]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex min-h-screen flex-col items-start  pt-10">
      <h3 className="mb-8 ml-8 text-[32px] font-semibold">Контакти</h3>
      <div className="mb-4 ml-8 flex max-w-[21.5rem] flex-col items-center justify-between border border-black px-[90px] pb-2 pt-8">
        <h2 className="pb-2 text-center text-base">Ваша електронна адреса:</h2>
        <p className="pb-8 text-lg font-bold text-black">
          {contacts[0]?.email}
        </p>
        <div className="flex w-full ">
          <button
            onClick={() => {
              setData(contacts[0]?.email), setIsModalOpen(true);
            }}
            className="w-full border border-darkgray  bg-lightgrey px-[4.65rem] py-2 text-xl text-black hover:text-accent"
          >
            <Pen />
          </button>
        </div>
      </div>
      <div className="ml-8 flex max-w-[21.5rem] flex-col items-center justify-between border border-black px-[90px]  pb-2 pt-8">
        <h2 className="pb-2 text-center text-base">Ваш номер телефону:</h2>
        <p className="pb-8 text-lg font-bold text-black">
          {contacts[0]?.phone}
        </p>
        <div className="flex bg-lightgrey">
          <button
            onClick={() => {
              setData(contacts[0]?.phone), setIsModalOpen(true);
            }}
            className="w-full border border-darkgray px-[4.65rem] py-2 text-xl text-black hover:text-accent"
          >
            <Pen />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Edit
          setIsModalOpen={setIsModalOpen}
          data={data}
          id={contacts[0]?.id}
        />
      )}
      {isAlertOpen && <ResponseAlert />}
    </div>
  );
};

export default Contacts;
