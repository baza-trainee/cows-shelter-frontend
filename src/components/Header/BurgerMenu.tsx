import CloseIcon from '../icons/CloseIconMenu';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, MouseEvent } from 'react';
import { navLinks } from '@/data/navLinks';
import { closeModal } from '@/store/slices/modalSlice';
import { useHeight } from '@/hooks/useHeight';
import { useAppDispatch } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

const BurgerMenu = () => {
  const [activeSection, setActiveSection] = useState('#about-us');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setHeight] = useState(window.innerHeight);
  const screenHeight = useHeight();

  const {
    i18n: { changeLanguage, language }
  } = useTranslation();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const closeBurgerMenu = () => dispatch(closeModal());

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    closeBurgerMenu();
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      closeBurgerMenu();
    }
  };

  const openDonateModal = () => {
    closeBurgerMenu();
    dispatch(openModal({ data: {}, type: 'donation' }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePressESC = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closeBurgerMenu();
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    setHeight(screenHeight);
  }, [screenHeight]);

  useEffect(() => {
    document.addEventListener('keydown', handlePressESC);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handlePressESC);
      window.removeEventListener('resize', handleResize);
    };
  }, [handlePressESC]);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div
        className={`absolute right-0 top-0 h-full w-[320px] overflow-y-scroll bg-white pb-8 text-[1.07rem] font-medium transition-all duration-500 ${
          windowHeight > 580 && 'md:h-[580px]'
        } md:w-[304px]`}
      >
        <div className=" bg-lightgrey pl-6 md:pl-14 ">
          <h2 className=" py-[13px] md:py-[27px]">{t('header:menu')}</h2>
        </div>
        <button
          type="button"
          onClick={closeBurgerMenu}
          className="absolute right-3 top-3 md:right-12 md:top-7"
        >
          <CloseIcon />
        </button>
        <ul className="mb-5 border border-b-lightgrey px-14 pt-3">
          {navLinks.map(({ title, href }) => (
            <li key={href} className="mb-6 ">
              {' '}
              <a
                href={href}
                onClick={() => handleSectionChange(href)}
                className={`${
                  activeSection === href ? ' border-b-2 ' : 'border-transparent'
                } inline-block border-b border-black py-2`}
              >
                {t(title)}
              </a>
            </li>
          ))}
        </ul>
        <div className=" mb-6 pb-4 pl-14">
          <h3 className=" md:b-4 mb-2 text-graphite">{t('header:language')}</h3>

          <button
            onClick={() => changeLanguage('uk')}
            className={`${
              language === 'uk'
                ? 'border border-transparent bg-accent text-black'
                : 'border border-disabled text-disabled'
            } mr-4 p-2 uppercase md:mr-[20px] `}
            type="button"
          >
            ua
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`${
              language === 'en'
                ? 'border border-transparent bg-accent text-black'
                : 'border border-disabled text-disabled'
            } p-2 uppercase`}
            type="button"
          >
            en
          </button>
        </div>
        {windowWidth < 768 && (
          <a
            onClick={openDonateModal}
            className=" mx-auto flex h-11 w-[272px] items-center justify-center border border-black border-transparent bg-accent py-3 text-lg text-black transition-all duration-300 hover:border-transparent hover:bg-lemon hover:text-black focus:bg-lemon focus:text-black active:bg-darkyellow active:text-black"
            type="button"
          >
            {t('header:btn_donate')}
          </a>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
