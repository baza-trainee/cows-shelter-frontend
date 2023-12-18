import { useState, useEffect } from 'react';
import Confirm from '@/components/admin/Confirm';
import Bucket from '@/components/icons/Bucket';
import Pen from '@/components/icons/Pen';
import { Link } from 'react-router-dom';
import AddIcon from '@/components/icons/AddIcon';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchPartners, removePartner } from '@/store/slices/partnersSlice';
import ResponseAlert from '@/components/admin/ResponseAlert';
import { openAlert } from '@/store/slices/responseAlertSlice';
import Loader from '@/components/admin/Loader';
import {
  deleteSuccessResponseMessage,
  deleteErrorResponseMessage
} from '@/utils/responseMessages';

const Partners = () => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const isLoading = useAppSelector((state) => state.partners.loading);
  const partners = useAppSelector((state) => state.partners.partners);
  const isAlertOpen = useAppSelector((state) => state.alert.isAlertOpen);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const deletePartner = () => {
    try {
      dispatch(removePartner(currentId));
      setShowConfirm(false);
      dispatch(openAlert(deleteSuccessResponseMessage('партнера')));
    } catch (error) {
      dispatch(openAlert(deleteErrorResponseMessage('партнера')));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative px-12 pt-10">
      <h1 className="leading-48 mb-8 text-left text-3xl font-semibold tracking-normal">
        Партнери
      </h1>
      <div className="flex gap-5">
        <div className="flex h-[288px]  flex-col items-center justify-center border-2 border-gray-300 px-8 ">
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
              className="flex flex h-[288px] w-[211px] flex-col flex-col items-center justify-center border-2 border-gray-300 pt-2"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={160}
                className="mx-4 mb-4 h-[185px] w-[185px] rounded-full object-cover"
              />
              <h2 className=" text-center text-[14px] font-bold text-darkgray">
                {partner.name}
              </h2>
              <div className="buttons mt-auto flex w-full justify-between gap-2 border-t border-t-gray-300 bg-gray-100 px-4">
                <button className="flex h-10 w-10 items-center justify-center text-xl text-darkgray hover:text-accent">
                  <Link to={`/admin/partners/edit/${partner.id}`}>
                    <Pen />
                  </Link>
                </button>
                <button
                  className="hover:text-red-500 flex h-10 w-10 items-center justify-center text-xl text-darkgray"
                  onClick={() => {
                    setShowConfirm(true), setCurrentId(partner.id);
                  }}
                >
                  <Bucket />
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
        {isAlertOpen && <ResponseAlert />}
      </div>
    </div>
  );
};

export default Partners;
