import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWidth } from '@/hooks/useWidth';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { fetchNewsWithPagination } from '@/store/slices/newsSlice';

import { NewsData } from '@/types';
import { news } from '@/data/news';
import NewsModal from '@/components/modals/NewsModal';

import 'swiper/css/pagination';
import 'swiper/css';
import { setActiveLink } from '@/store/slices/observationSlice';
import Loader from '../admin/Loader';

const News = () => {
  const screenWidth = useWidth();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pagesLength, setPagesLength] = useState(0);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const isLoading = useAppSelector((state) => state.posts.loading);
  const { posts, totalLength } = useAppSelector(
    (state) => state.posts.paginatedData
  );

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
    );
  }, [currentPage, dispatch, itemsPerPage]);

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (screenWidth > 1280) {
      setItemsPerPage(2);
      if (currentPage === 1) {
        setStart(0);
        setFinish(6);
      }
      if (currentPage === 2) {
        setStart(6);
        setFinish(12);
      }
      if (currentPage === 3) {
        setStart(12);
        setFinish(18);
      }
    }
    if (screenWidth > 768 && screenWidth < 1280) {
      setItemsPerPage(4);
      if (currentPage === 1) {
        setStart(0);
        setFinish(4);
      }
      if (currentPage === 2) {
        setStart(4);
        setFinish(8);
      }
      if (currentPage === 3) {
        setStart(8);
        setFinish(12);
      }
      if (currentPage === 4) {
        setStart(12);
        setFinish(16);
      }
      if (currentPage === 5) {
        setStart(14);
        setFinish(18);
      }
    }
    if (screenWidth > 320 && screenWidth < 768) {
      setItemsPerPage(1);
      if (currentPage === 1) {
        setStart(0);
        setFinish(1);
      }
      if (currentPage === 2) {
        setStart(1);
        setFinish(2);
      }
      if (currentPage === 3) {
        setStart(2);
        setFinish(3);
      }
      if (currentPage === 4) {
        setStart(3);
        setFinish(4);
      }
    }
  }, [screenWidth, currentPage]);

  useEffect(() => {
    dispatch(
      fetchPostsWithPagination({ page: currentPage, limit: itemsPerPage })
    );
    const pagesNumber = totalLength / itemsPerPage;
    setPagesLength(pagesNumber < 5 ? pagesNumber : 5);
  }, [currentPage, dispatch, itemsPerPage, totalLength]);

  const data: NewsData[] = usePaginatedData(news, start, finish);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#news'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  const openNewsModal = (item: NewsData) => {
    dispatch(openModal({ data: item, type: 'news' }));
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

  if (isLoading) return <Loader />;

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
