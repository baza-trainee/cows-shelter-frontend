import logo_dark from '@/assets/icons/logo_dark.svg';
import fb_icon from '@/assets/icons/icon_facebook.svg';
import inst_icon from '@/assets/icons/icon_instagram.svg';

const Footer = () => {
  return (
    <div className="container mx-auto flex max-w-[1440px] px-8 pb-10 pt-16 md:px-20">
      <ul className="flex flex-col gap-x-[102.5px] md:flex-row">
        {/* first col */}
        <li className="flex flex-col">
          <img
            src={logo_dark}
            width={135}
            height={67}
            alt="logo"
            className="mb-3"
          />
          <p className="mb-0.5">Притулок корів, биків, телят</p>
          <p className="mb-8">Захист від насилля, голоду, холоду</p>
          <button className="w-[138px] bg-accent px-5 py-[8.5px]">
            Допомогти
          </button>
        </li>

        {/* second col */}
        <li>
          <div className="flex flex-col gap-3">
            <h3>МЕНЮ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/">Про нас</a>
              </li>
              <li>
                <a href="/">Екскурсії</a>
              </li>
              <li>
                <a href="/">Галерея</a>
              </li>
              <li>
                <a href="/">Новини</a>
              </li>
              <li>
                <a href="/">Партнери</a>
              </li>
            </ul>
          </div>
        </li>

        {/* third col */}
        <li>
          <div className="flex flex-col gap-3">
            <h3>ДОКУМЕНТИ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  Політика конфіденційності
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  Правила користування сайтом
                </a>
              </li>
            </ul>
          </div>
        </li>

        {/* fourth col */}
        <li className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3>РЕЖИМ РОБОТИ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <p>Понеділок - П&#39;ятниця</p>
              </li>
              <li>
                <p>10:00 - 20:00</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3>КОНТАКТИ</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:zdravejutta@gmail.com"
                  rel="noopener noreferrer"
                >
                  zdravejutta@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+380987675765" rel="noopener noreferrer">
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
