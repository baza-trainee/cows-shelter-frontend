import { useAppDispatch } from '@/store/hook';
import { useTranslation } from 'react-i18next';
import LocationIcon from '../icons/LocationIcon';
import icon_phone from '@/assets/icons/icon_phone.svg';
import icon_email from '@/assets/icons/icon_email.svg';
import logo_icon from '@/assets/icons/logo_icon.svg';
import { closeModal } from '@/store/slices/modalSlice';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react';

import close_icon_black from '@/assets/icons/close_icon_black.svg';
import close_icon from '@/assets/icons/close_icon.svg';

type ExcursionOrderModalProps = {
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const ExcursionOrderModal = ({
  isOpen,
  setShowModal
}: ExcursionOrderModalProps) => {
  const dispatch = useAppDispatch();
  const { language } = useTranslation().i18n;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangedSize);
    return () => {
      window.removeEventListener('resize', handleChangedSize);
    };
  }, []);

  const closeExcursionsModal = () => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      closeExcursionsModal();
    }
  };
  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-screen bg-black transition-all duration-700 ${
        isOpen ? 'bg-opacity-40' : 'bg-opacity-0'
      } `}
      onClick={handleOverlayClick}
    >
      <div
        className={`absolute left-1/2 top-1/2 ${
          isOpen ? 'translate-x-0' : 'translate-x-[100%]'
        } w-full translate-x-[-50%] translate-y-[-50%] bg-white 
      px-5 pb-5 pt-[1.88rem] transition-all duration-700 md:w-[672px] md:px-0 md:pb-0 md:pr-0 md:pt-0 lg:h-[485px] lg:w-[1044px]`}
      >
        <div className="md:flex">
          <div className="pl-0 pr-0  md:py-10 md:pl-12 md:pr-12 lg:py-[3.75rem] lg:pl-20">
            {windowWidth >= 768 && (
              <h2 className="font-bold leading-normal md:mb-5 md:text-xl lg:mb-8 lg:text-4xl">
                {language === 'uk'
                  ? 'Замовити екскурсію!'
                  : 'Order an excursion!'}
              </h2>
            )}
            {windowWidth < 768 && (
              <div>
                <div className="flex items-start justify-between">
                  <h2 className="mb-[1.38rem] text-lg font-semibold leading-normal">
                    {language === 'uk'
                      ? 'Замовити екскурсію!'
                      : 'Order an excursion!'}
                  </h2>
                  <img
                    src={close_icon_black}
                    width={32}
                    height={32}
                    onClick={closeExcursionsModal}
                  ></img>
                </div>
                <img
                  className="h-full w-full object-cover"
                  src="/excursions/excursion_order_mobile.jpg"
                />
              </div>
            )}
            <div className="mt-[1.13rem] lg:mt-0">
              <p className="mb-8 text-sm leading-normal text-darkgray md:text-base lg:mb-6 lg:text-[1.06rem] lg:text-lg">
                {language === 'uk'
                  ? 'Зв’яжіться з нами і ми надамо вам потрібну інфомацію'
                  : 'Contact us and we will provide you with the information you need'}
              </p>
              <ul className="mt-8 flex flex-col gap-3.5 md:mt-10 md:gap-6 lg:mt-6">
                <li>
                  <a
                    href="mailto:zdravejutta@gmail.com"
                    rel="noopener noreferrer"
                    className="flex gap-5 text-graphite "
                  >
                    <img src={icon_email} width={24} height={24} />
                    <p className="text-sm">zdravejutta@gmail.com</p>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+380987675765"
                    rel="noopener noreferrer"
                    className="flex gap-5 text-graphite "
                  >
                    <img src={icon_phone} width={24} height={24} />
                    <p className="text-sm">+380 987 675 765</p>
                  </a>
                </li>
                <li>
                  <div>
                    <div className="flex gap-5">
                      <LocationIcon />
                      <p className="text-sm">
                        {language === 'uk'
                          ? 'Вінницька обл, с. Буша, вул. Виноградна 11'
                          : 'Vinnytsia region, v.Busha, str. Vynogradna 11'}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <img className="mx-auto mt-11 md:mt-8 lg:mt-20" src={logo_icon} />
            </div>
          </div>
          <div className="relative">
            {windowWidth >= 768 && windowWidth < 1280 && (
              <img
                className="h-full w-full object-cover"
                src="/excursions/excursion_order_tablet.jpg"
              />
            )}
            {windowWidth >= 1280 && (
              <img
                className="h-[491px] w-[420px] object-cover"
                src="/excursions/excursion_order.jpg"
              />
            )}
            {windowWidth >= 768 && (
              <button>
                <img
                  className="absolute right-6 top-6"
                  src={close_icon}
                  width={44}
                  height={44}
                  onClick={closeExcursionsModal}
                ></img>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcursionOrderModal;
