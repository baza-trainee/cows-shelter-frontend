import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useWidth } from '@/hooks/useWidth';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { fetchNewsWithPagination } from '@/store/slices/newsSlice';

import Slider from '@/components/Slider';
import NewsBlock from '@/components/News/NewsBlock';
import NewsModal from '@/components/modals/NewsModal';

import 'swiper/css/pagination';
import 'swiper/css';
import { setActiveLink } from '@/store/slices/observationSlice';

const News = () => {
  const screenWidth = useWidth();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pagesLength, setPagesLength] = useState(0);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const { posts, totalLength } = useAppSelector(
    (state) => state.posts.paginatedData
  );

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (screenWidth >= 1280) {
      setItemsPerPage(5);
    }
    if (screenWidth >= 768 && screenWidth < 1280) {
      setItemsPerPage(3);
    }
    if (screenWidth > 320 && screenWidth < 768) {
      setItemsPerPage(1);
    }
  }, [screenWidth]);

  useEffect(() => {
    const pagesNumber = totalLength / itemsPerPage;
    setPagesLength(pagesNumber < 5 ? pagesNumber : 5);
  }, [totalLength, itemsPerPage]);

  useEffect(() => {
    dispatch(
      fetchNewsWithPagination({ page: currentPage, limit: itemsPerPage })
    )
      .unwrap()
      .then(() => {
        return [];
      })
      .catch((error) => alert(error));
  }, [currentPage, itemsPerPage, dispatch]);

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
    <section id="news" ref={ref}>
      <div className="mx-auto flex flex-col px-5 py-6 sm:w-[480px] md:w-[768px] md:px-12 md:py-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]">
        <Slider
          title="Новини"
          setCurrentPage={setCurrentPage}
          pagesLength={pagesLength}
        >
          <NewsBlock posts={posts} />
        </Slider>

        {isModalOpen && type === 'news' && (
          <NewsModal isOpen={showModal} setShowModal={openNewsModal} />
        )}
      </div>
    </section>
  );
};

export default News;
