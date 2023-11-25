import { useEffect, useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { excursions } from '@/data/excursions';
import { useTranslation } from 'react-i18next';
import AddIcon from '@/components/icons/AddIcon';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  fetchExcursion,
  removeExcursion
} from '@/store/slices/excursionsSlice';
import Loader from '@/components/admin/Loader';

const Excursions = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const isLoading = useAppSelector((state) => state.excursions.loading);
  const excursions = useAppSelector((state) => state.excursions.excursions);

  useEffect(() => {
    dispatch(fetchExcursion());
  }, [dispatch]);

  const deletePost = () => {
    dispatch(removeExcursion(currentId));
    setShowConfirm(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex min-h-screen flex-col px-12 py-10">
      <div className="mb-9">
        <h1 className="text-3xl font-bold">Екскурсії</h1>
      </div>
      <div className="flex gap-5">
        <div className="border-lightgray relative flex h-[180px] w-[288px] flex-col items-center justify-center gap-2 border-2">
          <Link to="/admin/excursions/add">
            <AddIcon />
          </Link>
          <h1>Додати Екскурсію</h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {excursions.map((excursion) => (
            <div
              key={excursion.id}
              className="relative h-[180px] w-[288px] text-left"
            >
              <img
                src={excursion.image_url}
                alt={excursion.title_ua}
                className="h-full w-full object-cover"
              />
              <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                {t(`${excursion.title_ua}`)}
              </h2>
              <div className="absolute left-0 right-0 top-4 flex w-full items-center justify-between gap-2 px-6  py-2">
                <button
                  className="rounded-full p-[8px] text-xl text-white backdrop-blur-xl backdrop-contrast-75  transition-all hover:text-error"
                  onClick={() => {
                    setShowConfirm(true), setCurrentId(excursion.id);
                  }}
                >
                  <BsFillTrash3Fill />
                </button>
                <button className="rounded-full p-2 text-xl text-white backdrop-blur-xl backdrop-contrast-75 transition-all hover:text-accent">
                  <Link to={`/admin/excursions/edit/${excursion.id}`}>
                    <BsFillPencilFill />
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          title="Ви впевнені, що хочете видалити екскурсію зі сторінки?"
          onConfirm={deletePost}
        />
      )}
    </div>
  );
};

export default Excursions;
