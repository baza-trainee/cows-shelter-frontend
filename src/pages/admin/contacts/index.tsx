import { useState } from 'react';
// import Confirm from '@/components/admin/Confirm';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
//import Edit from './edit';
import { Link } from 'react-router-dom';

const contacts = {
  phone: '+380 987 675 765',
  email: 'zdravejutta@gmail.com'
};

const Contacts = () => {
  //const [data, setData] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen flex-col items-start pt-10">
      <h3 className="mb-8 ml-8 text-[32px] font-semibold">Контакти</h3>
      <div className="mb-4 ml-8 flex max-w-[21.5rem] flex-col items-center justify-between border border-black px-[90px] pt-8">
        <h2 className="pb-2 text-center text-base">Ваша електронна адреса:</h2>
        <p className="pb-8 text-lg font-bold text-darkgray">{contacts.email}</p>
        <div className="flex bg-lightgrey">
          <Link to={`/admin/contacts/edit/${contacts.email}`}>
            <button
              className="lightgrey border border-r-darkgray border-t-darkgray px-[4.65rem]  py-2 text-xl text-black hover:text-accent"
            >
              <BsFillPencilFill />
            </button>
          </Link>

          <button
            className="border border-t-darkgray px-[4.65rem] py-2 text-xl text-black hover:text-red-500"
            onClick={() => setShowConfirmEmail(true)}
          >
            <BsFillTrash3Fill />
          </button>
          {showConfirmEmail && (
            <Confirm
              setShowConfirm={setShowConfirmEmail}
              title="Ви впевнені, що хочете видалити електронну пошту?"
              onConfirm={() => {
                console.log('delete');
              }}
            />
          )}
        </div>
      </div>
      <div className="ml-8 flex max-w-[21.5rem] flex-col items-center justify-between border border-black px-[90px]  pt-8">
        <h2 className="pb-2 text-center text-base">Ваш номер телефону:</h2>
        <p className="pb-8 text-lg font-bold text-darkgray">{contacts.phone}</p>
        <div className="flex bg-lightgrey">
          <Link to={`/admin/contacts/edit/${contacts.phone}`}>
            <button
              //onClick={() => {
              //  setData(contacts.phone), setIsModalOpen(true);
              //}}
              className="border border-r-darkgray border-t-darkgray  px-[4.65rem] py-2 text-xl text-black hover:text-accent "
            >
              <BsFillPencilFill />
            </button>
          </Link>
          <button
            className="border border-t-darkgray px-[4.65rem] py-2 text-xl text-black hover:text-red-500"
            onClick={() => setShowConfirm(true)}
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      </div>
      {/*isModalOpen && <Edit data={data} />*/}
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          title="Ви впевнені, що хочете видалити номер телефону?"
          onConfirm={() => {
            console.log('delete');
          }}
        />
      )}
    </div>
  );
};

export default Contacts;
