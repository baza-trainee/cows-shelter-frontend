import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { excursions } from '@/data/excursions';
import { ExcursionsData } from '@/types';
import { useTranslation } from 'react-i18next';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import { useInView } from 'react-intersection-observer';

import ExcursionsReviews from './ExcursionsReviews';
import ExcursionModal from './ExcursionModal';
import LittleArrow from '../icons/LittleArrow';
import Slider from '@/components/Slider';
import ExcursionOrderModal from './ExcursionOrderModal';
import { setActiveLink } from '@/store/slices/observationSlice';

const Excursions = () => {
  const dispatch = useAppDispatch();
  const [activeExcursion, setActiveExcursion] = useState<ExcursionsData>();
  const [excursion, setExcursion] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  const { t } = useTranslation();

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

  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  useEffect(() => {
    setActiveExcursion(excursions[excursion]);
  }, [excursion]);

  const openExcursionModal = () => {
    dispatch(
      openModal({ data: activeExcursion as ExcursionsData, type: 'excursions' })
    );
  };

  const itemsPerPage = 2;

  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesLength = excursions.length / itemsPerPage;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setShowModal(true);
      }, 300);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [isModalOpen]);

  const data = usePaginatedData(excursions, start, finish);
  useEffect(() => {
    if (currentPage === 1) {
      setStart(0);
      setFinish(2);
    }
    if (currentPage === 2) {
      setStart(2);
      setFinish(4);
    }
  }, [currentPage]);

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#excursions'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  return (
    <section
      id="excursions"
      ref={ref}
      className="bg-[#F3F3F5] px-6 py-6 md:px-12 md:py-16 lg:px-[7.5rem] lg:py-20"
    >
      {windowWidth < 768 && (
        <div>
          <h2 className="mb-10 text-2xl font-medium leading-normal">
            {t('excursions:title')}
          </h2>
          <ul className="mb-5 flex flex-col items-center gap-4">
            {excursions.map((item: ExcursionsData, index: number) => (
              <li key={item.id} className="drop-shadow">
                <div className="relative">
                  <img src={item.mainImgSrc_mobile} alt={t(item.title)}></img>
                  <div className="absolute bottom-0 left-0 flex flex-col gap-3 pb-5 pl-5 text-white">
                    <p className="text-lg font-medium leading-normal">
                      {t(item.title)}
                    </p>
                    <a>
                      <button
                        className="flex gap-3 border border-solid border-white py-2.5 pl-5 pr-4"
                        onClick={() => {
                          setExcursion(index), openExcursionModal();
                        }}
                      >
                        <span className="text-base leading-tight">
                          {t('excursions:excursion.show_more_btn')}
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
      {windowWidth < 1280 && windowWidth >= 768 && (
        <Slider
          title={t('excursions:title')}
          setCurrentPage={setCurrentPage}
          pagesLength={pagesLength}
          isExcursions={true}
        >
          <ul className="flex justify-center gap-6">
            {data.map((item: ExcursionsData, index: number) => (
              <li key={item.id} className="drop-shadow">
                <div className="relative">
                  <img src={item.mainImgSrc_tablet} alt={t(item.title)}></img>
                  <div className="fixed left-0 top-0 h-full w-full"></div>
                  <div className="absolute bottom-0 left-0 flex flex-col gap-5 pb-6 pl-6 text-white">
                    <p className="text-xl font-semibold leading-normal">
                      {t(item.title)}
                    </p>
                    <a>
                      <button
                        className="flex gap-3 border border-solid border-white py-[0.69rem] pl-6 pr-2.5"
                        onClick={() => {
                          setExcursion(index), openExcursionModal();
                        }}
                      >
                        <span className="text-lg font-medium leading-tight">
                          {t('excursions:excursion.show_more_btn')}
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
      {windowWidth >= 1280 && (
        <div>
          <h2 className="mb-10 text-[4rem] font-medium leading-normal">
            {t('excursions:title')}
          </h2>
          <ul className="mb-[8.75rem] flex gap-6">
            {excursions.map((item: ExcursionsData, index: number) => (
              <li key={item.id} className="drop-shadow">
                <div className="group relative">
                  <img src={item.mainImgSrc} alt={t(item.title)}></img>
                  <div className="fixed left-0 top-0 h-full w-full bg-black/[.60] opacity-0 transition-all duration-700 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 flex flex-col gap-0 pb-6 pl-6 text-white transition-all duration-700 group-hover:gap-5">
                    <p className="text-[22px] font-semibold leading-normal">
                      {t(item.title)}
                    </p>
                    <p className="opacity-0 transition-all duration-700 group-hover:opacity-100">
                      {t(item.duration)} / {t(item.number_of_people)}
                    </p>
                    <a>
                      <button
                        className="flex gap-3 border border-solid border-transparent py-[0.69rem] pl-6 pr-2.5 transition-all duration-700 focus:border-accent active:border-accent group-hover:border-white group-hover:hover:border-accent"
                        onClick={() => {
                          setExcursion(index), openExcursionModal();
                        }}
                      >
                        <span className="text-lg font-medium leading-tight">
                          {t('excursions:excursion.show_more_btn')}
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
      <ExcursionsReviews />
      {isModalOpen && type === 'excursions' && (
        <ExcursionModal
          excursion={activeExcursion as ExcursionsData}
          isOpen={showModal}
          setShowModal={setShowModal}
        />
      )}
      {isModalOpen && type === 'order' && (
        <ExcursionOrderModal isOpen={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default Excursions;
