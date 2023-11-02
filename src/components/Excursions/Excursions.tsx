import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import ExcursionsReviews from './ExcursionsReviews';
import ExcursionModal from './ExcursionModal';
import LittleArrow from '../icons/LittleArrow';

import { excursions } from '@/data/excursionsModals';
import { ExcursionsData } from '@/types';
import { useTranslation } from 'react-i18next';

const Excursions = () => {
  const dispatch = useAppDispatch();
  const [activeExcursion, setActiveExcursion] = useState<ExcursionsData>();
  const [excursion, setExcursion] = useState(0);

  const { t } = useTranslation();

  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  useEffect(() => {
    setActiveExcursion(excursions[excursion]);
  }, [excursion]);

  const openExcursionModal = () => {
    dispatch(
      openModal({ data: activeExcursion as ExcursionsData, type: 'excursions' })
    );
  };

  // useEffect(() => {
  //   if (isModalOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [isModalOpen]);

  return (
    <section className="bg-[#F3F3F5] px-[7.5rem] py-20">
      <h2 className="mb-10 text-[4rem] font-medium leading-normal">
        {t('excursions:title')}
      </h2>
      <ul className="mb-[8.75rem] flex gap-6">
        {excursions.map((item: ExcursionsData, index: number) => (
          <li key={item.id} className="drop-shadow">
            <div className="group relative">
              <img src={item.mainImgSrc} alt="Арттерапія з коровами"></img>
              <div className="fixed left-0 top-0 h-full w-full bg-black/[.60] opacity-0 transition-all duration-700 group-hover:opacity-100"></div>
              <div className="absolute bottom-0 left-0 flex flex-col gap-0 pb-6 pl-6 text-white transition-all duration-700 group-hover:gap-5">
                <p className="subtitle-text">{t(item.title)}</p>
                <p className="opacity-0 transition-all duration-700 group-hover:opacity-100">
                  {t('excursions:excursion.small_description')}
                </p>
                <a>
                  <button
                    className="flex gap-3 border border-solid border-transparent py-[0.69rem] pl-6 pr-2.5 transition-all duration-700 focus:border-accent active:border-accent group-hover:border-accent"
                    onClick={() => {
                      setExcursion(index), openExcursionModal();
                    }}
                  >
                    <span className="text-lg font-medium leading-[1.35rem]">
                      {t('excursions:excursion.show_more_btn')}
                    </span>
                    <LittleArrow />
                  </button>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ExcursionsReviews />
      {isModalOpen && type === 'excursions' && (
        <ExcursionModal excursion={activeExcursion as ExcursionsData} />
      )}
    </section>
  );
};

export default Excursions;
