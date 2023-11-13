import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import logo_uaanimals from '@/assets/images/logo_uaanimals.png';
import logo_sloboda from '@/assets/images/logo_svoboda.png';
import logo_zhitta from '@/assets/images/logo_zhitta.png';
import logo_baza from '@/assets/images/logo_baza.png';
import PartnersModal from './modals/PartnersModal';

const Partners = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const openPartnersModal = () => {
    dispatch(openModal({ data: {}, type: 'partners' }));
  };

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
    }
  ];

  return (
    <section className="mx-auto bg-[#F3F3F5] ">
      <div className="flex max-w-[1440px] flex-col px-12 pt-12 lg:px-[7.5rem] lg:py-20">
        <div className="sectionHeader mb-8 flex-row lg:mb-14 lg:flex  lg:items-center lg:justify-between">
          <h2 className="mb-6 text-[3rem] font-medium lg:text-[4rem]">
            {t('partners:header')}
          </h2>
          <button
            onClick={openPartnersModal}
            className="duration-800 inline-block bg-accent px-8 py-3 text-lg font-medium leading-6 hover:bg-lemon focus:bg-lemon active:bg-darkyellow"
          >
            {t('partners:become_partner')}
          </button>
        </div>
        <p className="mb-10 text-[20px] leading-relaxed text-gray-700 lg:w-[1070px] lg:text-[22px]">
          {t('partners:text')}
        </p>
        <ul className="flex justify-between gap-6 overflow-x-auto lg:mt-20">
          {partners.map(({ title, href, src }) => (
            <li key={title}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-scale block w-[208px] transform border-solid border-darkyellow transition-all  duration-300 hover:border-b lg:w-auto"
              >
                <img
                  className="mb-6 scale-100 transform"
                  src={src}
                  alt={title}
                  width={282}
                  height={282}
                />
                <p className="mb-5 text-center text-[20px] leading-relaxed lg:text-[22px]">
                  {title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>{' '}
      {isModalOpen && type === 'partners' && <PartnersModal />}
    </section>
  );
};

export default Partners;
