import { useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { partners } from '@/data/partners';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Partners = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="grid grid-cols-4 gap-4">
        {partners.map((post) => (
          <div
            key={post.id}
            className="relative flex flex-col items-center justify-center text-left"
          >
            <img
              src={post.src}
              alt={post.title}
              className="h-[200px] w-[200px] object-cover"
            />
            <h2 className=" text-center text-lg font-bold text-darkgray">
              {post.title}
            </h2>
            <div className="buttons absolute -top-2 right-2 flex gap-2">
              <button className="text-xl text-black hover:text-accent">
                <Link to={`/admin/partners/edit/${post.id}`}>
                  <BsFillPencilFill />
                </Link>
              </button>
              <button
                className="text-xl text-black hover:text-red-500"
                onClick={() => setShowConfirm(true)}
              >
                <BsFillTrash3Fill />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/admin/partners/add">
        <button className="mt-8 rounded-md border-2 border-blue-300 bg-blue-100 px-7 py-2 hover:bg-blue-200">
          Add Partner +
        </button>
      </Link>

      {showConfirm && <Confirm setShowConfirm={setShowConfirm} />}
    </div>
  );
};

export default Partners;
