import LocationIcon from './ui/LocationIcon';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[900px] w-full bg-[url(/hero.png)] bg-cover  bg-center bg-no-repeat text-white">
      <div className="absolute left-[7.5rem] right-0 top-[11rem] ">
        <h1 className=" mb-16 font-namu text-[6.6rem] ">
          {t('hero:main_title')}
        </h1>

        <ul className=" mb-[235px] text-2xl font-normal ">
          <li className="mb-6 leading-9">{t('hero:shelter')}</li>
          <li className="mb-6 leading-9">{t('hero:eco_rest')}</li>
          <li className="leading-9">{t('hero:excursions')}</li>
        </ul>

        <a
          className="flex items-center gap-3 fill-white text-xl font-medium text-white hover:text-accent"
          href="#location"
        >
          <LocationIcon />
          {t('hero:address')}
        </a>
        <a
          className=" absolute bottom-5 right-[190px] flex h-[130px] w-[130px] items-center rounded-full bg-accent text-center text-xl font-medium text-black hover:bg-lemon"
          href="#"
        >
          {t('hero:order')}
        </a>
      </div>
    </section>
  );
};
export default Hero;
