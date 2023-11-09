import { useAppDispatch } from '@/store/hook';
import { useTranslation } from 'react-i18next';
import LocationIcon from '../icons/LocationIcon';
// import close_icon from '@/assets/icons/close_icon.svg';
import icon_phone from '@/assets/icons/icon_phone.svg';
import icon_email from '@/assets/icons/icon_email.svg';
import logo_icon from '@/assets/icons/logo_icon.svg';
import { closeModal } from '@/store/slices/modalSlice';
import { MouseEvent } from 'react';
import CloseIcon from '@/components/icons/CloseIcon';

const ExcursionOrderModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //   const handleChangedSize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   useEffect(() => {
  //     window.addEventListener('resize', handleChangedSize);
  //     return () => {
  //       window.removeEventListener('resize', handleChangedSize);
  //     };
  //   }, []);

  const closeExcursionsModal = () => dispatch(closeModal());

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      closeExcursionsModal();
    }
  };
  return (
    <div
      className="fixed left-0 top-0 z-50 h-[100%] w-full bg-black/[.60]"
      onClick={handleOverlayClick}
    >
      {/* <div className="absolute left-1/2 top-1/2 flex translate-x-[-50%] translate-y-[-50%] sm:flex-col">
        {windowWidth > 320 && windowWidth < 768 && (
          <div>
            <div>
              <h2 className="mb-8 text-lg font-bold leading-normal">
                {t('excursions:order_modal.title')}
              </h2>
              <div className="h-[220px] w-[280px]">
                <img
                  className="object-cover"
                  src="/excursions/excursion_order.jpg"
                />
              </div>
              <button
                className="absolute right-6 top-6"
                onClick={closeExcursionsModal}
              >
                <img src={close_icon} width={44} height={44} />
              </button>
            </div>
          </div>
        )}
        <div className="w-[624px] bg-white py-[63px] pl-5 pr-5 md:pl-5 lg:pl-20 lg:pr-6">
          {windowWidth > 768 && (
            <h2 className="mb-8 text-lg font-bold leading-normal md:text-xl lg:text-4xl">
              {t('excursions:order_modal.title')}
            </h2>
          )}
          <p className="mb-6 text-sm leading-normal text-darkgray md:text-base lg:text-[1.06rem]">
            {t('excursions:order_modal.text')}
          </p>
          <ul className="flex flex-col gap-6">
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
                <a className="flex gap-5" href="#location">
                  <LocationIcon />
                  <p className="text-sm">
                    {t('excursions:order_modal.address')}
                  </p>
                </a>
              </div>
            </li>
          </ul>
          <img className="mx-auto mt-20 h-8 w-10" src={logo_icon} />
        </div>
        {windowWidth > 768 && (
          <div className="relative">
            <div className="h-full w-full lg:h-[491px] lg:w-[420px]">
              <img
                className="h-auto max-w-full object-cover"
                src="/excursions/excursion_order.jpg"
              />
            </div>
            <button
              className="absolute right-6 top-6"
              onClick={closeExcursionsModal}
            >
              <img src={close_icon} width={44} height={44} />
            </button>
          </div>
        )}
      </div> */}

      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white px-5 py-8">
        <div>
          <div>
            <div className="flex justify-between">
              <h2 className="mb-8 text-lg font-bold leading-normal">
                {t('excursions:order_modal.title')}
              </h2>
              <button className="bg-black" onClick={closeExcursionsModal}>
                <CloseIcon />
              </button>
            </div>
            <img
              className="h-[220px] w-[280px] object-cover"
              src="/excursions/excursion_order.jpg"
            />
          </div>
        </div>
        <div className="bg-white">
          <p className="mb-6 text-sm leading-normal text-darkgray md:text-base lg:text-[1.06rem]">
            {t('excursions:order_modal.text')}
          </p>
          <ul className="flex flex-col gap-6">
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
                <a className="flex gap-5" href="#location">
                  <LocationIcon />
                  <p className="text-sm">
                    {t('excursions:order_modal.address')}
                  </p>
                </a>
              </div>
            </li>
          </ul>
          <img className="mx-auto mt-20 h-8 w-10" src={logo_icon} />
        </div>
      </div>
    </div>
  );
};

export default ExcursionOrderModal;
