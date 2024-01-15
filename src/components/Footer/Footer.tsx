import { useEffect } from 'react';
import logo_dark from '@/assets/icons/logo_dark.svg';
import fb_icon from '@/assets/icons/icon_facebook.svg';
import inst_icon from '@/assets/icons/icon_instagram.svg';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchPdfs } from '@/store/slices/pdfSlice';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const dispatch = useAppDispatch();

  const translateTitle = (title: string) => {
    if (title === 'Правила Користування Сайтом') {
      return 'Terms of Use';
    }
    if (title === 'Політика Конфіденційності') {
      return 'Privacy Policy';
    }
    return title;
  };

  const documents = useAppSelector((state) => state.pdf.documents);

  const anchorLinks = [
    { title: t('footer:anchor_links.about_us'), href: '#about-us' },
    { title: t('footer:anchor_links.excursions'), href: '#excursions' },
    { title: t('footer:anchor_links.gallery'), href: '#gallery' },
    { title: t('footer:anchor_links.news'), href: '#news' },
    { title: t('footer:anchor_links.partners'), href: '#partners' }
  ];

  useEffect(() => {
    dispatch(fetchPdfs())
      .unwrap()
      .then(() => {
        return [];
      })
      .catch((error) => alert(error));
  }, [dispatch]);

  return (
    <footer className="mx-auto pb-[1.125rem] pt-8  md:pb-10 md:pt-16">
      <div className="container mx-auto  flex flex-col px-5 md:px-12  lg:px-[7.5rem]">
        {/* Mobile */}
        <ul className="flex flex-col  gap-4 md:hidden">
          {/* logo */}
          <li>
            {' '}
            <img src={logo_dark} width={135} height={67} alt="logo" />
          </li>
          {/* working hours */}
          <li>
            <ul className="flex flex-col gap-5">
              <li>
                <p className="default-text">{t('footer:working_days')}</p>
              </li>
              <li>
                <p className="default-text">{t('contacts:titles.schedule')}</p>
              </li>
            </ul>
          </li>
          {/* anchor links */}
          <li>
            <div className="flex flex-col gap-3">
              <h3 className="custom-text title-text"> {t('footer:menu')} </h3>
              <ul className="flex flex-col gap-3">
                {anchorLinks.map(({ title, href }) => (
                  <li key={href}>
                    <a href={href} className="default-text">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {/* button gelp */}
          <li>
            <a href="#support" onClick={() => console.log('hi')}>
              <button className=" duration-800 w-[14.44rem] bg-accent px-[4.16rem] py-2 text-lg font-medium leading-6  hover:bg-lemon focus:bg-lemon active:bg-darkyellow">
                {t('footer:button_help')}{' '}
              </button>
            </a>
          </li>
          {/* documents */}
          <li>
            <div className="flex flex-col gap-3">
              <h3 className="title-text"> {t('footer:documents')} </h3>
              <ul className="flex flex-col gap-2">
                {documents && Array.isArray(documents) ? (
                  documents.map((document) => (
                    <li key={document.id}>
                      <Link to={`pdf/${document.id}`} className="default-text">
                        {language === 'uk'
                          ? document.title
                          : translateTitle(document.title)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Сервер не відповідає</p>
                )}
              </ul>
            </div>
          </li>
          {/* contacts */}
          <li className="flex flex-col gap-3">
            <h3 className="title-text">{t('footer:contacts')}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:zdravejutta@gmail.com"
                  rel="noopener noreferrer"
                  className="default-text"
                >
                  zdravejutta@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+380987675765"
                  rel="noopener noreferrer"
                  className="default-text"
                >
                  +380 987 675 765
                </a>
              </li>
            </ul>
          </li>
          {/* links to social networks */}
          <li>
            <ul className="flex  gap-6">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100060159926539"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={fb_icon}
                    alt="facebook link icon"
                    width={32}
                    height={32}
                  />{' '}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/busha_zdravaja_zhizn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={inst_icon}
                    alt="instagram link icon"
                    width={32}
                    height={32}
                  />{' '}
                </a>
              </li>
            </ul>
          </li>
        </ul>

        {/* tablet and desktop */}
        <ul className="hidden justify-between md:flex md:flex-row">
          {/* Tablet */}
          {/* first col tablet */}
          <li className="flex flex-col lg:hidden">
            <img
              src={logo_dark}
              width={135}
              height={67}
              alt="logo"
              className="mb-3"
            />
            <ul className="mb-8 flex flex-col gap-6">
              <li>
                <p className="default-text">{t('footer:working_days')}</p>
              </li>
              <li>
                <p className="default-text">{t('contacts:titles.schedule')}</p>
              </li>
            </ul>
            <a href="#support">
              <button
                onClick={() => console.log('hi')}
                className=" duration-800 w-[14.44rem] bg-accent px-[4.16rem] py-2 text-lg font-medium leading-6  hover:bg-lemon focus:bg-lemon active:bg-darkyellow"
              >
                {t('footer:button_help')}{' '}
              </button>
            </a>
          </li>
          <li className="hidden flex-col lg:flex">
            <img
              src={logo_dark}
              width={135}
              height={67}
              alt="logo"
              className="mb-3"
            />
            <p className="default-text mb-0.5">{t('footer:shelter_p1')}</p>
            <p className="default-text mb-8">{t('footer:shelter_p2')} </p>
            <a href="#support">
              <button className=" duration-800 w-[14.44rem] bg-accent px-[4.16rem] py-2 text-lg font-medium leading-6  hover:bg-lemon focus:bg-lemon active:bg-darkyellow">
                {t('footer:button_help')}{' '}
              </button>
            </a>
          </li>

          {/* second col tablet */}
          <li>
            <div className="flex flex-col gap-3">
              <h3 className="custom-text title-text"> {t('footer:menu')} </h3>
              <ul className="flex flex-col gap-2">
                {anchorLinks.map(({ title, href }) => (
                  <li key={href}>
                    <a href={href} className="default-text">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* third col tablet */}
          <li className="lg:hidden">
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col gap-3">
                <h3 className="title-text"> {t('footer:documents')} </h3>
                <ul className="flex flex-col gap-2">
                  {documents && Array.isArray(documents) ? (
                    documents.map((document) => (
                      <li key={document.id}>
                        <Link
                          to={`pdf/${document.id}`}
                          className="default-text"
                        >
                          {language === 'uk'
                            ? document.title
                            : translateTitle(document.title)}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p>Сервер не відповідає</p>
                  )}
                </ul>
              </li>
              <li className="flex flex-col gap-3">
                <h3 className="title-text">{t('footer:contacts')}</h3>
                <ul className="flex flex-col gap-2">
                  <li>
                    <a
                      href="mailto:zdravejutta@gmail.com"
                      rel="noopener noreferrer"
                      className="default-text"
                    >
                      zdravejutta@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+380987675765"
                      rel="noopener noreferrer"
                      className="default-text"
                    >
                      +380 987 675 765
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="flex flex-row gap-6 lg:flex-col lg:gap-3">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100060159926539"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={fb_icon}
                        alt="facebook link icon"
                        width={32}
                        height={32}
                      />{' '}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/busha_zdravaja_zhizn/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={inst_icon}
                        alt="instagram link icon"
                        width={32}
                        height={32}
                      />{' '}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>{' '}
          </li>

          {/* third col desktop */}
          <li className="hidden lg:block">
            <div className="flex flex-col gap-3">
              <h3 className="title-text"> {t('footer:documents')} </h3>
              <ul className="flex flex-col gap-2">
                {documents && Array.isArray(documents) ? (
                  documents.map((document) => (
                    <li key={document.id}>
                      <Link to={`pdf/${document.id}`} className="default-text">
                        {language === 'uk'
                          ? document.title
                          : translateTitle(document.title)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Сервер не відповідає</p>
                )}
              </ul>
            </div>
          </li>

          {/* fourth col */}
          <li className="hidden flex-col gap-8 lg:flex">
            <div className="flex flex-col gap-3">
              <h3 className="title-text"> {t('footer:working_hours')}</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <p className="default-text">{t('footer:working_days')}</p>
                </li>
                <li>
                  <p className="default-text">
                    {t('contacts:titles.schedule')}
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="title-text">{t('footer:contacts')}</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="mailto:zdravejutta@gmail.com"
                    rel="noopener noreferrer"
                    className="default-text"
                  >
                    zdravejutta@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+380987675765"
                    rel="noopener noreferrer"
                    className="default-text"
                  >
                    +380 987 675 765
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* fifth col */}
          <li className="hidden lg:flex">
            <ul className="hidden flex-col gap-3 lg:flex">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100060159926539"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={fb_icon}
                    alt="facebook link icon"
                    width={32}
                    height={32}
                  />{' '}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/busha_zdravaja_zhizn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={inst_icon}
                    alt="instagram link icon"
                    width={32}
                    height={32}
                  />{' '}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>{' '}
    </footer>
  );
};

export default Footer;
