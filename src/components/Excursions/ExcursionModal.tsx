import people_icon from '@/assets/icons/people_icon.svg';
import time_icon from '@/assets/icons/time_icon.svg';
import close_icon_black from '@/assets/icons/close_icon_black.svg';
import { closeModal, openModal } from '@/store/slices/modalSlice';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { useAppDispatch } from '@/store/hook';
import { ExcursionsData } from '@/types';
import { useTranslation } from 'react-i18next';

type ExcursionsModalProps = {
  excursion: ExcursionsData;
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const ExcursionModal = ({
  excursion,
  isOpen,
  setShowModal
}: ExcursionsModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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

  const openExcursionOrderModal = () => {
    setTimeout(() => {
      dispatch(openModal({ data: {}, type: 'order' }));
    }, 300);
  };

  const openDonationModal = () => {
    dispatch(openModal({ data: {}, type: 'donation' }));
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
        } h-[675px] w-[85%] translate-x-[-50%] translate-y-[-50%] overflow-auto bg-white 
        px-5 pb-12 pt-4 transition-all duration-700 md:h-[832px] md:w-[672px] md:px-10 md:pb-10 md:pt-10 
         lg:h-auto lg:w-[1136px] lg:px-[3.75rem] lg:pb-[3.75rem]`}
      >
        <div className="flex flex-col md:gap-6 lg:flex-row lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:gap-6 lg:gap-9">
              <div className="flex gap-3">
                <img src={time_icon} width={24} height={24}></img>
                <span className="text-sm leading-normal text-darkyellow md:text-base">
                  {t(excursion.timeFrom)} - {t(excursion.timeTill)}{' '}
                  {t(excursion.minutes)}
                </span>
              </div>
              <div className="flex gap-3">
                <img src={people_icon} width={24} height={24}></img>
                <span className="text-sm leading-normal text-darkyellow md:text-base">
                  {t(excursion.to)} {t(excursion.number_of_people)}{' '}
                  {t(excursion.visitors)}
                </span>
              </div>
            </div>
            {windowWidth >= 1280 && (
              <div className="grid grid-cols-2 gap-3.5">
                <img
                  src={excursion.imagesSrs[0]}
                  className="h-full w-full object-cover"
                ></img>
                <img
                  src={excursion.imagesSrs[1]}
                  className="h-full w-full object-cover"
                ></img>
                <img
                  className="col-start-1 col-end-3 h-full w-full object-cover"
                  src={excursion.imagesSrs[2]}
                ></img>
              </div>
            )}
            {windowWidth >= 768 && windowWidth < 1280 && (
              <div className="flex gap-3">
                <img
                  src={excursion.imagesSrs_tablet[0]}
                  className="h-full w-full object-cover"
                ></img>
                <img
                  src={excursion.imagesSrs_tablet[1]}
                  className="h-full w-full object-cover"
                ></img>
              </div>
            )}
            {windowWidth < 768 && (
              <img
                src={excursion.imagesSrs_mobile}
                className="h-full w-full object-cover"
              ></img>
            )}
          </div>
          <div className="mt-[1.25rem] flex w-[90%] flex-col justify-between gap-3.5 md:mt-0 md:w-[592px] md:gap-6 lg:w-[28.75rem]">
            <h3 className="pb-[7px] text-lg font-semibold leading-normal text-black md:mt-0 md:text-xl lg:border-b lg:border-disabled lg:text-2xl lg:font-bold">
              {t(excursion.title)}
            </h3>
            <p className="whitespace-pre-line text-sm font-normal leading-normal text-black md:text-base">
              {t(excursion.description)}
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:justify-center md:gap-6">
              <button
                className="h-10 max-w-[17.5rem] bg-accent text-lg font-medium leading-[1.375rem] transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-lemon md:h-11 md:w-[14.44rem]"
                onClick={openExcursionOrderModal}
              >
                {t('excursions:excursion.order_btn')}
              </button>
              <button
                className="h-10 max-w-[17.5rem] border border-solid border-black text-lg font-medium leading-[1.375rem] text-black transition-all duration-300 hover:border-accent focus:border-accent active:border-accent md:h-11 md:w-[14.44rem]"
                onClick={openDonationModal}
              >
                {t('header:btn_donate')}
              </button>
            </div>
          </div>
        </div>
        <button
          className="absolute right-6 top-6"
          onClick={() => closeExcursionsModal()}
        >
          <img src={close_icon_black} width={44} height={44}></img>
        </button>
      </div>
    </div>
  );
};

export default ExcursionModal;
