import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import ExcursionsReviews from './ExcursionsReviews';
import ExcursionModal from './ExcursionModal';
import LittleArrow from '../icons/LittleArrow';
import Slider from '@/components/Slider';
import ExcursionOrderModal from './ExcursionOrderModal';
import { setActiveLink } from '@/store/slices/observationSlice';
import {
  Excursion,
  fetchExcursionsWithPagination
} from '@/store/slices/excursionsSlice';
import Loader from '../admin/Loader';
import { useWidth } from '@/hooks/useWidth';

const Excursions = () => {
  const { language } = useTranslation().i18n;
  const dispatch = useAppDispatch();
  const screenWidth = useWidth();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pagesLength, setPagesLength] = useState(0);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const isLoading = useAppSelector((state) => state.excursions.loading);
  const { excursions, totalLength } = useAppSelector(
    (state) => state.excursions.paginatedData
  );
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (screenWidth >= 1280) {
      setItemsPerPage(3);
    }
    if (screenWidth >= 768 && screenWidth < 1280) {
      setItemsPerPage(2);
    }
    if (screenWidth > 320 && screenWidth < 768) {
      setItemsPerPage(totalLength);
    }
  }, [screenWidth, totalLength]);

  useEffect(() => {
    const pagesNumber = totalLength / itemsPerPage;
    setPagesLength(pagesNumber < 5 ? pagesNumber : 5);
  }, [totalLength, itemsPerPage]);

  useEffect(() => {
    dispatch(
      fetchExcursionsWithPagination({ page: currentPage, limit: itemsPerPage })
    );
  }, [currentPage, dispatch, itemsPerPage]);
  // const [start, setStart] = useState(0);
  // const [finish, setFinish] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  // const pagesLength = excursions.length / itemsPerPage;

  // const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     setTimeout(() => {
  //       setShowModal(true);
  //     }, 300);
  //   } else {
  //     setTimeout(() => {
  //       setShowModal(false);
  //     }, 300);
  //   }
  // }, [isModalOpen]);

  // const data = usePaginatedData(excursions, start, finish);
  // useEffect(() => {
  //   if (currentPage === 1) {
  //     setStart(0);
  //     setFinish(2);
  //   }
  //   if (currentPage === 2) {
  //     setStart(2);
  //     setFinish(4);
  //   }
  // }, [currentPage]);

  const openExcursionModal = (item: Excursion) => {
    dispatch(openModal({ data: item, type: 'excursions' }));
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
      dispatch(setActiveLink('#excursions'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangedSize);
    return () => {
      window.removeEventListener('resize', handleChangedSize);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section
      id="excursions"
      ref={ref}
      className="bg-[#F3F3F5]  py-6  md:py-16 lg:py-20"
    >
      <div className="mx-auto px-5 sm:w-[480px] md:w-[768px] md:px-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]">
        {windowWidth < 768 && (
          <div>
            <h2 className="mb-10 text-2xl font-medium leading-normal">
              {language === 'uk' ? 'Екскурсії' : 'Excursions'}
            </h2>
            <ul className="mb-5 flex flex-col items-center gap-4">
              {excursions.map((excursion: Excursion) => (
                <li key={excursion.id} className="drop-shadow">
                  <div className="relative">
                    <img
                      src={excursion.image_url}
                      alt={`Excursion Image`}
                      width={280}
                      height={200}
                    ></img>
                    <div className="absolute bottom-0 left-0 flex flex-col gap-3 pb-5 pl-5 text-white">
                      <p className="text-lg font-medium leading-normal">
                        {language === 'uk'
                          ? excursion.title_ua
                          : excursion.title_en}
                      </p>
                      <a>
                        <button
                          className="flex gap-3 border border-solid border-white py-2.5 pl-5 pr-4"
                          onClick={() => {
                            openExcursionModal(excursion);
                          }}
                        >
                          <span className="text-base leading-tight">
                            {language === 'uk'
                              ? 'Показати більше'
                              : 'Show more'}
                          </span>
                          <LittleArrow />
                        </button>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {windowWidth >= 768 && (
          <Slider
            title={language === 'uk' ? 'Екскурсії' : 'Excursions'}
            setCurrentPage={setCurrentPage}
            pagesLength={pagesLength}
            isExcursions={true}
          >
            <ul className="mb-0 flex justify-center gap-6 lg:mb-[8.75rem]">
              {excursions.map((excursion: Excursion) => (
                <li key={excursion.id} className="drop-shadow">
                  <div className="group relative">
                    <img
                      src={excursion.image_url}
                      alt={`Excursion Image`}
                    ></img>
                    <div className="fixed left-0 top-0 h-full w-full lg:bg-black/[.60] lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 flex flex-col gap-0 pb-6 pl-6 text-white transition-all duration-700 group-hover:gap-5">
                      <p className="text-xl font-semibold leading-normal lg:text-[22px]">
                        {language === 'uk'
                          ? excursion.title_ua
                          : excursion.title_en}
                      </p>
                      <p className="opacity-0 transition-all duration-700 lg:group-hover:opacity-100">
                        {excursion.time_from} - {excursion.time_to}{' '}
                        {language === 'uk' ? 'хвилин' : 'minutes'} /{' '}
                        {language === 'uk' ? 'до' : 'up to'}{' '}
                        {excursion.amount_of_persons}{' '}
                        {language === 'uk' ? 'відвідувачів' : 'visitors'}
                      </p>
                      <a>
                        <button
                          className="flex gap-3 border border-solid border-white py-[0.69rem] pl-6 pr-2.5 transition-all duration-700 lg:border-transparent lg:focus:border-accent lg:active:border-accent lg:group-hover:border-white lg:group-hover:hover:border-accent"
                          onClick={() => {
                            openExcursionModal(excursion);
                          }}
                        >
                          <span className="text-lg font-medium leading-tight">
                            {language === 'uk'
                              ? 'Показати більше'
                              : 'Show more'}
                          </span>
                          <LittleArrow />
                        </button>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Slider>
        )}
        <ExcursionsReviews />
        {isModalOpen && type === 'excursions' && (
          <ExcursionModal isOpen={showModal} setShowModal={setShowModal} />
        )}
        {isModalOpen && type === 'order' && (
          <ExcursionOrderModal isOpen={showModal} setShowModal={setShowModal} />
        )}
      </div>
    </section>
  );
};

export default Excursions;
