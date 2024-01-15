import { useEffect, useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import Bucket from '@/components/icons/Bucket';
import AddIcon from '@/components/icons/AddIcon';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchImages, removeImage } from '@/store/slices/gallerySlice';
import Loader from '@/components/admin/Loader';
import AddImage from './add';
import {
  deleteErrorResponseMessage,
  deleteSuccessResponseMessage
} from '@/utils/responseMessages';
import { openAlert } from '@/store/slices/responseAlertSlice';
import ResponseAlert from '@/components/admin/ResponseAlert';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isLoading = useAppSelector((state) => state.posts.loading);
  const images = useAppSelector((state) => state.gallery.images);
  const isAlertOpen = useAppSelector((state) => state.alert.isAlertOpen);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, showModal]);

  const deletePost = () => {
    try {
      dispatch(removeImage(currentId));
      dispatch(openAlert(deleteSuccessResponseMessage('світлину')));
      setShowConfirm(false);
    } catch (error: any) {
      dispatch(openAlert(deleteErrorResponseMessage('світлину')));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-[48px]">
      <div className="px-12">
        <h1 className="text-3xl font-bold">Галерея</h1>
      </div>
      <div className="grid w-full grid-cols-3 justify-center  gap-[20px] p-12">
        <div className="border-lightgray relative flex h-[180px] w-[288px] flex-col items-center justify-center gap-2  border-2">
          <button onClick={() => setShowModal(true)}>
            <AddIcon />
          </button>
          <h1>Додати світлину</h1>
        </div>
        {images.map((image) => (
          <div
            key={image.id}
            className="relative h-[180px] w-[288px] text-left"
          >
            <img
              src={image.image_url}
              alt={'image'}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-0 right-0 top-2 flex flex w-full items-center justify-end gap-2 px-6  py-2">
              <button
                className="rounded-full p-[8px] text-xl text-white transition-all hover:text-error"
                onClick={() => {
                  setShowConfirm(true), setCurrentId(image.id);
                }}
              >
                <Bucket />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && <AddImage setIsModalOpen={setShowModal} />}
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          title="Чи ви впевнені, що хочете видалити світлину зі сторінки?"
          onConfirm={deletePost}
        />
      )}
      {isAlertOpen && <ResponseAlert />}
    </div>
  );
};

export default Gallery;
