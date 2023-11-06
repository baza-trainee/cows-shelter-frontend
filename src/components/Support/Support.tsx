import { useTranslation } from 'react-i18next';
import { cards, steps } from '@/data/support';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import DonateModal from '../modals/DonateModal';
import Card from './Card';
import { useEffect, useState } from 'react';

const Support = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  const openDonateModal = () => {
    dispatch(openModal({ data: {}, type: 'donation' }));
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setShowModal(true);
      }, 500);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [isModalOpen]);

  return (
    <section className="container relative mx-auto max-w-[1440px]">
      <div
        className={`relative h-[80vh] w-full bg-[url('/support/support_bg.png')] bg-cover bg-fixed bg-center bg-no-repeat `}
      />
      <div className="flex flex-col items-start justify-center px-[120px]">
        <h2 className="mb-10 mt-20 whitespace-nowrap text-[54px] font-medium lg:text-[64px]">
          {t('support:title')}
        </h2>
        <p className="mb-10 text-[20px] text-darkgray lg:w-[1020px] lg:text-[22px]">
          {t('support:text')}
        </p>
        <div className="flex w-full justify-center gap-4 text-white">
          <Card card={cards[0]} handleClick={openDonateModal} />;
          <Card card={cards[1]} handleClick={openDonateModal} />;
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
              className=" flex  h-[100px] w-[100px] items-center justify-center rounded-full bg-accent  p-2 text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:scale-105 focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-lg"
            >
              {t('support:support')}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && type === 'donation' && (
        <DonateModal isOpen={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default Support;
