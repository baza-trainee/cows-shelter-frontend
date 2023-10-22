import { useState, useEffect, MouseEvent } from 'react';

type CurrentLanguage = string | null;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<CurrentLanguage>('ua');

  const handleScroll = () => {
    if (window.scrollY >= 180) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const switchLanguage = (event: MouseEvent<HTMLButtonElement>) => {
    setCurrentLanguage(event.currentTarget.textContent);
    console.log(event.currentTarget.textContent);
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
      } w-[1440px] fixed  top-0 z-10 flex items-center justify-between px-28 py-5 text-lg text-white outline-transparent`}
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
            <a href="#about-us">Про нас</a>
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
            onClick={switchLanguage}
            className={`${
              currentLanguage === 'ua'
                ? `${isScrolled ? 'text-black' : 'text-white'}`
                : 'text-disabled'
            } uppercase `}
            type="button"
          >
            ua
          </button>
          <span className="text-disabled">|</span>
          <button
            onClick={switchLanguage}
            className={`${
              currentLanguage === 'en'
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
            isScrolled ? 'border-black text-black bg-accent border-transparent' : 'border-white bg-inherit'
          } border-1 duration-400 block  px-5 py-3 hover:border-transparent hover:bg-lemon hover:text-black transition-all duration-300`}
          type="button"
        >
          Допомогти
        </button>
      </div>
    </header>);
};

export default Header;
