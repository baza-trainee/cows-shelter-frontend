import { useTranslation } from 'react-i18next';
import logo_uaanimals from '@/assets/images/logo_uaanimals.png';
import logo_sloboda from '@/assets/images/logo_svoboda.png';
import logo_zhitta from '@/assets/images/logo_zhitta.png';
import logo_baza from '@/assets/images/logo_baza.png';

const Partners = () => {
  const { t } = useTranslation();

  const partners = [
    {
      title: t('partners:partners.uaAnimals'),
      href: 'https://uanimals.org/',
      src: logo_uaanimals
    },
    {
      title: t('partners:partners.sloboda_zvierat'),
      href: 'https://www.facebook.com/groups/606065439570544',
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
    <div className="container mx-auto flex max-w-[1440px] flex-col bg-lightgrey px-[7.5rem] py-20">
      <div className="sectionHeader mb-14 flex items-center justify-between">
        <h2 className="text-[64px] font-medium">{t('partners:header')}</h2>
        <button className="duration-800 bg-accent px-8 py-3 text-lg font-medium leading-6 hover:bg-lemon focus:bg-lemon active:bg-darkyellow">
          {t('partners:become_partner')}
        </button>
      </div>
      <p className="mb-10 w-[1070px] text-[22px] leading-relaxed text-gray-700">
        {t('partners:text')}
      </p>
      <ul className="mt-20 flex gap-6">
        {partners.map(({ title, href, src }) => (
          <li key={title}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <img
                className="mb-6"
                src={src}
                alt={title}
                width={282}
                height={282}
              />
              <p className="mb-5 text-center text-[22px] leading-relaxed">
                {title}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partners;
