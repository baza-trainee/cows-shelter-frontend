import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cards, steps } from '@/data/support';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { SupportCard } from '@/types';

import DonateModal from '../modals/DonateModal';
import Card from './Card';
import SupportInfoModal from '../modals/SupportInfoModal';

const Support = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
        className={`relative h-[240px] w-full bg-[url('/support/support_bg.png')]  bg-fixed bg-top bg-no-repeat md:h-[240px] lg:h-[80vh] lg:bg-center`}
      />
      <div
        id="donate"
        className="flex flex-col items-start justify-center px-[20px] md:px-[48px] lg:px-[120px]"
      >
        <h2 className="my-[20px] text-[24px] font-medium md:text-[54px] lg:text-[64px] ">
          {t('support:title')}
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
        <div className="relative mt-10 flex w-full ">
          <ul className="flex-1">
            {steps.map((step, index) => (
              <li
                key={index}
                className="mb-[24px] flex items-center justify-start gap-4"
              >
                <div>
                  <span className="flex h-[50px] w-[51px]  items-center justify-center rounded-full border border-yellowshadow text-[1.5rem] lg:h-[58px] lg:w-[59px] lg:text-[2rem]">
                    {index + 1}
                  </span>
                </div>
                <p className=" text-[14px] lg:text-[22px]">
                  {t(`support:${step}`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center">
            <button
              onClick={openDonateModal}
              className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-accent  p-2 text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:scale-105 focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-lg"
            >
              {t('support:support')}
            </button>
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
        <DonateModal isOpen={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default Support;
