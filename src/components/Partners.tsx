import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { PartnersType } from '@/types';

import logo_uaanimals from '@/assets/images/logo_uaanimals.png';
import logo_sloboda from '@/assets/images/logo_svoboda.png';
import logo_zhitta from '@/assets/images/logo_zhitta.png';
import logo_baza from '@/assets/images/logo_baza.png';
import logo_eur from '@/assets/images/logo_european_zoo.png';

import Slider from '@/components/Slider';
import PartnersModal from './modals/PartnersModal';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { usePaginatedData } from '@/hooks/usePaginatedData';

const Partners = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const partners = [
    {
      title: t('partners:partners.uaAnimals'),
      href: 'https://uanimals.org/',
      src: logo_uaanimals
    },
    {
      title: t('partners:partners.sloboda_zvierat'),
      href: 'https://slobodazvierat.sk',
      src: logo_sloboda
    },
    {
      title: t('partners:partners.zhitta'),
      href: 'https://www.facebook.com/groups/606065439570544',
      src: logo_zhitta
    },
    {
      title: t('partners:partners.baza'),
      href: 'https://baza-trainee.tech/ua',
      src: logo_baza
    },
    {
      title: t('partners:partners.eur_zoo_org'),
      href: 'https://baza-trainee.tech/ua',
      src: logo_eur
    }
  ];

  const openPartnersModal = () => {
    console.log('openPartnersModal is called');
    dispatch(openModal({ data: {}, type: 'partners' }));
  };

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangedSize);
    return () => {
      window.removeEventListener('resize', handleChangedSize);
    };
  }, []);

  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const pagesLength = partners.length / itemsPerPage;

  const data = usePaginatedData(partners, start, finish);

  useEffect(() => {
    if (windowWidth >= 1280) {
      setItemsPerPage(4);
      if (currentPage === 1) {
        setStart(0);
        setFinish(3);
      }
      if (currentPage === 2) {
        setStart(1);
        setFinish(4);
      }
      if (currentPage === 3) {
        setStart(1);
        setFinish(4);
      }
    }
    if (windowWidth >= 768 && windowWidth < 1280) {
      setItemsPerPage(3);
      if (currentPage === 1) {
        setStart(0);
        setFinish(2);
      }
      if (currentPage === 2) {
        setStart(1);
        setFinish(3);
      }
      if (currentPage === 3) {
        setStart(2);
        setFinish(4);
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

  return (
    <section className="mx-auto bg-[#F3F3F5] ">
      <div className="flex max-w-[1440px] flex-col px-5 py-6 md:px-12 md:pt-12 lg:px-[7.5rem] lg:py-20">
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
        <p className="mb-5 text-[18px] leading-relaxed text-gray-700 md:mb-10 md:text-[20px] lg:w-[1070px] lg:text-[22px]">
          {t('partners:text')}
        </p>
        {/* mobile only */}
        <ul className="mb-5 grid grid-cols-2 gap-x-3 gap-y-2.5 overflow-x-auto md:hidden ">
          {partners.map(({ title, href, src }) => (
            <li
              key={title}
              className="flex flex-col   md:mb-6 md:w-[calc(50%-0.75rem)]"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-scale block w-full transform border-solid border-darkyellow transition-all duration-300 hover:border-b"
              >
                <img
                  className="m-auto mb-6 scale-100 transform"
                  src={src}
                  alt={title}
                  width={282}
                  height={282}
                />
                <p className="mb-5 text-center text-[1rem] leading-relaxed md:text-[20px] lg:text-[22px]">
                  {title}
                </p>
              </a>
            </li>
          ))}
        </ul>
        {/* tablet + desktop */}
        <div className="hidden md:block">
          <Slider setCurrentPage={setCurrentPage} pagesLength={pagesLength}>
            <ul className="mb-5  flex justify-between gap-6 gap-x-3 gap-y-2.5 overflow-x-auto lg:mt-20">
              {data.map((item: PartnersType) => (
                <li
                  key={item.title}
                  className="flex flex-col md:mb-6 md:w-[calc(50%-0.75rem)]"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-scale block w-full transform border-solid border-darkyellow transition-all duration-300 hover:border-b"
                  >
                    <img
                      className="m-auto mb-6 scale-100 transform"
                      src={item.src}
                      alt={item.title}
                      width={282}
                      height={282}
                    />
                    <p className="mb-5 text-center text-[1rem] leading-relaxed md:text-[20px] lg:text-[22px]">
                      {item.title}
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
      {isModalOpen && type === 'partners' && <PartnersModal />}
    </section>
  );
};

export default Partners;
