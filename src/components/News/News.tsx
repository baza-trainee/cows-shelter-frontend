import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import Slider from '@/components/Slider';
import NewsBlock from '@/components/News/NewsBlock';
import NewsModal from '@/components/modals/NewsModal';

import 'swiper/css/pagination';
import 'swiper/css';

const News = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const openNewsModal = () => {
    dispatch(openModal({ data: {}, type: 'news' }));
  };

  useEffect(() => {
    if (isModalOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isModalOpen]);

  return (
    <section id="news" className="container mx-auto flex flex-col ">
      <Slider title="Новини" pagesLength={3}>
        <NewsBlock />
      </Slider>

      {isModalOpen && type === 'news' && (
        <NewsModal isOpen={showModal} setShowModal={openNewsModal} />
      )}
    </section>
  );
};

export default News;