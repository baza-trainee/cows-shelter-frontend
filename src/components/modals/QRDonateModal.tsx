import { Dispatch, SetStateAction } from 'react';
import { closeModal } from '@/store/slices/modalSlice';
import { useAppDispatch } from '@/store/hook';
import CloseIcon from '../icons/CloseIconMenu';

type DonateModalProps = {
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const QRDonateModal = ({ isOpen, setShowModal }: DonateModalProps) => {
  const dispatch = useAppDispatch();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/80"
    >
      <div
        className={`absolute ${
          isOpen ? 'right-0' : '-right-[500px]'
        } no-scrollbar top-[45%] max-h-[95vh] w-full -translate-y-[50%] overflow-auto bg-white px-4 py-[60px] transition-all duration-700 md:top-[50%] md:w-[480px] md:px-10`}
      >
        <img className="mb-2 " src="/qrcode.webp" alt="QR-code" />
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-bold">Реквізити банки</h5>
          <div className="w-full">
            <span className="font-semibold">Отримувач</span> <br />
            <span className="flex-1 text-right">Зезюкова Ірина Михайлівна</span>
          </div>
          <div className="w-full">
            <span className="font-semibold">IBAN</span>
            <br />
            <span className="flex-1 text-right">
              UAH603220010000026206343674066
            </span>
          </div>
          <div className="w-full">
            <span className="font-semibold">ІПН/ЄДРПОУ</span>
            <br />
            <span className="flex-1 text-right">3224301740</span>
          </div>
          <div className="w-full">
            <span className="font-semibold">Призначення платежу</span>
            <br />
            <span className="flex-1 text-right">Поповнення разунку банки</span>
          </div>
        </div>
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 top-4"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default QRDonateModal;
