/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
import people_icon from '@/assets/icons/people_icon.svg';
import time_icon from '@/assets/icons/time_icon.svg';
import close_icon from '@/assets/icons/close_icon.svg';
import { closeModal, openModal } from '@/store/slices/modalSlice';
import { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hook';
import { ExcursionsData } from '@/types';
import { useTranslation } from 'react-i18next';

type ExcursionsModalProps = {
  excursion: ExcursionsData;
};

const ExcursionModal = ({ excursion }: ExcursionsModalProps) => {
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

  const closeExcursionsModal = () => dispatch(closeModal());

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      closeExcursionsModal();
    }
  };

  const openExcursionOrderModal = () => {
    setTimeout(() => {
      dispatch(
      openModal({ data: {}, type: 'order' })
    );
    }, 300)
  };

  const openDonationModal = () => {
dispatch(openModal({ data: {}, type: 'donation' }))
  }

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[100%] w-full bg-black/[.60]"
      onClick={handleOverlayClick}
    >
      <div className="absolute overflow-auto h-[587px] md:h-auto left-1/2 top-1/2 w-[85%] lg:w-[1136px] md:w-[672px] translate-x-[-50%] translate-y-[-50%] border-2 border-solid border-white bg-graphite lg:px-[3.75rem] md:px-10 px-5 lg:pb-[3.75rem] md:pb-10 pb-12 md:pt-10 pt-4">
        <div className="flex lg:gap-10 md:gap-6 flex-col lg:flex-row">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-9">
              <div className="flex gap-3">
                <img src={time_icon} width={24} height={24}></img>
                <span className="text-sm md:text-base leading-normal text-accent">{t('excursions:excursion.duration')}</span>
              </div>
              <div className="flex gap-3">
                <img src={people_icon} width={24} height={24}></img>
                <span className="text-sm md:text-base leading-normal text-accent"> {t('excursions:excursion.number_of_people')} </span>
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
            {windowWidth > 768 && windowWidth < 1280 && (
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
            {windowWidth > 320 && windowWidth < 768 && (
              <img
                src={excursion.imagesSrs_mobile}
                className="h-full w-full object-cover"
              ></img>
            )}
          </div>
          <div className="flex w-[90%] md:w-[592px] lg:w-[28.75rem] flex-col justify-between md:gap-4 gap-3.5 mt-[1.25rem] md:mt-0">
                  <h3 className="leading-normal text-lg md:text-xl lg:text-2xl md:mt-0 lg:mt-10 font-semibold md:font-bold text-white">{t(excursion.title)}</h3>
                  <p className="text-sm md:text-base leading-normal font-normal text-white">{t(excursion.description)}</p>
            <div className="flex gap-3 md:gap-6 flex-col md:flex-row">
              <button className="h-10 md:h-11 max-w-[17.5rem] md:w-[14.44rem] transition-all duration-300 bg-accent text-lg font-medium leading-[1.375rem] focus:bg-lemon active:bg-lemon hover:bg-lemon"
                onClick={openExcursionOrderModal}
              >
                {t('excursions:excursion.order_btn')}
              </button>
              <button className="h-10 md:h-11 max-w-[17.5rem] md:w-[14.44rem] border border-solid transition-all duration-300 border-white text-lg font-medium leading-[1.375rem] text-white focus:border-accent active:border-accent hover:border-accent"
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
          <img src={close_icon} width={44} height={44}></img>
        </button>
      </div>
    </div>
  );
};

export default ExcursionModal;
