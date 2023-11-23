import { useState, useEffect } from 'react';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AddIcon from '@/components/icons/AddIcon';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchPartners, removePartner } from '@/store/slices/partnersSlice';
import Loader from '@/components/admin/Loader';

const Partners = () => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const isLoading = useAppSelector((state) => state.partners.loading);
  const partners = useAppSelector((state) => state.partners.partners);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const deletePartner = () => {
    dispatch(removePartner(currentId));
    setShowConfirm(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-12 pt-10">
      <h1 className="leading-48 mb-8 text-left text-3xl font-semibold tracking-normal">
        Партнери
      </h1>
      <div className="flex gap-5">
        <div className="flex h-[288px]  flex-col	 items-center justify-center border-2 border-blue-300 px-8 ">
          {' '}
          <Link to="/admin/partners/add">
            <button className="mb-4">
              <AddIcon />
            </button>
          </Link>
          <h2 className="w-[147px]">Додати Партнера</h2>
        </div>
        <div className="flex flex-wrap gap-5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-[288px] w-[211px] flex-col border-2 border-blue-300 px-[25.5px] pt-6"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={160}
                className="mb-4"
              />
              <h2 className=" text-center text-lg font-bold text-darkgray">
                {partner.name}
              </h2>
              <div className="buttons mt-auto flex justify-between gap-2">
                <button className="flex h-10 w-10 items-center justify-center text-xl text-black hover:text-accent">
                  <Link to={`/admin/partners/edit/${partner.id}`}>
                    <BsFillPencilFill />
                  </Link>
                </button>
                <button
                  className="hover:text-red-500 flex h-10 w-10 items-center justify-center text-xl text-black"
                  onClick={() => {
                    setShowConfirm(true), setCurrentId(partner.id);
                  }}
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showConfirm && (
          <Confirm
            setShowConfirm={setShowConfirm}
            title="Чи ви впевнені, що хочете видалити партнера зі сторінки?"
            onConfirm={deletePartner}
          />
        )}
      </div>
    </div>
  );
};

export default Partners;
