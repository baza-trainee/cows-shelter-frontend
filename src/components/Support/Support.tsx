import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWidth } from '@/hooks/useWidth';
import { cards, steps } from '@/data/support';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { SupportCard } from '@/types';

import Card from './Card';
import SupportInfoModal from '@/components/modals/SupportInfoModal';
import QRDonateModal from '../modals/QRDonateModal';

const Support = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const screenWidth = useWidth();
  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const openDonateModal = () => {
    dispatch(openModal({ data: {}, type: 'donation' }));
  };

  const openInfoModal = (id: number) => {
    const card = cards.find((item) => item.id === id);
    dispatch(openModal({ data: card as SupportCard, type: 'support_info' }));
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setShowModal(true);
      }, 300);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [isModalOpen]);

  return (
    <section className="">
      <div
        className={`relative h-[240px] w-full bg-[url('/support/support_bg.webp')] bg-cover bg-center bg-no-repeat sm:bg-fixed md:h-[240px] lg:h-[460px]`}
      />
      <div
        id="donate"
        className="mx-auto flex flex-col items-start justify-center px-5 py-6 sm:w-[480px] md:w-[768px] md:px-12 md:py-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]"
      >
        <h2
          className="my-[20px] flex w-full gap-2 whitespace-nowrap text-[24px] font-medium md:text-[44px] lg:text-[54px] "
          id="support"
        >
          {t('support:title')}
          <img src="/cow.svg" alt="" className="w-[5rem]" />
        </h2>
        <p className="mb-10 text-[14px] leading-normal text-darkgray md:text-[20px] lg:w-[1020px] lg:text-[22px]">
          {t('support:text')}
        </p>
        <div className="w-full justify-center gap-4 text-white md:flex">
          <Card
            card={cards[0]}
            openDonateModal={openDonateModal}
            openInfoModal={openInfoModal}
          />
          ;
          <Card
            card={cards[1]}
            openDonateModal={openDonateModal}
            openInfoModal={openInfoModal}
          />
          ;
        </div>
        <div className="relative mt-10 w-full md:flex">
          <ul className="flex-1">
            {steps.map((step, index) => (
              <li
                key={index}
                className="mx-auto mb-[24px] flex w-full items-center justify-start gap-4"
              >
                <div className="w-[0.5rem] md:w-[4rem]">
                  {screenWidth >= 768 ? (
                    <div className="">
                      <span className="flex h-[50px] w-[51px]  items-center justify-center rounded-full border-2 border-yellowshadow text-[1.5rem] font-bold text-darkgray lg:h-[58px] lg:w-[59px] lg:text-[24px]">
                        {index + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="h-[3px] w-[3px] rounded-full bg-black"></div>
                  )}
                </div>

                <p className="text-[14px] lg:text-[22px]">
                  {t(`support:${step}`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-end pb-4 md:justify-center">
            {!isModalOpen && (
              <button
                onClick={openDonateModal}
                className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-accent  p-2 text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:scale-105 focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-lg"
              >
                {t('support:support')}
              </button>
            )}
          </div>
          {isModalOpen && type === 'support_info' && (
            <SupportInfoModal
              handleClick={openDonateModal}
              isOpen={showModal}
              setShowModal={setShowModal}
            />
          )}
        </div>
      </div>
      {isModalOpen && type === 'donation' && (
        <QRDonateModal isOpen={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default Support;
