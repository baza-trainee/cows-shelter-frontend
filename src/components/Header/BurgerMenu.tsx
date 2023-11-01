import CloseIcon from '../icons/CloseIconMenu';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, MouseEvent } from 'react';
import { navLinks } from '@/data/navLinks';
import { useAppDispatch } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';

const BurgerMenu = () => {
  const [activeSection, setActiveSection] = useState('#about-us');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    i18n: { changeLanguage, language }
  } = useTranslation();
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const closeBurgerMenu = () => dispatch(closeModal());

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      closeBurgerMenu();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePressESC = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closeBurgerMenu();
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

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
      className="fixed left-0 top-0 z-[9999] h-screen w-screen bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="absolute right-0 top-0 w-[265px] bg-white  text-[1.07rem] md:w-[304px]">
        <div className=" bg-lightgrey pl-14 ">
          <h2 className=" py-3 md:py-[26px] md:text-xl">{t('header:menu')}</h2>
        </div>
        <button
          type="button"
          onClick={closeBurgerMenu}
          className="absolute right-3 top-3 md:right-12 md:top-7"
        >
          <CloseIcon />
        </button>
        <ul className="mb-3 pl-14 md:mb-0">
          {navLinks.map(({ title, href }) => (
            <li key={href} className="py-3 md:py-[22px]">
              {' '}
              <a
                href={href}
                onClick={() => handleSectionChange(href)}
                className={`${
                  activeSection === href ? ' border-b-2 ' : 'border-transparent'
                } border-b border-black`}
              >
                {t(title)}
              </a>
            </li>
          ))}
        </ul>
        {windowWidth < 768 && (
          <div className="border-gray mb-2 border-y py-3">
            <button
              className="mx-auto flex h-11 w-[208px] items-center justify-center border border-black border-transparent bg-accent text-lg text-black transition-all duration-300 hover:border-transparent hover:bg-lemon hover:text-black focus:bg-lemon focus:text-black active:bg-darkyellow active:text-black lg:w-[180px]"
              type="button"
            >
              {t('header:btn_donate')}
            </button>
          </div>
        )}
        <div className=" border-grey pt-5 md:border-t">
          <h3 className=" mb-2 pl-14 text-disabled">{t('header:language')}</h3>
          <div className=" pb-6 pl-14">
            <button
              onClick={() => changeLanguage('uk')}
              className={`${
                language === 'uk'
                  ? 'border border-transparent bg-accent text-black'
                  : 'border border-disabled text-disabled'
              } mr-4 p-2 uppercase `}
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
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
