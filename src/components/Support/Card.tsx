import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LittleArrow from '../icons/LittleArrow';
import { SupportCard } from '@/types';

type CardProps = {
  card: SupportCard;
  handleClick: () => void;
};

const Card = ({ card, handleClick }: CardProps) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [isBanner, setIsBanner] = useState(false);
  return (
    <div className="group relative overflow-hidden">
      <img src={card.image} alt={t(`support:${card.title}`)} />
      {!isBanner ? (
        <div className="absolute bottom-8 left-2">
          <h3 className=" -mb-[3rem] text-[2rem] font-medium transition-all duration-700 group-hover:mb-0">
            {t(`support:${card.title}`)}
          </h3>
          <p className="my-[1rem] translate-y-[2rem] text-[20px] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            {t(`support:${card.subtitle}`)}
          </p>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-[18px] font-medium hover:text-accent"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setIsBanner(true)}
          >
            {t('support:read_more')}
            <LittleArrow hovered={hovered} />
          </button>
        </div>
      ) : (
        <div className="absolute left-6 top-4">
          <h3 className=" text-[2rem] font-medium">
            {t(`support:${card.title}`)}
          </h3>
          <p className="my-[1rem]  text-[20px] ">
            {t(`support:${card.subtitle}`)}
          </p>
        </div>
      )}
      {isBanner && (
        <div className="absolute bottom-0 left-0 z-50 h-1/2 w-full bg-white p-4 text-black">
          <p className="mb-4">{t(`support:${card.banner}`)}</p>
          <button
            onClick={handleClick}
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
