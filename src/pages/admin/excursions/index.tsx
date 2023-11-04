import { useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { excursions } from '@/data/excursionsModals';
import { useTranslation } from 'react-i18next';

const Excursions = () => {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-4">
        {excursions.map((post) => (
          <div key={post.id} className="relative  text-left">
            <img
              src={post.mainImgSrc}
              alt={post.title}
              className="h-full w-full rounded-md object-cover"
            />
            <h2 className="absolute bottom-8 left-4 text-xl font-bold text-white">
              {t(`${post.title}`)}
            </h2>
            <div className="buttons absolute right-2 top-2 flex gap-2">
              <button className="text-xl text-white hover:text-accent">
                <Link to={`/admin/excursions/edit/${post.id}`}>
                  <BsFillPencilFill />
                </Link>
              </button>
              <button
                className="text-xl text-white hover:text-red-500"
                onClick={() => setShowConfirm(true)}
              >
                <BsFillTrash3Fill />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/admin/excursions/add">
        <button className="mt-8 rounded-md border-2 border-blue-300 bg-blue-100 px-7 py-2 hover:bg-blue-200">
          Add Excursion +
        </button>
      </Link>

      {showConfirm && <Confirm setShowConfirm={setShowConfirm} />}
    </div>
  );
};

export default Excursions;
