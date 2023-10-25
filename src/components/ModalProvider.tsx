import NewsModal from './modals/NewsModal';
import ExcursionsModal from './modals/ExcursionsModal';
import { useAppSelector } from '@/store/hook';

export const ModalProvider = () => {
  const type = useAppSelector((state) => state.modals.type);
  const isOpen = useAppSelector((state) => state.modals.isOpen);

  return (
    <>
      {isOpen && type === 'news' && <NewsModal />}
      {isOpen && type === 'excursions' && <ExcursionsModal />}
    </>
  );
};
