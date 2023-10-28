import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    i18n: { changeLanguage, language }
  } = useTranslation();

  const handleScroll = () => {
    if (window.scrollY >= 180) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isScrolled ? 'bg-white' : 'bg-transparent'
      } fixed top-0  z-10 flex w-[1440px] items-center justify-between px-28 py-5 text-lg text-white outline-transparent`}
    >
      <a className="inline-bloc" href="../main.tsx">
        {isScrolled ? (
          <img src="/Logo-black.svg" alt="" />
        ) : (
          <img src="/logo.svg" alt="" />
        )}
      </a>
      <nav>
        <ul className="flex gap-8">
          <li
            className={`${
              isScrolled
                ? 'text-black hover:border-b-black'
                : 'hover:border-b-white'
            } border-1 duration-400 border-transparent py-2 transition-all duration-300`}
          >
            <a href="#gallery">Про нас</a>
          </li>
          <li
            className={`${
              isScrolled
                ? 'text-black hover:border-b-black'
                : 'hover:border-b-white'
            } border-1 duration-400 border-transparent py-2 transition-all duration-300`}
          >
            <a href="#excursions">Екскурсії</a>
          </li>
          <li
            className={`${
              isScrolled
                ? 'text-black hover:border-b-black'
                : 'hover:border-b-white'
            } border-1 duration-400 border-transparent py-2 transition-all duration-300`}
          >
            <a href="#news">Новини</a>
          </li>
          <li
            className={`${
              isScrolled
                ? 'text-black hover:border-b-black'
                : 'hover:border-b-white'
            } border-1 duration-400 border-transparent py-2 transition-all duration-300`}
          >
            <a href="#partners">Партнери</a>
          </li>
          <li
            className={`${
              isScrolled
                ? 'text-black hover:border-b-black'
                : 'hover:border-b-white'
            } border-1 duration-400 border-transparent py-2 transition-all duration-300`}
          >
            <a href="#contacts">Контакти</a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center justify-between">
        <div className=" mr-8">
          <button
            onClick={() => changeLanguage('uk')}
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
            onClick={() => changeLanguage('en')}
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
        <button
          className={` ${
            isScrolled
              ? 'border-black border-transparent bg-accent text-black'
              : 'border-white bg-inherit'
          } border-1 duration-400 block  px-5 py-3 transition-all duration-300 hover:border-transparent hover:bg-lemon hover:text-black`}
          type="button"
        >
          Допомогти
        </button>
      </div>
    </header>
  );
};

export default Header;
