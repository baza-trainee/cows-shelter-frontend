import { useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { excursions } from '@/data/excursions';
import { useTranslation } from 'react-i18next';
import AddIcon from '@/components/icons/AddIcon';

const Excursions = () => {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  const deletePost = () => {
    setShowConfirm(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="px-12">
        <h1 className="text-3xl font-bold">Екскурсії</h1>
      </div>
      <div className="flex gap-5 p-12">
        <div className="border-lightgray relative flex h-[180px] w-[288px] flex-col items-center justify-center gap-2 border-2">
          <Link to="/admin/excursions/add">
            <AddIcon />
          </Link>
          <h1>Додати Екскурсію</h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {excursions.map((post) => (
            <div
              key={post.id}
              className="relative h-[180px] w-[288px] text-left"
            >
              <img
                src={post.mainImgSrc}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                {t(`${post.title}`)}
              </h2>
              <div className="absolute left-0 right-0 top-4 flex w-full items-center justify-between gap-2 px-6  py-2">
                <button
                  className="rounded-full p-[8px] text-xl text-white backdrop-blur-xl backdrop-contrast-75  transition-all hover:text-error"
                  onClick={() => setShowConfirm(true)}
                >
                  <BsFillTrash3Fill />
                </button>
                <button className="rounded-full p-2 text-xl text-white backdrop-blur-xl backdrop-contrast-75 transition-all hover:text-accent">
                  <Link to={`/admin/excursions/edit/${post.id}`}>
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
