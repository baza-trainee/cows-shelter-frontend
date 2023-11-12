import { useTranslation } from 'react-i18next';
import logo_uaanimals from '@/assets/images/logo_uaanimals.png';
import logo_sloboda from '@/assets/images/logo_svoboda.png';
import logo_zhitta from '@/assets/images/logo_zhitta.png';
import logo_baza from '@/assets/images/logo_baza.png';
import logo_eur from '@/assets/images/logo_european_zoo.png';

import PartnersModal from './modals/PartnersModal';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useEffect } from 'react';
import { openModal } from '@/store/slices/modalSlice';

const Partners = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const openPartnersModal = () => {
    console.log('openPartnersModal is called');
    dispatch(openModal({ data: {}, type: 'partners' }));
  };

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

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
        <ul className="mb-5 grid grid-cols-2 gap-x-3 gap-y-2.5 overflow-x-auto md:flex md:flex-wrap md:justify-between md:gap-6 lg:mt-20">
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
        <button
          onClick={openPartnersModal}
          className="duration-800  bg-accent px-8 py-3 text-lg font-medium leading-6 hover:bg-lemon focus:bg-lemon active:bg-darkyellow md:inline-block"
        >
          {t('partners:become_partner')}
        </button>
      </div>{' '}
      {isModalOpen && type === 'partners' && <PartnersModal />}
    </section>
  );
};

export default Partners;
