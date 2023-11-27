import { useAppSelector, useAppDispatch } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';
import { SupportCard } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type SupportModalProps = {
  handleClick: () => void;
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SupportInfoModal = ({
  handleClick,
  isOpen,
  setShowModal
}: SupportModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modals.data) as SupportCard;

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  return (
    <div
      className={`absolute left-[50%] top-0 z-[99] flex h-[587px] w-[90vw] -translate-x-[50%] -translate-y-[40%] flex-col items-center justify-start bg-white p-[20px] text-center text-black shadow-2xl transition-all duration-700 ${
        isOpen ? `-translate-y-[70%]` : 'translate-y-[100%]'
      }`}
    >
      <div className="card_header mb-[12px] flex w-full items-center justify-between py-2">
        <h1 className="text-[18px] font-semibold">
          {t(`support:${data.title}`)}
        </h1>
        <button onClick={handleClose} className="">
          <img src="/gallery/vector.png" alt="close share modal" />
        </button>
      </div>

      <img src={data.image} alt="" />
      <p className="my-[18px] w-full whitespace-pre text-left text-[14px]">
        {t(`support:${data.banner}`)}
      </p>
      <button
        onClick={handleClick}
        className="w-full bg-accent px-8 py-2 active:bg-darkyellow"
      >
        {t('support:help')}
      </button>
    </div>
  );
};

export default SupportInfoModal;
