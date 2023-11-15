import { useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { news } from '@/data/news';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AddIcon from '@/components/icons/AddIcon';

const News = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const deletePost = () => {
    console.log('deleted');
    setShowConfirm(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-[48px]">
      <div className="px-12">
        <h1 className="text-3xl font-bold">Новини</h1>
      </div>
      <div className="grid w-full grid-cols-3 justify-center  gap-[20px] p-12">
        <div className="border-lightgray relative flex h-[180px] w-[288px] flex-col items-center justify-center gap-2  border-2">
          <Link to="/admin/news/add">
            <AddIcon />
          </Link>
          <h1>Додати Новину</h1>
        </div>
        {news.map((post) => (
          <div key={post.id} className="relative h-[180px] w-[288px] text-left">
            <img
              src={post.image}
              alt={post.titleUa}
              className="h-full w-full object-cover"
            />
            <h2 className="absolute bottom-8 left-4 text-[16px] text-white">
              {post.titleUa}
            </h2>
            <div className="absolute left-0 right-0 top-4 flex flex w-full items-center justify-between gap-2 px-6  py-2">
              <button
                className="rounded-full p-[8px] text-xl text-white backdrop-blur-xl backdrop-contrast-75  transition-all hover:text-error"
                onClick={() => setShowConfirm(true)}
              >
                <BsFillTrash3Fill />
              </button>
              <button className="rounded-full p-2 text-xl text-white backdrop-blur-xl backdrop-contrast-75 transition-all hover:text-accent">
                <Link to={`/admin/news/edit/${post.id}`}>
                  <BsFillPencilFill />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          title="Чи ви впевнені, що хочете видалити новину зі сторінки?"
          onConfirm={deletePost}
        />
      )}
    </div>
  );
};

export default News;
