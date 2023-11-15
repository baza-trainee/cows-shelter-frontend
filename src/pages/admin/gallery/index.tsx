import { useState } from 'react';
// import Confirm from '@/components/admin/Confirm';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { images } from '@/data/gallery';
import AddImage from './add';

const Gallery = () => {
  // const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex  min-h-screen flex-col items-center justify-center  overflow-auto px-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 rounded-md border-2 border-blue-300 bg-blue-100 px-7 py-2 hover:bg-blue-200"
      >
        Add Image +
      </button>

      <div className="grid max-h-[85vh] grid-cols-3 gap-4 overflow-auto">
        {images.map((post) => (
          <div key={post.id} className="relative  text-left">
            <img
              src={post.url}
              alt="image"
              className="h-full w-full rounded-md object-cover"
            />

            <div className="buttons absolute right-2 top-2 flex gap-2">
              <button
                className="text-xl text-white hover:text-red-500"
                // onClick={() => setShowConfirm(true)}
              >
                <BsFillTrash3Fill />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <AddImage setIsModalOpen={setIsModalOpen} />}
      {/* {showConfirm && <Confirm setShowConfirm={setShowConfirm} />} */}
    </div>
  );
};

export default Gallery;
