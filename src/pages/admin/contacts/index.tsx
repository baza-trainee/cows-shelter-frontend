import { useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import Edit from './edit';

const contacts = {
  phone: '+380 987 675 765',
  email: 'zdravejutta@gmail.com'
};

const Contacts = () => {
  const [data, setData] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mb-4 flex w-2/3 items-center justify-between border-b border-black p-2">
        <h2 className="text-center text-lg font-bold text-darkgray">
          {contacts.email}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setData(contacts.email), setIsModalOpen(true);
            }}
            className="text-xl text-black hover:text-accent"
          >
            <BsFillPencilFill />
          </button>
          <button
            className="text-xl text-black hover:text-red-500"
            onClick={() => setShowConfirm(true)}
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      </div>
      <div className="flex w-2/3 items-center justify-between border-b border-black p-2">
        <h2 className="text-center text-lg font-bold text-darkgray">
          {contacts.phone}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setData(contacts.phone), setIsModalOpen(true);
            }}
            className="text-xl text-black hover:text-accent"
          >
            <BsFillPencilFill />
          </button>
          <button
            className="text-xl text-black hover:text-red-500"
            onClick={() => setShowConfirm(true)}
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      </div>
      {isModalOpen && <Edit setIsModalOpen={setIsModalOpen} data={data} />}
      {showConfirm && <Confirm setShowConfirm={setShowConfirm} />}
    </div>
  );
};

export default Contacts;
