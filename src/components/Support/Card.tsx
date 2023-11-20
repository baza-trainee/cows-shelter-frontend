import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LittleArrow from '../icons/LittleArrow';
import { SupportCard } from '@/types';
import { useWidth } from '@/hooks/useWidth';

type CardProps = {
  card: SupportCard;
  openDonateModal: () => void;
  openInfoModal: (id: number) => void;
};

const Card = ({ card, openDonateModal, openInfoModal }: CardProps) => {
  const { t } = useTranslation();
  const screenWidth = useWidth();
  const [hovered, setHovered] = useState(false);
  const [isBanner, setIsBanner] = useState(false);

  return (
    <div
      className="group relative flex h-full w-full items-end justify-center overflow-hidden
      md:h-[240px] md:w-[324px] lg:h-[360px] lg:w-[588px]"
      style={{
        background: `url(${card.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {!isBanner ? (
        <div className="relative flex h-[72px] w-full flex-col items-start justify-end p-4">
          {screenWidth > 768 && (
            <div className="max-h-[30vh] ">
              <div className="translate-y-[5rem] transition-all duration-[1s] group-hover:translate-y-0">
                <h3 className="mb-8 text-[20px] font-medium transition-all duration-700 group-hover:mb-2 lg:text-[2rem]">
                  {t(`support:${card.title}`)}
                </h3>
                <p className="-z-2 relative my-[1rem] h-[5rem] text-[12px] opacity-0 transition-all duration-700 group-hover:opacity-100 lg:text-[20px]">
                  {t(`support:${card.subtitle}`)}
                </p>
              </div>
            </div>
          )}
          {screenWidth > 768 ? (
            <button
              className="relative z-50 flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-[14px] font-medium hover:text-accent lg:text-[18px]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setIsBanner(true)}
            >
              {t('support:read_more')}
              <LittleArrow hovered={hovered} />
            </button>
          ) : (
            <button
              className="relative z-50 flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-[14px] font-medium hover:text-accent lg:text-[18px]"
              onClick={() => openInfoModal(card.id)}
            >
              {t(`support:${card.title}`)}
              <LittleArrow hovered={hovered} />
            </button>
          )}
        </div>
      ) : (
        <div
          className="absolute left-4 top-2"
          onClick={() => setIsBanner(false)}
        >
          <h3 className="-mb-2 text-[20px] font-medium lg:text-[2rem]">
            {t(`support:${card.title}`)}
          </h3>
          <p className="my-[1rem] text-[12px]  lg:text-[20px] ">
            {t(`support:${card.subtitle}`)}
          </p>
        </div>
      )}
      {isBanner && (
        <div className="absolute bottom-0 left-0 z-50 h-2/3 w-full overflow-auto bg-white p-4 text-black">
          <p className="mb-4 text-[14px] lg:text-[18px]">
            {t(`support:${card.banner}`)}
          </p>
          <button
            onClick={openDonateModal}
            className="bg-accent px-8 py-2 hover:bg-lemon active:bg-darkyellow"
          >
            {t('support:help')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
