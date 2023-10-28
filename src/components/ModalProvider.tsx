import { useEffect } from 'react';
import { useAppSelector } from '@/store/hook';

import NewsModal from './modals/NewsModal';
import ExcursionsModal from './modals/ExcursionsModal';

export const ModalProvider = () => {
  const type = useAppSelector((state) => state.modals.type);
  const isOpen = useAppSelector((state) => state.modals.isOpen);

  useEffect(() => {
    if (isOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && type === 'news' && <NewsModal />}
      {isOpen && type === 'excursions' && <ExcursionsModal />}
    </>
  );
};
