import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import Slider from '@/components/Slider';
import NewsBlock from '@/components/News/NewsBlock';
import NewsModal from '@/components/modals/NewsModal';

import 'swiper/css/pagination';
import 'swiper/css';
import { setActiveLink } from '@/store/slices/observationSlice';

const News = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const { ref, inView } = useInView({
    threshold: 0.5
  });

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

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#news'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  return (
    <section id="news" ref={ref} className="container mx-auto flex flex-col ">
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
