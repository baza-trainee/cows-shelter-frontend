import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openModal } from '@/store/slices/modalSlice';

import { useWidth } from '@/hooks/useWidth';

import { NewsData } from '@/types';
import { news } from '@/data/news';
import NewsModal from '@/components/modals/NewsModal';

import { usePaginatedData } from '@/hooks/usePaginatedData';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useInView } from 'react-intersection-observer';

import Slider from '@/components/Slider';
import '@/styles/news.css';

const News = () => {
  const screenWidth = useWidth();
  const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const pagesLength = news.length / itemsPerPage;
  const dispatch = useAppDispatch();

  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

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

  return (
    <section id="news" ref={ref}>
      <div className="mx-auto px-5 sm:w-[480px] md:w-[768px] md:px-12 md:py-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]">
        {screenWidth > 768 && (
          <Slider
            title={t('news:news not working translation')}
            setCurrentPage={setCurrentPage}
            pagesLength={pagesLength}
          >
            <ul className="news-gridContainer ml-4 w-full overflow-hidden pr-8 lg:ml-0 lg:pr-0 ">
              {data.map((item: NewsData, index: number) => (
                <li
                  key={item.id}
                  className={`news-gridItem relative overflow-hidden news-gridItem--${
                    index + 1
                  } group`}
                >
                  <img
                    src={item.image}
                    alt={`News Image`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 z-20 cursor-pointer bg-black/40 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"></div>
                  <div className="via-opacity-30 absolute inset-0 z-30 flex cursor-pointer flex-col bg-gradient-to-b from-transparent to-black/40">
                    <div className="flex h-full flex-col justify-end text-white">
                      <div className="translate-y-14 space-y-3 p-4 duration-300 ease-in-out group-hover:translate-y-0">
                        <h2 className="text-2xl font-normal">
                          {t(item.title)}
                        </h2>
                        <div className="text-sm opacity-0 group-hover:opacity-100">
                          {t(item.description)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => openNewsModal(item)}
                        className="relative mb-6 ml-6 mt-5 border py-1 text-white hover:opacity-100 group-hover:border-yellow-500"
                      >
                        <div className="flex items-center">
                          <p className="px-4">Показати більше</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Slider>
        )}
        {screenWidth < 768 && (
          <Slider
            title={t('news:news')}
            setCurrentPage={setCurrentPage}
            pagesLength={4}
          >
            <ul className="news-gridContainer overflow-hidden  ">
              {data.map((item: NewsData, index: number) => (
                <li
                  key={item.id}
                  className={`news-gridItem relative overflow-hidden  news-gridItem--${
                    index + 1
                  } group`}
                >
                  <img src={item.image} alt={`News Image`} />
                  <div className="absolute inset-0 z-20 cursor-pointer bg-black/40 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"></div>
                  <div className="via-opacity-30 absolute inset-0 z-30 flex cursor-pointer flex-col bg-gradient-to-b from-transparent to-black/40">
                    <div className="flex h-full flex-col justify-end text-white">
                      <div className="translate-y-14 space-y-3 p-4 duration-300 ease-in-out group-hover:translate-y-0">
                        <h2 className="text-2xl font-normal">{item.title}</h2>
                        <div className="text-sm opacity-0 group-hover:opacity-100">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => openNewsModal(item)}
                        className="relative mb-6 ml-6 mt-5 border py-1 text-white hover:opacity-100 group-hover:border-yellow-500"
                      >
                        <div className="flex items-center">
                          <p className="px-4">Показати більше</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Slider>
        )}
        {isModalOpen && type === 'news' && (
          <NewsModal isOpen={showModal} setShowModal={openNewsModal} />
        )}
      </div>
    </section>
  );
};

export default News;
