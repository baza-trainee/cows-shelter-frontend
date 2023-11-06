import 'swiper/css';
import 'swiper/css/pagination';

import Slider from './Slider';
import NewsBlock from '@/components/News/NewsBlock';
import NewsModal from './modals/NewsModal';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import { useEffect, useState } from 'react';

const News = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const openNewseModal = () => {
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
        <NewsBlock></NewsBlock>
      </Slider>

      {isModalOpen && type === 'news' && (
        <NewsModal isOpen={showModal} setShowModal={openNewseModal} />
      )}

      {/* {isModalOpen && type === 'news' && <NewsModal />} */}
    </section>
  );
};

export default News;
