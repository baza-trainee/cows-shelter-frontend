import logo_dark from '@/assets/icons/logo_dark.svg';
import fb_icon from '@/assets/icons/icon_facebook.svg';
import inst_icon from '@/assets/icons/icon_instagram.svg';

const Footer = () => {
  return (
    <div className="container mx-auto flex max-w-[1440px] flex-col ">
      <ul className="flex flex-col gap-x-[102.5px] px-8 pb-10 pt-16 md:flex-row md:px-20">
        {/* first col */}
        <li className="flex flex-col">
          <img
            src={logo_dark}
            width={135}
            height={67}
            alt="logo"
            className="mb-3"
          />
          <p className="default-text mb-0.5">Притулок корів, биків, телят</p>
          <p className="default-text mb-8">
            Захист від насилля, голоду, холоду
          </p>
          <button className=" w-[14,4375rem] bg-accent px-[4,15625rem] py-2 text-lg font-medium leading-6 hover:bg-lemon focus:bg-lemon active:bg-darkyellow">
            Допомогти
          </button>
        </li>

        {/* second col */}
        <li>
          <div className="flex flex-col gap-3">
            <h3 className="custom-text title-text">МЕНЮ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/" className="default-text">
                  Про нас
                </a>
              </li>
              <li>
                <a href="/" className="default-text">
                  Екскурсії
                </a>
              </li>
              <li>
                <a href="/" className="default-text">
                  Галерея
                </a>
              </li>
              <li>
                <a href="/" className="default-text">
                  Новини
                </a>
              </li>
              <li>
                <a href="/" className="default-text">
                  Партнери
                </a>
              </li>
            </ul>
          </div>
        </li>

        {/* third col */}
        <li>
          <div className="flex flex-col gap-3">
            <h3 className="title-text">ДОКУМЕНТИ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="default-text"
                >
                  Політика конфіденційності
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="default-text"
                >
                  Правила користування сайтом
                </a>
              </li>
            </ul>
          </div>
        </li>

        {/* fourth col */}
        <li className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="title-text">РЕЖИМ РОБОТИ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <p className="default-text">Понеділок - П&#39;ятниця</p>
              </li>
              <li>
                <p className="default-text">10:00 - 20:00</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="title-text">КОНТАКТИ</h3>
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
        <li>
          <ul className="flex flex-col gap-3">
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
                href="https://www.facebook.com/profile.php?id=100060159926539"
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
    </div>
  );
};

export default Footer;
