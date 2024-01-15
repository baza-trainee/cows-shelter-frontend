import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { openModal } from '@/store/slices/modalSlice';
import { navLinks } from '@/data/navLinks';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import BurgerMenu from './BurgerMenu';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#about-us');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {
    i18n: { changeLanguage, language }
  } = useTranslation();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const activeLink = useAppSelector((state) => state.observer.activeLink);

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBurgerMenu = () =>
    dispatch(openModal({ data: {}, type: 'burgerMenu' }));

  const openDonateModal = () => {
    dispatch(openModal({ data: {}, type: 'donation' }));
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (activeLink.length) {
      setActiveSection(activeLink);
    }
  }, [activeLink]);

  return (
    <>
      <header
        className={`${
          isScrolled ? 'bg-white' : 'bg-transparent'
        } fixed left-0 right-0 top-0 z-10 md:py-[15px] lg:py-5`}
      >
        <div className=" mx-auto flex items-center justify-between px-5 text-lg text-white outline-transparent sm:w-[480px] md:w-[768px] md:px-12 lg:w-[1280px] lg:px-[120px]  xl:w-[1440px] ">
          <Link
            className="inline-block h-10 w-20 md:h-[50px] md:w-[100px]"
            to="#"
            onClick={scrollToTop}
          >
            {isScrolled ? (
              <img src="Logo-black.svg" alt="" />
            ) : (
              <img src="logo.svg" alt="" />
            )}
          </Link>
          {windowWidth >= 1280 && (
            <nav>
              <ul className="flex gap-8 text-[1.07rem] font-medium leading-[1.59rem]">
                {navLinks.map(({ title, href }) => (
                  <li
                    key={href}
                    className={`${
                      isScrolled
                        ? 'text-black hover:border-b-black focus:border-b-black'
                        : 'hover:border-b-white focus:border-b-white'
                    } ${
                      activeSection === href
                        ? 'border-b border-current'
                        : 'border-transparent'
                    } border-b  py-2 transition-all duration-300`}
                  >
                    <a href={href} onClick={() => handleSectionChange(href)}>
                      {t(title)}
                      {activeSection === href}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="font-medium md:flex md:items-center md:gap-8 lg:justify-between">
            {windowWidth >= 1280 && (
              <div className=" mr-8">
                <button
                  onClick={() => {
                    changeLanguage('uk');
                  }}
                  className={`${
                    language === 'uk'
                      ? `${isScrolled ? 'text-black' : 'text-white'}`
                      : 'text-disabled'
                  } uppercase `}
                  type="button"
                >
                  ua
                </button>
                <span className="text-disabled">|</span>
                <button
                  onClick={() => {
                    changeLanguage('en');
                  }}
                  className={`${
                    language === 'en'
                      ? `${isScrolled ? 'text-black' : 'text-white'}`
                      : 'text-disabled'
                  } uppercase`}
                  type="button"
                >
                  en
                </button>
              </div>
            )}
            {windowWidth >= 768 && (
              <button
                onClick={openDonateModal}
                className={` ${
                  isScrolled
                    ? 'bg-accent text-black'
                    : 'border-white bg-inherit'
                }  flex h-11 w-[180px] items-center justify-center border text-lg transition-all duration-300 hover:border-transparent hover:bg-lemon hover:text-black focus:bg-lemon focus:text-black active:bg-darkyellow active:text-black lg:w-[180px]`}
                type="button"
              >
                {t('header:btn_donate')}
              </button>
            )}
            {windowWidth < 1280 && (
              <button
                className={`${isScrolled ? 'text-black' : 'text-white'}`}
                onClick={openBurgerMenu}
              >
                <svg
                  className="fill-current text-current"
                  width="44"
                  height="44"
                >
                  <path
                    d="M8 13H36M8 22H36M8 31H36"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>
      {isModalOpen && type === 'burgerMenu' && <BurgerMenu />}
    </>
  );
};

export default Header;
