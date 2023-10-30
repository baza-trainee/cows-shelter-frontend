import LocationIcon from './icons/LocationIcon';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="  relative mb-[211px] h-[321px] w-full bg-[url(/hero.png)] bg-cover bg-center bg-no-repeat text-white md:mb-0 md:h-[800px] lg:h-[800px]">
      <div className="md:w[768px] mx-auto w-[320px] px-5 pt-14 md:h-[970px] md:w-[768px] md:px-12 md:pt-[128px] lg:w-[1440px] lg:px-[120px] lg:pt-[130px]">
        <h1 className=" mb-[158px] text-center font-namu text-4xl md:mb-[30px] md:text-[4.75rem] md:leading-tight lg:mb-[70px] lg:text-left lg:text-[6.6rem] ">
          {t('hero:main_title')}
        </h1>

        <ul className="absolute -bottom-[130px] justify-center text-[1.06rem] font-normal leading-[1.59rem] text-black md:relative md:bottom-0 md:mb-[340px] md:flex md:text-xl md:text-white lg:mb-[100px] lg:block lg:list-none lg:text-2xl ">
          <li className="mr-8 leading-9 lg:mb-6 lg:mr-0">
            {t('hero:shelter')}
          </li>

          <li className="relative mr-8 leading-9 lg:mb-6 lg:mr-0">
            <span className="absolute -left-7 bottom-1 px-3 text-transparent md:text-white lg:hidden">
              .
            </span>
            {t('hero:eco_rest')}
          </li>

          <li className="relative leading-9">
            <span className="absolute -left-7 bottom-1  px-3 text-transparent md:text-white lg:hidden">
              .
            </span>
            {t('hero:excursions')}
          </li>
        </ul>
        <div className="relative flex items-end justify-between">
          <a
            className="  flex gap-3 border-b fill-white pb-3 text-base font-medium text-white transition-all duration-300 hover:border-accent hover:text-accent focus:border-accent focus:text-accent lg:text-[1.06rem]"
            href="#location"
          >
            <LocationIcon />
            {t('hero:address')}
          </a>
          <a
            className="absolute -bottom-[200px] right-0 flex  h-[100px] w-[100px] items-center rounded-full bg-accent text-center text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-xl"
            href="#"
          >
            {t('hero:order')}
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
