import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import Slider from '@/components/Slider';
import PartnersModal from './modals/PartnersModal';
import { openModal } from '@/store/slices/modalSlice';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import { Partner, fetchPartners } from '@/store/slices/partnersSlice';
import Loader from './admin/Loader';

const Partners = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => state.partners.partners);
  const isLoading = useAppSelector((state) => state.partners.loading);

  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const openPartnersModal = () => {
    dispatch(openModal({ data: {}, type: 'partners' }));
  };

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

  useEffect(() => {
    const handleChangedSize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleChangedSize);
    return () => {
      window.removeEventListener('resize', handleChangedSize);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#partners'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const pagesLength = partners.length / itemsPerPage + 1;

  const data = usePaginatedData(partners, start, finish);

  useEffect(() => {
    if (windowWidth >= 1280) {
      setItemsPerPage(4);
      if (currentPage === 1) {
        setStart(0);
        setFinish(4);
      }
      if (currentPage === 2) {
        setStart(1);
        setFinish(5);
      }
      if (currentPage === 3) {
        setStart(0);
        setFinish(4);
      }
    }
    if (windowWidth >= 768 && windowWidth < 1280) {
      setItemsPerPage(3);
      if (currentPage === 1) {
        setStart(0);
        setFinish(3);
      }
      if (currentPage === 2) {
        setStart(1);
        setFinish(4);
      }
      if (currentPage === 3) {
        setStart(2);
        setFinish(5);
      }
    }
  }, [windowWidth, currentPage]);

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  if (isLoading) return <Loader />;

  return (
    <section id="partners" ref={ref} className="relative bg-[#F3F3F5] ">
      <div className="mx-auto flex flex-col px-5 py-6 sm:w-[480px] md:w-[768px] md:px-12 md:py-12 lg:w-[1280px] lg:px-[120px] lg:py-[80px] xl:w-[1440px]">
        <div className="sectionHeader mb-5 flex-row md:mb-8 lg:mb-14 lg:flex  lg:items-center lg:justify-between">
          <h2 className="text-[1.5rem] font-medium md:mb-6 md:text-[3rem] lg:text-[4rem]">
            {t('partners:header')}
          </h2>
          <button
            onClick={openPartnersModal}
            className="duration-800 hidden bg-accent px-8 py-3 text-lg font-medium leading-6 hover:bg-lemon focus:bg-lemon active:bg-darkyellow md:inline-block"
          >
            {t('partners:become_partner')}
          </button>
        </div>
        <p className="mb-5 text-[18px] leading-relaxed text-gray-700  md:mb-10 md:text-[20px] lg:w-[1070px] lg:text-[22px]">
          {t('partners:text')}
        </p>
        {/* mobile only */}
        <ul className="mb-5 grid grid-cols-2 gap-x-3 gap-y-2.5 overflow-x-auto md:hidden ">
          {partners.map(({ id, name, link, logo }) => (
            <li
              key={id}
              className="flex flex-col   md:mb-6 md:w-[calc(50%-0.75rem)]"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-scale block w-full transform border-solid border-darkyellow transition-all duration-300 hover:border-b"
              >
                <img
                  className="m-auto mb-6 scale-100 transform"
                  src={logo}
                  alt={name}
                  width={134}
                  height={134}
                />
                <p className="mb-4 text-center text-[1rem] leading-relaxed md:text-[20px] lg:text-[22px]">
                  {name}
                </p>
              </a>
            </li>
          ))}
        </ul>
        {/* tablet + desktop */}
        <div className="hidden md:block">
          <Slider
            isPartners
            setCurrentPage={setCurrentPage}
            pagesLength={pagesLength}
          >
            <ul className="mb-5  flex gap-6 lg:mt-20">
              {data.map((item: Partner) => (
                <li key={item.id} className="flex justify-around">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-scale block w-full transform border-solid border-darkyellow transition-all duration-300 hover:border-b"
                  >
                    <img
                      className="m-auto mb-6 scale-100 transform md:h-[208px] md:w-[208px] xl:h-[245px] xl:w-[245px]"
                      src={item.logo}
                      alt={item.name}
                      width={208}
                      height={208}
                    />
                    <p className=":w-[282px] mb-5 w-[208px] text-center text-[1rem] leading-relaxed md:text-[20px] lg:mb-[4.125rem] lg:text-[22px]">
                      {item.name}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </Slider>
        </div>{' '}
        <button
          onClick={openPartnersModal}
          className="duration-800 bg-accent  px-8 py-3 text-lg font-medium leading-6 hover:bg-lemon focus:bg-lemon active:bg-darkyellow md:hidden"
        >
          {t('partners:become_partner')}
        </button>
      </div>{' '}
      {isModalOpen && type === 'partners' && (
        <PartnersModal isOpen={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default Partners;
