import LocationIcon from './icons/LocationIcon';
import { useTranslation } from 'react-i18next';
import { offersList } from '@/data/offersList';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="hero relative mb-[190px] h-[420px] w-full bg-[url(hero/hero-tab@1x.png)] bg-cover bg-center bg-no-repeat text-white md:mb-0 md:h-[800px] md:bg-[url(hero/hero-desk@1x.png)]">
      <div className="mx-auto w-[100%] px-5 pt-[82px] sm:w-[480px] md:h-[970px] md:w-[768px] md:px-12 md:pt-[128px] lg:w-[1280px] lg:px-[120px] lg:pt-[130px] xl:w-[1440px]">
        <h1 className=" mb-[236px] text-center font-namu text-4xl md:mb-[30px] md:text-[4.75rem] md:leading-tight lg:mb-[70px] lg:text-left lg:text-[6.6rem] ">
          {t('hero:main_title')}
        </h1>

        <ul className="absolute -bottom-[130px] justify-center pl-4 text-[1.069rem] font-medium leading-[1.59rem] text-black md:relative md:bottom-0 md:mb-[340px] md:flex md:text-xl md:text-white lg:mb-[100px] lg:block lg:pl-6 lg:text-[1.375rem] ">
          {offersList.map((item) => (
            <li key={item} className="relative mr-8 leading-9 lg:mb-6 lg:mr-0 ">
              <span
                className={`absolute -left-7 bottom-1 block px-3 font-semibold  lg:px-0 ${
                  item === 'hero:shelter' && 'md:hidden lg:block'
                }`}
              >
                .
              </span>
              {t(item)}
            </li>
          ))}
        </ul>
        <div className="relative flex items-end justify-between ">
          <a
            className="  flex gap-3 border-b fill-white pb-3 text-base text-white transition-all duration-300 hover:border-accent hover:text-accent focus:border-accent focus:text-accent lg:text-[1.06rem]"
            href="#contacts"
          >
            <LocationIcon />
            {t('hero:address')}
          </a>
          <a
            className="absolute -bottom-[210px] right-0 flex h-[100px] w-[100px] items-center rounded-full bg-accent text-center text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-xl"
            href="#excursions"
          >
            {t('hero:order')}
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
