import LocationIcon from './icons/LocationIcon';
import { useTranslation } from 'react-i18next';
import { offersList } from '@/data/offersList';
import { openModal } from '@/store/slices/modalSlice';
import { useAppDispatch } from '@/store/hook';

const Hero = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const openDonateModal = () => {
    dispatch(openModal({ data: {}, type: 'donation' }));
  };

  return (
    <section className="hero relative mb-[190px] h-[420px] w-full bg-[url(/hero/hero-tab@1x.png)] bg-cover bg-center bg-no-repeat text-white md:mb-0 md:h-[800px] md:bg-[url(/hero/hero-desk@1x.png)]">
      <div className="mx-auto w-[100%] px-5 pt-[82px] sm:w-[480px] md:h-[970px] md:w-[768px] md:px-12 md:pt-[128px] lg:w-[1280px] lg:px-[120px] lg:pt-[130px] xl:w-[1440px]">
        <h1 className=" mb-[236px] text-center font-namu text-4xl md:mb-[30px] md:text-[4.75rem] md:leading-tight lg:mb-[70px] lg:text-left lg:text-[6.6rem] ">
          {t('hero:main_title')}
        </h1>

        <ul className="absolute -bottom-[180px] justify-center pl-4 text-[1.069rem] font-medium leading-[1.59rem] text-black md:relative md:bottom-0 md:mb-[340px] md:flex md:text-xl md:text-white lg:mb-[50px] lg:block lg:pl-6 lg:text-[1.375rem] ">
          {offersList.map((item) => (
            <li
              key={item}
              className="relative mr-8  leading-9 lg:mb-6 lg:mr-0 "
            >
              <span
                className={` absolute -left-7 bottom-1  px-3  font-semibold  md:hidden lg:block  lg:px-0 ${
                  item === 'hero:shelter' && 'md:hidden lg:block'
                }`}
              >
                .
              </span>
              {t(item)}
            </li>
          ))}
        </ul>
        <div className="relative bottom-[4rem] flex items-end justify-between">
          <a
            className="flex gap-3 border-b  fill-white pb-3 text-base text-white transition-all duration-300 hover:border-accent hover:text-accent focus:border-accent focus:text-accent lg:text-[1.06rem]"
            href="#contacts"
          >
            <LocationIcon />
            {t('hero:address')}
          </a>
          <button
            onClick={openDonateModal}
            className="flex h-[100px] w-[100px]  items-center justify-center rounded-full  bg-accent p-2 text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:scale-105 hover:bg-lemon focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-lg"
          >
            {t('hero:help')}
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
